import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuarioEditado: any = {};

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = Array.isArray(data) ? data : [];
        setTimeout(() => {
          $('#tablaUsuarios').DataTable();
        }, 0);
      },
      error: (err) => console.error('Error cargando usuarios:', err)
    });
  }

  guardarEdicion(): void {
    this.usuarioService.modificarUsuario(this.usuarioEditado._id, this.usuarioEditado).subscribe({
      next: (res) => {
        if (res.status === '1') {
          this.cargarUsuarios();
          const modal = bootstrap.Modal.getInstance(document.getElementById('editarModal')!)!;
          modal.hide();
        } else {
          alert(res.msg);
        }
      },
      error: (err) => {
        console.error('Error al guardar usuario:', err);
        alert('Error al guardar los cambios.');
      }
    });
  }

  eliminarUsuario(id: string): void {
    if (confirm('¿Eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }
}

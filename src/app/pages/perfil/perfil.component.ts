import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Cliente, Administrador, Repartidor } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  cliente!: Cliente;
  admin!: Administrador;
  repartidor!: Repartidor;
  id: any;
  editando: boolean = false;
  usuarioOriginal: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.id = this.usuarioService.idLogged();
    const tipoUsuario = this.usuarioService.tipoUsuario();
    if (this.id) {
      if (tipoUsuario === 'Cliente') {
        this.usuarioService.getCliente(this.id).subscribe(result => {
          this.cliente = result;
        });
      } else if (tipoUsuario === 'Administrador') {
        this.usuarioService.getAdministrador(this.id).subscribe(result => {
          this.admin = result;
        });
      } else if (tipoUsuario === 'Repartidor') {
        this.usuarioService.getRepartidor(this.id).subscribe(result => {
          this.repartidor = result;
        });
      }
    }
  }

  editarPerfil() {
    this.editando = true;
    // Guardar una copia del usuario original para poder cancelar los cambios
    this.usuarioOriginal = {...this.cliente || this.admin || this.repartidor};
  }

  guardarCambios() {
    const tipoUsuario = this.usuarioService.tipoUsuario();
    const id = this.usuarioService.idLogged();

    if (id) {
      if (tipoUsuario === 'Cliente') {
        this.usuarioService.modificarUsuario(id, this.cliente).subscribe(() => {
          this.editando = false;
          alert('Cambios guardados exitosamente');
        });
      } else if (tipoUsuario === 'Administrador') {
        this.usuarioService.modificarUsuario(id, this.admin).subscribe(() => {
          this.editando = false;
          alert('Cambios guardados exitosamente');
        });
      } else if (tipoUsuario === 'Repartidor') {
        this.usuarioService.modificarUsuario(id, this.repartidor).subscribe(() => {
          this.editando = false;
          alert('Cambios guardados exitosamente');
        });
      }
    }
  }

  cancelarEdicion() {
    // Restaurar los valores originales
    if (this.cliente) {
      Object.assign(this.cliente, this.usuarioOriginal);
    } else if (this.admin) {
      Object.assign(this.admin, this.usuarioOriginal);
    } else if (this.repartidor) {
      Object.assign(this.repartidor, this.usuarioOriginal);
    }
    this.editando = false;
  }
}

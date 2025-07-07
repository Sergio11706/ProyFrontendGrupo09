import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Administrador } from '../../../../models/usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-crear-admin',
  standalone: true,
  imports: [ FormsModule, CommonModule ],
  templateUrl: './crear-admin.component.html',
  styleUrl: './crear-admin.component.css'
})
export class CrearAdminComponent {
  
  admin: Administrador = new Administrador();

  mensaje: string = '';
  error: string = '';

constructor(private usuarioService: UsuarioService, private router: Router) {}

crearAdministrador() {
  this.admin.tipoUsuario = 'Administrador';
    this.usuarioService.guardarUsuario(this.admin).subscribe({
      next: (res) => {
        this.mensaje = `Administrador ${this.admin.nombre} creado con éxito.`;
        this.admin = new Administrador();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Error al crear administrador.';
        console.error(err);
      }
    });
  }
}

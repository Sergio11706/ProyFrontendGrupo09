import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../services/crear-admin.service';
import { Administrador } from '../../../../models/usuario.model';


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

  rangosDisponibles: string[] = [
  'Administrador de Restaurantes',
  'Administrador de Pedidos',
  'Administrador de Atención al Cliente',
  'Administrador de Repartidores'
  ];

constructor(private AdminService: AdminService) {}

crearAdministrador() {
    this.AdminService.crearAdministrador(this.admin).subscribe({
      next: (res) => {
        this.mensaje = `Administrador ${this.admin.nombre} creado con éxito.`;
        this.admin = new Administrador();
      },
      error: (err) => {
        this.error = 'Error al crear administrador.';
        console.error(err);
      }
    });
  }
}

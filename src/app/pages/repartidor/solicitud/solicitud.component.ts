import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Repartidor } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  repartidor: Repartidor = new Repartidor();
  mensaje: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  solicitarTrabajo() {
    this.repartidor.estado = 'pendiente';
    this.repartidor.tipoUsuario = 'Repartidor';

    this.usuarioService.guardarUsuario(this.repartidor)
      .subscribe((result: any) => {
        alert('Solicitud recibida. Nos pondremos en contacto contigo pronto.');
        this.mensaje = 'Tu solicitud ha sido enviada y está pendiente de aprobación.';
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error al enviar la solicitud:', error);
        this.mensaje = 'Error al enviar la solicitud. Por favor, intenta nuevamente.';
      }); 
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-pendiente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-pendiente.component.html'
})
export class PagoPendienteComponent {
  
  constructor(private router: Router) {}

  volverAHome(): void {
    this.router.navigate(['/home']);
  }

  intentarNuevamente(): void {
    this.router.navigate(['/checkout']);
  }
} 

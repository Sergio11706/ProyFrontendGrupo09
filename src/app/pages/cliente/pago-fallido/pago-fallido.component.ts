import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-fallido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-fallido.component.html'
})
export class PagoFallidoComponent {
  
  constructor(private router: Router) {}

  volverAHome(): void {
    this.router.navigate(['/home']);
  }

  intentarNuevamente(): void {
    this.router.navigate(['/checkout']);
  }
} 

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-exitoso.component.html'
})
export class PagoExitosoComponent {
  
  constructor(private router: Router) {}

  volverAHome(): void {
    this.router.navigate(['/home']);
  }

  verPedidos(): void {
    this.router.navigate(['/pedir']);
  }
} 

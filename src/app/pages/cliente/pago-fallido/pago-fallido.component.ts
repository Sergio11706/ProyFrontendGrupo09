import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-fallido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-fallido.component.html',
  styleUrls: ['./pago-fallido.component.css']
})
export class PagoFallidoComponent {
  
  constructor(private router: Router) {}

  volverAProductos(): void {
    this.router.navigate(['/productos']);
  }

<<<<<<< HEAD
  intentarNuevamente(): void {
    this.router.navigate(['/pagar']);
=======
  volverAlCarrito(): void {
    this.router.navigate(['/carrito']);
>>>>>>> origin/master
  }
} 

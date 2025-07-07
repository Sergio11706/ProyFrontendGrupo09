import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-pendiente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-pendiente.component.html',
  styleUrls: ['./pago-pendiente.component.css']
})
export class PagoPendienteComponent {
  
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

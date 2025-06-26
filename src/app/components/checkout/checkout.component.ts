import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  direccion = '';
  pago = 'mercadoPago';

  confirmar(): void {
    console.log('Pedido confirmado:', this.direccion, this.pago);
    // Integrar MercadoPago o el servicio de pedidos acá.
  }
}

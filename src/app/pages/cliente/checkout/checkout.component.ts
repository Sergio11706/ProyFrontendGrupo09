import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MercadoPagoService } from '../../../services/mercado-pago.service';
import { CarritoService } from '../../../services/carrito.service';

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
    
    if (this.pago === 'mercadoPago') {
      this.mercadoPagoService.generarPago({
        payer_email: 'cliente@test.com',
        title: 'Hamburguesa Especial',
        description: 'Con papas y bebida',
        quantity: 1,
        unit_price: 2500
      }).subscribe((res: any) => {
        window.location.href = res.init_point;
      });
    } else {
      console.log('Pago en efectivo seleccionado');
  }
}

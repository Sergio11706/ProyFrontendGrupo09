import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MercadoPagoService } from '../../../services/mercado-pago.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido.model';
import { Cliente } from '../../../models/usuario.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent {
  cliente: Cliente = new Cliente();
  pedido: Pedido = new Pedido();
  id: string = '';
  isLoading: boolean = true;
  precioFinal: number = 0;


  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private mercadoPagoService: MercadoPagoService,
    private usuarioService: UsuarioService) {}

    ngOnInit(): void {
      this.id = this.usuarioService.idLogged()!;
      
      if (this.id) {
        // Usar forkJoin para esperar a que ambas peticiones terminen
        forkJoin({
          pedidos: this.pedidoService.getPedidos(),
          cliente: this.usuarioService.getCliente(this.id)
        }).subscribe({
          next: ({pedidos, cliente}) => {
            this.pedido = pedidos.find((p: any) => p.cliente._id === this.id) || new Pedido();
            this.cliente = cliente;
            this.precioFinal = this.pedido.total! - (this.pedido.total! * (this.cliente.descuento! / 100));
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error al cargar los datos:', error);
            this.isLoading = false;
          }
        });
      } else {
        this.isLoading = false;
      }
    }
    

  confirmar(): void {
    this.mercadoPagoService.generarPago({
        payer_email: this.cliente.email,
        title: this.pedido.nombre,
        description: 'Los mejores sanguches de Jujuy',
        quantity: 1,
        unit_price: 1 //this.precioFinal
      }).subscribe((res: any) => {
        window.location.href = res.init_point;
      });
  }
}

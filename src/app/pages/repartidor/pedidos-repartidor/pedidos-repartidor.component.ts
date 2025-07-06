import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../../services/pedido.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Pedido } from '../../../models/pedido.model';
import { Cliente, Repartidor } from '../../../models/usuario.model';

@Component({
  selector: 'app-pedidos-repartidor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos-repartidor.component.html'
})
export class PedidosRepartidorComponent implements OnInit {

  pedidoInfo: {
    pedido: Pedido,
    cliente: Cliente,
    repartidor?: Repartidor
  }[] = [];

  repartidorId: string = '';
  pedidoTomado: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.repartidorId = this.usuarioService.idLogged()!;
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(result => {
      this.pedidoInfo = [];

      result.forEach((pedido: Pedido) => {
        if (!pedido.cliente || typeof pedido.cliente === 'string') return;

        const cliente = pedido.cliente;
        let repartidor: Repartidor | undefined;

        if (pedido.repartidor && typeof pedido.repartidor !== 'string') {
          repartidor = pedido.repartidor;
        }

        this.pedidoInfo.push({ pedido, cliente, repartidor });
      });
    });
  }

  tomarPedido(pedidoId: string | undefined): void {
    if (!pedidoId || !this.repartidorId) {
      alert('Error: faltan datos del pedido o repartidor.');
      return;
    }

    const pedidoModificado = new Pedido();
    pedidoModificado.repartidor = this.repartidorId;
    pedidoModificado.estado = 'en camino';

    this.pedidoService.modificarPedido(pedidoId, pedidoModificado).subscribe({
      next: () => {
        alert('Pedido tomado correctamente.');
        this.pedidoTomado = true;
        this.cargarPedidos();
      },
      error: () => {
        alert('Error al tomar el pedido.');
      }
    });
  }

  finalizarPedido(pedidoId: string | undefined): void {
    if (!pedidoId) {
      alert('Error: ID del pedido no definido.');
      return;
    }

    if (confirm('¿Finalizar y eliminar el pedido?')) {
      this.pedidoService.eliminarPedido(pedidoId).subscribe({
        next: () => {
          alert('Pedido finalizado y eliminado.');
          this.cargarPedidos();
        },
        error: () => {
          alert('Error al eliminar el pedido.');
        }
      });
    }
  }
}

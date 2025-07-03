import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos-repartidor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos-repartidor.component.html'
})
export class PedidosRepartidorComponent implements OnInit {
  pedidos: any[] = [];
  repartidorId: string = '';

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const id = sessionStorage.getItem("userid");
    if (!id) {
      alert("Error: No se encontró el ID del repartidor en sesión.");
      return;
    }
    this.repartidorId = id;
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data.filter(p => {
          const idRepartidor = typeof p.repartidor === 'string' ? p.repartidor : p.repartidor?._id;
          return !idRepartidor || idRepartidor === this.repartidorId;
        });
      },
      error: () => {
        alert('Error al cargar los pedidos.');
      }
    });
  }

  tomarPedido(pedidoId: string): void {
    if (!this.repartidorId) {
      alert('Error: ID del repartidor no definido.');
      return;
    }

    this.pedidoService.tomarPedido(pedidoId, this.repartidorId).subscribe({
      next: () => {
        alert('Pedido tomado correctamente.');
        this.cargarPedidos();
      },
      error: () => {
        alert('Error al tomar el pedido.');
      }
    });
  }

  calcularRecargo(pedido: any): number {
    if (!pedido || !pedido.productos || !Array.isArray(pedido.productos)) return 0;

    const subtotal = pedido.productos.reduce((sum: number, item: any) => {
      const precioUnitario = item.producto?.precioUnitario ?? 0;
      const cantidad = item.cantidad ?? 0;
      return sum + (precioUnitario * cantidad);
    }, 0);

    const total = pedido.total ?? 0;
    const recargo = total - subtotal;
    return parseFloat(recargo.toFixed(2));
  }

  finalizarPedido(pedidoId: string): void {
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

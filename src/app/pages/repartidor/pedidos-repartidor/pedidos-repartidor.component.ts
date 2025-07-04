import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../../models/pedido.model';
import { Cliente, Repartidor } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-pedidos-repartidor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos-repartidor.component.html'
})
export class PedidosRepartidorComponent implements OnInit {
  
  pedidos: Pedido [] = [];
  clientes: Cliente [] = [];
  repartidores: Repartidor [] = [];
  pedidoTomado: boolean = false;
  repartidorId: string = '';


  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.repartidorId = this.usuarioService.idLogged()!;
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(result => {
      this.pedidos = result;
      this.pedidos.forEach(pedido => {
        if(pedido.cliente && typeof pedido.cliente !== 'string'){
          this.clientes.push(pedido.cliente);
        }
        else{
          alert("No se encontro el cliente");
          return;
        }
        if(pedido.repartidor && typeof pedido.repartidor !== 'string'){
          this.repartidores.push(pedido.repartidor);
        }
        else{
          alert("No se encontro el repartidor");
          return;
        }
      });
    });
  }

  tomarPedido(index: number): void {
    const pedidoId = this.pedidos[index]._id;
    if (!pedidoId) {
      alert('Error: ID del pedido no definido.');
      return;
    }
    if (!this.repartidorId) {
      alert('Error: ID del repartidor no definido.');
      return;
    }

    const pedidoModificado = new Pedido();
    pedidoModificado.repartidor = this.repartidorId;
    pedidoModificado.estado = 'en camino';
    
    this.pedidoService.modificarPedido(pedidoId, pedidoModificado).subscribe(result => {
      try {
        alert('Pedido tomado correctamente.');
        this.pedidoTomado = true;
        this.cargarPedidos();
      } catch (error) {
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

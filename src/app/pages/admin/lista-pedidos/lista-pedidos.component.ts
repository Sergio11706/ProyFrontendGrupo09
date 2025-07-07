import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido.model';
declare var $: any;

@Component({
  selector: 'app-lista-pedidos',
  imports: [CommonModule],
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  pedidos: Pedido [] = [];
  pedido: Pedido = new Pedido();

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(result => {
      this.pedidos = result.filter((pedido: Pedido) => {
        return pedido.muestra === false && pedido.estado === 'preparando';
      }).map((pedido: Pedido) => {
        return {
          _id: pedido._id,
          nombre: pedido.nombre,
          estado: pedido.estado,
          productos: pedido.productos,
          total: pedido.total,
        }
      });
      
      setTimeout(() => {
        $('#tablaPedidos').DataTable();
      }, 0);
    });
  }

  modificarPedido(id: string): void {
    console.log(id);
    this.pedidoService.modificarPedido(id, { _id: id, estado: 'listo' }).subscribe(result => {
      this.cargarPedidos();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido.model';
declare var $: any;

@Component({
  selector: 'app-lista-pedidos',
  imports: [CommonModule],
  templateUrl: './lista-pedidos.component.html',
  styleUrl: './lista-pedidos.component.css'
})
export class ListaPedidosComponent {

  pedidos: Pedido [] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe(result => {
      this.pedidos = result;
      setTimeout(() => {
        $('#tablaPedidos').DataTable();
      }, 0);
    });
  }

  modificarPedido(id: string): void {
    this.pedidoService.modificarPedido(id, { estado: 'listo' }).subscribe(result => {
      this.cargarPedidos();
    });
  }
}

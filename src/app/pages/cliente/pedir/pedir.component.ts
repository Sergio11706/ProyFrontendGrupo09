import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { Pedido } from '../../../models/pedido.model';
import { UsuarioService } from '../../../services/usuario.service';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedir',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.css']
})
export class PedirComponent implements OnInit {

  productos: Producto[] = [];
  productoSeleccionados: Producto[] = [];
  modalVisible: boolean = false;
  ingrediente: string = '';
  pedidoDisable: boolean = true;
  agregarDisabled: boolean = true;

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(result => {
      this.productos = result;
    });
  }

  ingredienteInicial(event: any): void {
    if(this.productoSeleccionados.length > 0) this.productoSeleccionados = [];
    const ingrediente = this.productos.find(p => p.nombre === event.target.value);
    if (ingrediente) {
      this.productoSeleccionados.push(ingrediente);
    }
    this.pedidoDisable = this.productoSeleccionados.length === 0;
    this.agregarDisabled = this.productoSeleccionados.length === 0;
  }

  agregarIngrediente(ingrediente: string): void {
    const ingredienteEncontrado = this.productos.find(p => p.nombre === ingrediente);
    if (ingredienteEncontrado) {
      this.productoSeleccionados.push(ingredienteEncontrado);
    }
    this.pedidoDisable = this.productoSeleccionados.length === 0;
    this.agregarDisabled = this.productoSeleccionados.length === 0;
  }

  eliminarUltimoIngrediente(): void {
    if (this.productoSeleccionados.length > 0) {
      this.productoSeleccionados.pop();
    }
    this.pedidoDisable = this.productoSeleccionados.length === 0;
    this.agregarDisabled = this.productoSeleccionados.length === 0;
  }

  realizarPedido(): void {
    const pedido: Pedido = {
      productos: this.productoSeleccionados,
      estado: 'preparando',
      fecha: new Date(),
      muestra: false
    };

    const id = this.usuarioService.idLogged();
    if (id) {
      pedido.cliente = id;
    }
    else {
      alert("No se encontro el cliente");
      return;
    }
    pedido.total = this.pedidoService.calcularTotal(pedido);
    
    this.pedidoService.crearPedido(pedido).subscribe(result => {
      alert("Pedido creado exitosamente");
      this.productoSeleccionados = [];
    });
  }

  abrirModal(): void {
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }
}

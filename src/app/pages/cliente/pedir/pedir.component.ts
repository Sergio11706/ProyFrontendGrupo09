import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { Pedido } from '../../../models/pedido.model';
import { UsuarioService } from '../../../services/usuario.service';
import { PedidoService } from '../../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedir',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedir.component.html',
  styleUrls: ['./pedir.component.css']
})
export class PedirComponent implements OnInit {

  productos: Producto[] = [];
  productosPrincipales: Producto[] = [];
  productoSeleccionados: Producto[] = [];
  modalVisible: boolean = false;
  ingrediente: string = '';
  pedidoDisable: boolean = true;
  agregarDisabled: boolean = true;

  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private router: Router) { }

  ngOnInit(): void {
    this.productoSeleccionados = [];
    this.productoService.getProductos().subscribe(result => {
      this.productosPrincipales = result.filter(p => p.principal);
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
      nombre: 'Sanguche de ' + this.productoSeleccionados[0].nombre,
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
      alert("Pedido realizado exitosamente");
      this.router.navigate(['/pagar']); 
    });
  }

  abrirModal(): void {
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }
}

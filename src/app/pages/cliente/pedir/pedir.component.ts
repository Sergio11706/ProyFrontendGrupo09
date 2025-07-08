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
  ingredientes: string[] = [];
  bebidas: string[] = [];
  bebida: Producto = {};
  papasFritas: Producto = {};
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
      if(result){
        this.productosPrincipales = result.filter(p => p.principal === true);
        this.productos = result;
        this.productos.forEach(p => {
          if(p.tipoProducto === 'Ingrediente' && p.nombre !== 'Papas Fritas' && (p.principal === false || p.principal === undefined)) this.ingredientes.push(p.nombre!);
          if(p.tipoProducto === 'Bebida') this.bebidas.push(p.nombre!);
        });
      }
      else {
        alert("Lo sentimos, pagina en mantenimiento");
        this.router.navigate(['/home']);
      }
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

    pedido.productos!.push(this.bebida);
    pedido.productos!.push(this.papasFritas);

    const id = this.usuarioService.idLogged();
    if (id) {
      pedido.cliente = id;
    }
    else {
      alert("No se encontro el cliente");
      this.router.navigate(['/home']);
      return;
    }
    pedido.total = this.pedidoService.calcularTotal(pedido);

    this.usuarioService.modificarUsuario(id, {tienePedido: true}).subscribe({
      next: () => {
        this.pedidoService.crearPedido(pedido).subscribe(result => {
          alert("Pedido realizado exitosamente");
          this.router.navigate(['/pagar']);
        });
      },
      error: () => {
        alert("Error al actualizar el estado del usuario");
      }
    });

    this.productoSeleccionados.forEach(p => {
      this.productoService.modificarProducto(p._id!, { stock: p.stock! - 1 }).subscribe();
    });
  }

  abrirModal(): void {
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  agregarBebida(bebida: string): void {
    this.bebida = this.productos.find(p => p.nombre === bebida)!;
  }

  agregarPapasFritas(): void {
    this.papasFritas = this.productos.find(p => p.nombre === 'Papas Fritas')!;
  }
}

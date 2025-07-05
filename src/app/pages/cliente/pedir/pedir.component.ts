import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';

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

  constructor(private productoService: ProductoService) { }

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
  }

  agregarIngrediente(ingrediente: string): void {
    const ingredienteEncontrado = this.productos.find(p => p.nombre === ingrediente);
    if (ingredienteEncontrado) {
      this.productoSeleccionados.push(ingredienteEncontrado);
    }
  }

  eliminarUltimoIngrediente(): void {
    if (this.productoSeleccionados.length > 0) {
      this.productoSeleccionados.pop();
    }
  }

  abrirModal(): void {
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }
}

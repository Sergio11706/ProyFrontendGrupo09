import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { PedidoService } from '../../../services/pedido.service';
import { Bebida, Ingrediente, Producto } from '../../../models/producto.model';
import { Pedido } from '../../../models/pedido.model';

@Component({
  selector: 'gestion-carga',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-carga.component.html',
  styleUrls: ['./gestion-carga.component.css']
})
export class GestionCargaComponent implements OnInit {

  productos: Producto[] = [];
  pedido: Pedido = {
    nombre: "",
    imagen: "",
    productos: [],
    total: 0,
    muestra: true,
  };
  ingrediente: Ingrediente = new Ingrediente();
  bebida: Bebida = new Bebida();
  cantidad: number = 1;
  arrayAuxiliar!: number[];
  tipoProducto!: string;
  esPrincipal: boolean = false;

  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.actualizarCantidad();
  }

  ngOnChanges(): void {
    this.actualizarCantidad();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(result => {
      this.productos = result;
    });
  }

  guardarProducto(form: NgForm): void {
    if (this.tipoProducto === 'Bebida'){
      this.bebida.tipoProducto = 'Bebida';
      this.bebida.disponible = true;
      this.bebida.principal = this.esPrincipal;
      this.productoService.crearProducto(this.bebida).subscribe(result => {
        alert("Producto creado exitosamente");
        form.reset();
        this.bebida = new Bebida();
        this.esPrincipal = false;
      });
    }
    else {
      this.ingrediente.tipoProducto = 'Ingrediente';
      this.ingrediente.disponible = true;
      this.ingrediente.principal = this.esPrincipal;
      this.productoService.crearProducto(this.ingrediente).subscribe(result => {
        alert("Producto creado exitosamente");
        form.reset();
        this.ingrediente = new Ingrediente();
        this.esPrincipal = false;
      });
    }
  }
   
  actualizarCantidad(): void {
    this.arrayAuxiliar = Array.from({ length: this.cantidad }, (_, i) => i);
    this.pedido.productos?.length != this.cantidad;
  }

  crearPedido(form: NgForm): void {
    this.pedido.total = this.calcularTotal();
    this.pedidoService.crearPedido(this.pedido).subscribe((result: any) => {
      alert("Pedido realizado exitosamente");
    });
    form.reset();
  }

  calcularTotal(): number {
    return this.pedidoService.calcularTotal(this.pedido);
  }
}

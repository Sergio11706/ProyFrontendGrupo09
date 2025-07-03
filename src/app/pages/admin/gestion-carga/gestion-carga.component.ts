import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { PedidoService } from '../../../services/pedido.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Producto } from '../../../models/producto.model';
import { Pedido } from '../../../models/pedido.model';

@Component({
  selector: 'gestion-carga',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-carga.component.html',
  styleUrls: ['./gestion-carga.component.css']
})
export class GestionCargaComponent implements OnInit {
  // Producto
  nuevoProducto: any = {
    nombre: '',
    unidadMedida: '',
    stock: 0,
    precioUnitario: 0,
    vencimiento: '',
    disponible: true,
    tipoProducto: 'Producto', // o 'Bebida', 'Ingrediente'
    volumen: null,
    tipoBebida: '',
    categoria: '',
    proveedor: ''
  };

  productos: Producto[] = [];

  // Pedido
  nuevoPedido: any = {
    direccionEntrega: '',
    productos: [],
    total: 0,
    recargo: 0
  };

  productosSeleccionados: string[] = [];
  cantidades: { [productoId: string]: number } = {};
  clientes: any[] = [];

  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerClientes();
  }

  obtenerProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  guardarProducto(): void {
    this.productoService.crearProducto(this.nuevoProducto).subscribe(res => {
      alert(res.msg);
      this.obtenerProductos();
      this.resetearProducto();
    });
  }

  resetearProducto(): void {
    this.nuevoProducto = {
      nombre: '',
      unidadMedida: '',
      stock: 0,
      precioUnitario: 0,
      vencimiento: '',
      disponible: true,
      tipoProducto: 'Producto',
      volumen: null,
      tipoBebida: '',
      categoria: '',
      proveedor: ''
    };
  }

  toggleProductoSeleccionado(productoId: string, event: any): void {
    if (event.target.checked) {
      this.productosSeleccionados.push(productoId);
      this.cantidades[productoId] = this.cantidades[productoId] || 1;
    } else {
      this.productosSeleccionados = this.productosSeleccionados.filter(id => id !== productoId);
      delete this.cantidades[productoId];
    }
  }

  obtenerClientes(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.clientes = Array.isArray(data)
          ? data.filter(u => u.username && u.username.toLowerCase().includes('cliente'))
          : [];
      },
      error: (err) => console.error('Error cargando clientes:', err)
    });
  }
    
  crearPedido(): void {
    const productosFormateados = this.productosSeleccionados.map(id => ({
      producto: id,
      cantidad: this.cantidades[id] || 1
    }));

    const pedido: Pedido = {
      cliente: this.nuevoPedido.cliente,
      productos: productosFormateados,
      direccionEntrega: this.nuevoPedido.direccionEntrega,
      total: this.calcularTotal(),
      estado: 'pendiente',
    };

    this.pedidoService.crearPedido(pedido).subscribe({
      next: () => {
        alert('Pedido creado correctamente.');
        this.obtenerProductos(); //actualiza stock visible
        this.resetearPedido();
      },
      error: () => {
        alert('Error al crear el pedido.');
      }
    });
  }

  resetearPedido(): void {
    this.nuevoPedido = {
      direccionEntrega: '',
      productos: [],
      total: 0
    };
    this.productosSeleccionados = [];
    this.cantidades = {};
  }
  onCantidadChange(id: string, valor: any): void {
    const cantidad = parseInt(valor, 10);
    if (!isNaN(cantidad) && cantidad > 0) {
      this.cantidades[id] = cantidad;
    } else {
      this.cantidades[id] = 1;
    }
  }

  calcularTotal(): number {
    let total = 0;
    for (let id of this.productosSeleccionados) {
      const prod = this.productos.find(p => p._id === id);
      const cantidad = this.cantidades[id] ?? 1;
      if (prod && cantidad > 0) {
        total += prod.precioUnitario * cantidad;
      }
    }
    const recargo = this.nuevoPedido.recargo || 0;
    return total + recargo;
  }

}

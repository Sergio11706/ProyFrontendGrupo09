import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit, OnDestroy {
  productos: Producto[] = [];
  productoEditando: Producto | null = null;
  dataTable: any;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  inicializarDataTable(): void {
    if ($.fn.DataTable.isDataTable('#tablaProductos')) {
      $('#tablaProductos').DataTable().destroy();
    }
    
    this.dataTable = $('#tablaProductos').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      },
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
      responsive: true
    });
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        // Usar setTimeout para asegurar que la vista se haya actualizado
        setTimeout(() => {
          this.inicializarDataTable();
        }, 0);
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  editarProducto(producto: Producto): void {
    this.productoEditando = { ...producto };
  }

  guardarCambios(): void {
    if (this.productoEditando && this.productoEditando._id) {
      this.productoService.modificarProducto(this.productoEditando._id, this.productoEditando)
        .subscribe({
          next: () => {
            this.cargarProductos();
            this.productoEditando = null;
          },
          error: (error) => {
            console.error('Error al actualizar producto:', error);
          }
        });
    }
  }

  eliminarProducto(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => {
          this.cargarProductos();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.productoEditando = null;
  }

  // Asegurarse de destruir la instancia de DataTable cuando el componente se destruye
  ngOnDestroy(): void {
    if ($.fn.DataTable.isDataTable('#tablaProductos')) {
      $('#tablaProductos').DataTable().destroy(true);
    }
  }
}

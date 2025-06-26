import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
}

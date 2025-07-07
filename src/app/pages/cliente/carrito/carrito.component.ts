import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import { CommonModule } from '@angular/common';
import { Combo } from '../../../models/combo.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  items: Combo[] = [];
  total = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.cargarDesdeLocalStorage();
    this.actualizarCarrito();
  }

  actualizarCarrito(): void {
    this.items = this.carritoService.getItems();
    this.total = this.carritoService.getTotal();
  }

  aumentarCantidad(combo: Combo): void {
    this.carritoService.updateQuantity(combo._id!, (combo.cantidad || 1) + 1);
    this.actualizarCarrito();
  }

  disminuirCantidad(combo: Combo): void {
    this.carritoService.updateQuantity(combo._id!, (combo.cantidad || 1) - 1);
    this.actualizarCarrito();
  }

  eliminarItem(comboId: string): void {
    this.carritoService.removeItem(comboId);
    this.actualizarCarrito();
  }

  limpiarCarrito(): void {
    this.carritoService.clear();
    this.actualizarCarrito();
  }
}

import { Injectable } from '@angular/core';
import { Combo } from '../models/combo.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: Combo[] = [];

  addItem(combo: Combo): void {
    const existente = this.items.find(i => i._id === combo._id);
    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      this.items.push({ ...combo, cantidad: 1 });
    }
    this.guardarEnLocalStorage();
  }

  removeItem(comboId: string): void {
    this.items = this.items.filter(item => item._id !== comboId);
    this.guardarEnLocalStorage();
  }

  updateQuantity(comboId: string, cantidad: number): void {
    const item = this.items.find(i => i._id === comboId);
    if (item) {
      if (cantidad <= 0) {
        this.removeItem(comboId);
      } else {
        item.cantidad = cantidad;
        this.guardarEnLocalStorage();
      }
    }
  }

  getItems(): Combo[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      const precio = item.precio || 0;
      const cantidad = item.cantidad || 1;
      return total + (precio * cantidad);
    }, 0);
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + (item.cantidad || 1), 0);
  }

  clear(): void {
    this.items = [];
    this.guardarEnLocalStorage();
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }

  cargarDesdeLocalStorage(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.items = JSON.parse(carritoGuardado);
    }
  }
}

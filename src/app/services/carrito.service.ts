import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: any[] = [];

  addItem(producto: any): void {
    const existente = this.items.find(i => i._id === producto._id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.items.push({ ...producto, cantidad: 1 });
    }
  }

  getItems(): any[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((t, i) => t + i.precio * i.cantidad, 0);
  }

  clear(): void {
    this.items = [];
  }
}

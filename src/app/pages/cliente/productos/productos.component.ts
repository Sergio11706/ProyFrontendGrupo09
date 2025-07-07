import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  combos: any[] = [];

  constructor(
  ) {}

  ngOnInit(): void {
  }

  agregarAlCarrito(combo: any): void {
  }

  private mostrarNotificacion(mensaje: string): void {
  }
}

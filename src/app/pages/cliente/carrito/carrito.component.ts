import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../../services/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [CarritoService]
})
export class CarritoComponent implements OnInit {
  items: any[] = [];
  total = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.items = this.carritoService.getItems();
    this.total = this.carritoService.getTotal();
  }
}

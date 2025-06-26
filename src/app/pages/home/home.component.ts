import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoCardComponent } from '../../components/producto-card/producto-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductoCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: any[] = [
    { nombre: 'Hamburguesa', descripcion: 'Carne, queso, lechuga', precio: 1500, imagen: 'assets/burger.jpg' },
    { nombre: 'Pizza', descripcion: 'Muzzarella con orégano', precio: 2000, imagen: 'assets/pizza.jpg' }
  ];

  ngOnInit(): void {}
}

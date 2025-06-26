import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  pedidos = [
    { codigoPedido: '1234', total: 250.50 },
    { codigoPedido: '5678', total: 120.00 }
  ];
}

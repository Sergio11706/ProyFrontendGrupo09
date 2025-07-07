import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboService } from '../../../services/combo.service';
import { CarritoService } from '../../../services/carrito.service';
import { Combo } from '../../../models/combo.model';
import { ComboCardComponent } from '../../../components/combo-card/combo-card.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ComboCardComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  combos: Combo[] = [];

  constructor(
    private comboService: ComboService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    // Cargar combos desde el backend
    this.comboService.getCombos().subscribe({
      next: (data) => {
        console.log('Combos recibidos:', data);
        this.combos = data;
      },
      error: (error) => {
        console.error('Error al obtener combos:', error);
        // Si falla la conexión, usar datos de ejemplo
        this.combos = this.comboService.getCombosEjemplo();
        console.log('Usando datos de ejemplo debido a error de conexión');
      }
    });
  }

  agregarAlCarrito(combo: Combo): void {
    this.carritoService.addItem(combo);
    console.log('Combo agregado al carrito:', combo);
    // Mostrar notificación más elegante
    this.mostrarNotificacion('Combo agregado al carrito exitosamente!');
  }

  private mostrarNotificacion(mensaje: string): void {
    // Crear notificación temporal
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-agregado';
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #27ae60, #2ecc71);
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
      z-index: 1000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
      notificacion.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notificacion);
      }, 300);
    }, 2000);
  }
}

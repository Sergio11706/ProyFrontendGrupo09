import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // <-- Importa Router


// Definimos una interfaz para los testimonios para tener un tipado fuerte
interface Testimonio {
  texto: string;
  autor: string;
  ciudad: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // <-- Solo importa CommonModule ya que RouterLink no se usa
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Contador de usuarios
  usuariosRegistrados: number = 0;
  private totalUsuarios: number = 0;

  // Carrusel de opiniones
  testimonios: Testimonio[] = [
    {
      texto: '¡Las mejores pizzas que he probado en la ciudad! El servicio es rápido y siempre llegan calientes. Totalmente recomendado.',
      autor: 'Ana Pérez',
      ciudad: 'Córdoba'
    },
    {
      texto: 'Me encanta la variedad de sabores que ofrecen. La "4 Quesos" es mi favorita. ¡Sigan así!',
      autor: 'Juan García',
      ciudad: 'Buenos Aires'
    },
    {
      texto: 'Excelente atención al cliente y la app es muy fácil de usar. Pedir mi pizza favorita nunca fue tan sencillo.',
      autor: 'María Rodríguez',
      ciudad: 'Rosario'
    }
  ];

  constructor(private router: Router) { } // <-- Inyecta Router

  ngOnInit(): void {
    // Simulamos un número de usuarios registrados en la última semana
    this.totalUsuarios = Math.floor(Math.random() * (350 - 150 + 1)) + 150;
    
    // Animamos el contador para un efecto visual
    const interval = setInterval(() => {
      this.usuariosRegistrados++;
      if (this.usuariosRegistrados >= this.totalUsuarios) clearInterval(interval);
    }, 10);
  }

  irAPedir() {
    this.router.navigate(['/pedir']);
  }
}
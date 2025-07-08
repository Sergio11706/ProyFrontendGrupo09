import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // <-- Importa Router
import { UsuarioService } from '../../services/usuario.service';
import { GraficoComponent } from "../../components/grafico/grafico.component";

// Definimos una interfaz para los testimonios para tener un tipado fuerte
interface Testimonio {
  texto: string;
  autor: string;
  ciudad: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GraficoComponent], // <-- Solo importa CommonModule ya que RouterLink no se usa
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
      texto: '¡Los mejores sanguches que he probado en la ciudad! El servicio es rápido y siempre llegan calientes. Totalmente recomendado.',
      autor: 'Ana Pérez',
      ciudad: 'Palpala'
    },
    {
      texto: 'Me encanta la variedad de sabores que ofrecen. El "Lomito" es mi favorita. ¡Sigan así!',
      autor: 'Juan García',
      ciudad: 'Alto Comedero'
    },
    {
      texto: 'Excelente atención al cliente y la app es muy fácil de usar. Pedir mi sanguche favorito nunca fue tan sencillo.',
      autor: 'María Rodríguez',
      ciudad: 'Punta Diamante'
    }
  ];

  constructor(private router: Router, private usuarioService: UsuarioService) { } // <-- Inyecta Router

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
    const id = this.usuarioService.idLogged();
  
    if (id !== null) {
      const tipo = this.usuarioService.tipoUsuario();
      const permisos = this.usuarioService.getpermisos();

      this.usuarioService.getCliente(id).subscribe((result: any) => {
        const esClienteSinPedido = tipo === 'Cliente' && !result.tienePedido;
        const esAdminConPermisos = tipo === 'Administrador' && permisos === 3;
      
        if (esClienteSinPedido || esAdminConPermisos) {
          this.router.navigate(['/pedir']);
        } 
        else {
          alert("Función no disponible");
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  irAElegirPedido() {
    const id = this.usuarioService.idLogged();
    if (id !== null) {
      const tipo = this.usuarioService.tipoUsuario();
      const permisos = this.usuarioService.getpermisos();

      this.usuarioService.getCliente(id).subscribe((result: any) => {
        const esClienteConPedido = tipo === 'Cliente' && !result.tienePedido;
        const esAdminConPermisos = tipo === 'Administrador' && permisos === 3;
      
        if (esClienteConPedido || esAdminConPermisos) {
          this.router.navigate(['/elegir-pedido']);
        } 
        else {
          alert("Función no disponible");
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
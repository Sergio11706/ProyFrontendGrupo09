import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Pedido } from '../../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-elegir-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './elegir-pedido.component.html',
  styleUrls: ['./elegir-pedido.component.css']
})
export class ElegirPedidoComponent implements OnInit {
  
  pedidos: Pedido[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe((result: Pedido[]) => {
      if(result){
        this.pedidos = result;
        result.forEach((pedido: Pedido) => {
          pedido.productos!.forEach((producto: any) => {
            if(!producto.disponible){
              alert("Lo siento, pagina en mantenimientos");
              this.router.navigate(['/home']);
            }
          });
        });
      }
      else {
        alert("Lo siento, pagina en mantenimientos");
        this.router.navigate(['/home']);
      }
    });
  }

  seleccionarPedido(pedido: Pedido): void {
    const pedidoSeleccionado = { ...pedido };
    pedidoSeleccionado._id = undefined;
    pedidoSeleccionado.muestra = false;
    pedidoSeleccionado.cliente = this.usuarioService.idLogged()!;
    pedidoSeleccionado.estado = 'preparando';
    pedidoSeleccionado.fecha = new Date();
    
    // Primero actualizamos el usuario
    this.usuarioService.modificarUsuario(pedidoSeleccionado.cliente!, { tienePedido: true })
      .subscribe({
        next: () => {
          // Una vez que el usuario se actualizó, creamos el pedido
          this.pedidoService.crearPedido(pedidoSeleccionado).subscribe({
            next: (result) => {
              if (result) {
                alert("Pedido realizado exitosamente");
                this.router.navigate(['/pagar']);
              } else {
                alert("Error al realizar el pedido");
              }
            },
            error: () => {
              alert("Error al realizar el pedido");
            }
          });
        },
        error: () => {
          alert("Error al actualizar el estado del usuario");
        }
      });
  }
}

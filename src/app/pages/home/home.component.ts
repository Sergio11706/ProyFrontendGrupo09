import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { UsuarioService } from '../../services/usuario.service';
import { Pedido } from '../../models/pedido.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedido: Pedido = {
    nombre: "",
    imagen: "",
    productos: [],
    total: 0,
    muestra: false,
    estado: 'preparando'
  };

  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(result => {
      this.pedidos = result;
    });
  }

  realizarPedido(){
    if(this.usuarioService.userLoggedIn()){
      this.router.navigate(['/pedir']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}

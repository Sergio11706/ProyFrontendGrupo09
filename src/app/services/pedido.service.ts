import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private baseUrl = 'http://localhost:3000/api/pedidos';

  constructor(private http: HttpClient) {}

  crearPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.baseUrl, pedido);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }
}

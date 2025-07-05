import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private baseUrl = 'http://localhost:3000/api/pedidos/';

  constructor(private http: HttpClient) {}

  public crearPedido(pedido: Pedido): Observable<any> {
    console.log(pedido);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    let body = JSON.stringify(pedido); 
    return this.http.post(this.baseUrl, body, httpOptions);
  }

  public getPedidos(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  public eliminarPedido(pedidoId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this.http.delete(this.baseUrl + pedidoId, httpOptions);
  }

  tomarPedido(pedidoId: string, repartidorId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this.http.get(this.baseUrl + pedidoId, httpOptions);
  }

  public calcularTotal(pedido: Pedido): number {
    return pedido.productos!.reduce((total, producto) => total + (producto.precioUnitario || 0), 0);
  }

  private getToken(): string {
    return sessionStorage.getItem("token") || "";
  }
}

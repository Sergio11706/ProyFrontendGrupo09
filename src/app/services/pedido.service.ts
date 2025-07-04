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
  
  public tomarPedido(idPedido: string, idRepartidor: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this.http.put(this.baseUrl + 'tomar/' + idPedido, { repartidor: idRepartidor }, httpOptions);
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

  private getToken(): string {
    return sessionStorage.getItem("token") || "";
  }
}

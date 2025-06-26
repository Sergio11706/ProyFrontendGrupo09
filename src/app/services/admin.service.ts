import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // PEDIDOS
  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pedidos`);
  }

  eliminarPedido(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pedidos/${id}`);
  }

  // FACTURAS
  getFacturas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/facturas`);
  }

  eliminarFactura(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/facturas/${id}`);
  }

  // USUARIOS (filtrados por rol: repartidor)
  getUsuariosRepartidores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usuarios?rol=repartidor`);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/${id}`);
  }
}
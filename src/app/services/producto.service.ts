import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private hostBase = 'http://localhost:3000/api/productos';

  constructor(private _http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this._http.get<Producto[]>(this.hostBase);
  }

  crearProducto(producto: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.post(this.hostBase, JSON.stringify(producto), httpOptions);
  }

  private getToken(): string {
    return sessionStorage.getItem("token") || "";
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private hostBase = 'https://grupo09.onrender.com/api/productos/';

  constructor(private _http: HttpClient) {}

   public getProductos(): Observable<Producto[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this._http.get<Producto[]>(this.hostBase, httpOptions);
  }

  public crearProducto(producto: Producto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    let body = JSON.stringify(producto);
    return this._http.post(this.hostBase, body, httpOptions);
  }

  private getToken(): string {
    return sessionStorage.getItem("token") || "";
  }
}

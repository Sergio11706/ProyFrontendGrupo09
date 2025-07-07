import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = 'https://grupo09.onrender.com/api/mp';

  constructor(private http: HttpClient) {}

  generarPago(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this.http.post(`${this.apiUrl}/payment`, data, httpOptions);
  }

  generarSuscripcion(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getToken()
      })
    };
    return this.http.post(`${this.apiUrl}/subscription`, data, httpOptions);
  }

  private getToken(): string {
    return sessionStorage.getItem("token") || "";
  }
} 
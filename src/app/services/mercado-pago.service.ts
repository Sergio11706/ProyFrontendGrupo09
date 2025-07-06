import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {
  private apiUrl = 'http://localhost:3000/api/mp';

  constructor(private http: HttpClient) {}

  generarPago(data: any) {
    return this.http.post(`${this.apiUrl}/payment`, data);
  }

  generarSuscripcion(data: any) {
    return this.http.post(`${this.apiUrl}/subscription`, data);
  }
} 
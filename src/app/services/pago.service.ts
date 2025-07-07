import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo.model';

export interface CustomerInfo {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  codigoPostal: string;
}

export interface PaymentResponse {
  success: boolean;
  preferenceId?: string;
  initPoint?: string;
  pedidoId?: string;
  message?: string;
}

export interface ComboItem {
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:3000/api/mp';

  constructor(private http: HttpClient) {}

  crearPreferencia(items: Combo[], customerInfo: CustomerInfo): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/payment`, {
      items,
      customerInfo
    });
  }

  getPedidoStatus(pedidoId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pedido/${pedidoId}`);
  }

  getPaymentInfo(paymentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/payment/${paymentId}`);
  }

  // Redirigir a Mercado Pago
  redirectToMercadoPago(initPoint: string): void {
    window.location.href = initPoint;
  }

  crearPago(payer_email: string, items: ComboItem[], external_reference?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment`, {
      payer_email,
      items,
      external_reference
    });
  }
} 
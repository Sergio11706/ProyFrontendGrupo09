import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css']
})
export class PagoExitosoComponent implements OnInit {
  pedidoId: string = '';
  pedido: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagoService: PagoService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pedidoId = params['pedido_id'] || '';
      if (this.pedidoId) {
        this.cargarPedido();
      } else {
        this.loading = false;
      }
    });
  }

  cargarPedido(): void {
    this.pagoService.getPedidoStatus(this.pedidoId).subscribe({
      next: (response) => {
        if (response.success) {
          this.pedido = response.pedido;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar pedido:', error);
        this.loading = false;
      }
    });
  }

  volverAProductos(): void {
    this.router.navigate(['/productos']);
  }
} 

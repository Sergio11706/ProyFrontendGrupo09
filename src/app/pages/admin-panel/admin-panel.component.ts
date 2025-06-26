import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  pedidos: any[] = [];
  facturas: any[] = [];
  repartidores: any[] = [];
  cargando = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getPedidos().subscribe(p => this.pedidos = p);
    this.adminService.getFacturas().subscribe(f => this.facturas = f);
    this.adminService.getUsuariosRepartidores().subscribe(r => {
      this.repartidores = r;
      this.cargando = false;
    });
  }

  eliminarPedido(id: string) {
    if (confirm('¿Eliminar pedido?')) {
      this.adminService.eliminarPedido(id).subscribe(() => {
        this.pedidos = this.pedidos.filter(p => p._id !== id);
      });
    }
  }

  eliminarFactura(id: string) {
    if (confirm('¿Eliminar factura?')) {
      this.adminService.eliminarFactura(id).subscribe(() => {
        this.facturas = this.facturas.filter(f => f._id !== id);
      });
    }
  }

  eliminarRepartidor(id: string) {
    if (confirm('¿Eliminar repartidor?')) {
      this.adminService.eliminarUsuario(id).subscribe(() => {
        this.repartidores = this.repartidores.filter(r => r._id !== id);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Repartidor } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-lista-repartidores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-repartidores.component.html',
  styleUrl: './lista-repartidores.component.css'
})
export class ListaRepartidoresComponent implements OnInit {

  repartidores: Repartidor[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getRepartidores().subscribe((result: any) => {
      this.repartidores = result.filter((r: any) => r.estado === 'pendiente');
      console.log(this.repartidores);
    });
  }

  aprobarSolicitud(id: string) {
    this.usuarioService.aceptarSolicitud(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  rechazarSolicitud(id: string) {
    this.usuarioService.rechazarSolicitud(id).subscribe(() => {
      this.ngOnInit();
    });
  }
}

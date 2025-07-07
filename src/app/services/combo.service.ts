import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo.model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {
  private apiUrl = 'http://localhost:3000/api/combos';

  constructor(private http: HttpClient) {}

  getCombos(): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.apiUrl);
  }

  getComboById(id: string): Observable<Combo> {
    return this.http.get<Combo>(`${this.apiUrl}/${id}`);
  }

  // Método temporal para crear datos de ejemplo mientras no hay backend
  getCombosEjemplo(): Combo[] {
    return [
      {
        _id: '1',
        nombre: 'Combo Clásico',
        descripcion: 'Hamburguesa con queso, papas fritas y gaseosa',
        precio: 2500,
        imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        componentes: ['Hamburguesa con queso', 'Papas fritas', 'Gaseosa'],
        disponible: true,
        categoria: 'Clásicos'
      },
      {
        _id: '2',
        nombre: 'Combo Doble',
        descripcion: 'Doble hamburguesa, papas fritas grandes y gaseosa',
        precio: 3200,
        imagen: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
        componentes: ['Doble hamburguesa', 'Papas fritas grandes', 'Gaseosa'],
        disponible: true,
        categoria: 'Especiales'
      },
      {
        _id: '3',
        nombre: 'Combo Vegetariano',
        descripcion: 'Hamburguesa vegetariana, ensalada y jugo natural',
        precio: 2800,
        imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        componentes: ['Hamburguesa vegetariana', 'Ensalada fresca', 'Jugo natural'],
        disponible: true,
        categoria: 'Vegetariano'
      },
      {
        _id: '4',
        nombre: 'Combo Familiar',
        descripcion: '4 hamburguesas, 2 papas fritas grandes y 4 gaseosas',
        precio: 8500,
        imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        componentes: ['4 Hamburguesas', '2 Papas fritas grandes', '4 Gaseosas'],
        disponible: true,
        categoria: 'Familiar'
      },
      {
        _id: '5',
        nombre: 'Combo Premium',
        descripcion: 'Hamburguesa gourmet, papas especiales y cerveza artesanal',
        precio: 4200,
        imagen: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
        componentes: ['Hamburguesa gourmet', 'Papas especiales', 'Cerveza artesanal'],
        disponible: true,
        categoria: 'Premium'
      },
      {
        _id: '6',
        nombre: 'Combo Rápido',
        descripcion: 'Hamburguesa simple, papas pequeñas y gaseosa',
        precio: 1800,
        imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
        componentes: ['Hamburguesa simple', 'Papas pequeñas', 'Gaseosa'],
        disponible: true,
        categoria: 'Económico'
      }
    ];
  }
} 
import { Repartidor } from './usuario.model';
import { Producto } from './producto.model';

export interface Pedido {
  _id?: string;	
  nombre?: string;
  cliente?: string;
  productos?: Producto[];
  repartidor?: Repartidor | string;
  direccionEntrega?: string;
  total?: number;
  imagen?: string;
  estado?: 'pendiente' | 'preparando' | 'en camino' | 'entregado';
  fecha?: Date;
  muestra?: boolean;
}

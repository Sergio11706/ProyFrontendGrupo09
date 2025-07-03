import { Repartidor } from './usuario.model';
import { Producto } from './producto.model';

export interface Pedido {
  _id?: string;
  cliente: string;
  productos: {
    producto: Producto | string;
    cantidad: number;
  }[];
  repartidor?: Repartidor | string;
  direccionEntrega: string;
  total: number;
  estado: 'pendiente' | 'preparando' | 'en camino' | 'entregado';
  fecha?: Date;
}

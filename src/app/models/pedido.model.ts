import { Producto } from './producto.model';
import { Cliente } from './usuario.model';
import { Repartidor } from './usuario.model';

export class Pedido {
  constructor(
    public _id?: string,
    public nombre?: string,
    public cliente?: Cliente | string,
    public productos?: Producto[],
    public repartidor?: Repartidor | string,
    public direccionEntrega?: string,
    public total?: number,
    public imagen?: string,
    public estado?: 'listo' | 'preparando' | 'en camino' | 'entregado',
    public fecha?: Date,
    public muestra?: boolean
  ) {}
}

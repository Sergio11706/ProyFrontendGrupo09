export interface Pedido {
  _id?: string;
  codigoPedido: number;
  nombre: string;
  fecha: Date;
  direccionEntrega: string;
  productos: any[];
  total: number;
}

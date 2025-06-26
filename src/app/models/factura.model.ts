export interface Factura {
  _id?: string;
  codigoFactura: number;
  montoTotal: number;
  cliente: string;
  metodoPago: string;
  fechaEmision: string;
}

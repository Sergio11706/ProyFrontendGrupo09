export interface Producto {
  _id: string;
  codigo: number;
  nombre: string;
  precio: number;
  precioUnitario: number;
  stock: number;
  tipoProducto: 'Bebida' | 'Ingrediente';
}

export class Producto {
  constructor(
    public _id?: string,
    public nombre?: string,
    public unidadMedida?: string,
    public stock?: number,
    public precioUnitario?: number,
    public vencimiento?: Date,
    public disponible?: boolean,
    public tipoProducto?: 'Bebida' | 'Ingrediente',
    public imagen?: string
  ) {}
}

export class Bebida extends Producto {
  constructor(
    _id?: string,
    nombre?: string,
    unidadMedida?: string,
    stock?: number,
    precioUnitario?: number,
    vencimiento?: Date,
    disponible?: boolean,
    tipoProducto?: 'Bebida' | 'Ingrediente',
    imagen?: string,
    public volumen?: number,
    public tipoBebida?: string
  ) {
    super(_id, nombre, unidadMedida, stock, precioUnitario, vencimiento, disponible, tipoProducto, imagen);
  }
}


export class Ingrediente extends Producto {
  constructor(
    _id?: string,
    nombre?: string,
    unidadMedida?: string,
    stock?: number,
    precioUnitario?: number,
    vencimiento?: Date,
    disponible?: boolean,
    tipoProducto?: 'Bebida' | 'Ingrediente',
    imagen?: string,
    public categoria?: string,
    public proveedor?: string
  ) {
    super(_id, nombre, unidadMedida, stock, precioUnitario, vencimiento, disponible, tipoProducto, imagen);
  }
}
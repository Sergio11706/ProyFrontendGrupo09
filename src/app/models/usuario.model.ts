export class Usuario {
  constructor(
    public _id?: string,
    public username?: string,
    public password?: string,
    public nombre?: string,
    public apellido?: string,
    public estado?: boolean,
    public email?: string,
    public telefono?: string,
    public activo?: boolean,
    public tipoUsuario?: 'Administrador' | 'Cliente' | 'Repartidor'
  ) {}
}

export class Administrador extends Usuario {
  constructor(
    _id: string,
    username: string,
    password: string,
    nombre: string,
    apellido: string,
    estado: boolean,
    email: string,
    telefono: string,
    activo: boolean,
    permisos: number,
    ultimaModificacion: string
  ) {
    super(_id, username, password, nombre, apellido, estado, email, telefono, activo, 'Administrador');
  }
}


export class Cliente extends Usuario {
  constructor(
    _id: string,
    username: string,
    password: string,
    nombre: string,
    apellido: string,
    estado: boolean,
    email: string,
    telefono: string,
    activo: boolean,
    barrio: string,
    calle: string,
    numeroCalle: number,
    descuento: number
  ) {
    super(_id, username, password, nombre, apellido, estado, email, telefono, activo, 'Cliente');
  }
}

export class Repartidor extends Usuario {
  constructor(
    _id: string,
    username: string,
    password: string,
    nombre: string,
    apellido: string,
    estado: boolean,
    email: string,
    telefono: string,
    activo: boolean,
    documento: string,
    numeroLicencia: string,
    domicilio: string,
    vehiculo: string,
    zonaAsignada: string,
    rating: number
  ) {
    super(_id, username, password, nombre, apellido, estado, email, telefono, activo, 'Repartidor');
  }
}
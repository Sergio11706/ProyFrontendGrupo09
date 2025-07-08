export class Usuario {
  constructor(
    public _id?: string,
    public username?: string,
    public password?: string,
    public nombre?: string,
    public apellido?: string,
    public email?: string,
    public telefono?: string,
    public tipoUsuario?: 'Administrador' | 'Cliente' | 'Repartidor'
  ) {}
}

export class Administrador extends Usuario {
  constructor(
    _id?: string,
    username?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    email?: string,
    telefono?: string,
    public permisos?: number,
    public ultimaModificacion?: string
  ) {
    super(_id, username, password, nombre, apellido, email, telefono, 'Administrador');
  }
}


export class Cliente extends Usuario {
  constructor(
    _id?: string,
    username?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    email?: string,
    telefono?: string,
    public barrio?: string,
    public calle?: string,
    public numeroCalle?: number,
    public descuento?: number,
    public tienePedido?: boolean
  ) {
    super(_id, username, password, nombre, apellido, email, telefono, 'Cliente');
  }
}

export class Repartidor extends Usuario {
  constructor(
    _id?: string,
    username?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    email?: string,
    telefono?: string,
    public estado?: 'aprobado' | 'pendiente' | 'rechazado',
    public documento?: string,
    public numeroLicencia?: string,
    public vehiculo?: string,
    public zonaTrabajo?: string,
    public rating?: number,
  ) {
    super(_id, username, password, nombre, apellido, email, telefono, 'Repartidor');
  }
}
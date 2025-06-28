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
    _id?: string,
    username?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    estado?: boolean,
    email?: string,
    telefono?: string,
    activo?: boolean,
    public permisos?: number,
    public ultimaModificacion?: string
  ) {
    super(_id, username, password, nombre, apellido, estado, email, telefono, activo, 'Administrador');
  }
}


export class Cliente extends Usuario {
  constructor(
    _id?: string,
    username?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    estado?: boolean,
    email?: string,
    telefono?: string,
    activo?: boolean,
    public barrio?: string,
    public calle?: string,
    public numeroCalle?: number,
    public descuento?: number
  ) {
    super(_id, username, password, nombre, apellido, estado, email, telefono, activo, 'Cliente');
  }
}

export class Repartidor extends Usuario {
  constructor(
    _id?: string,
    username?: string,
    password?: string,
    nombre?: string,
    apellido?: string,
    estado?: boolean,
    email?: string,
    telefono?: string,
    activo?: boolean,
    public documento?: string,
    public numeroLicencia?: string,
    public domicilio?: string,
    public vehiculo?: string,
    public zonaAsignada?: string,
    public rating?: number
  ) {
    super(_id, username, password, nombre, apellido, estado, email, telefono, activo, 'Repartidor');
  }
}
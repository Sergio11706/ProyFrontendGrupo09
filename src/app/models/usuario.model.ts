export interface Usuario {
  _id: string;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  estado: boolean;
  email: string;
  telefono: string;
  activo: boolean;
  tipoUsuario: 'Administrador' | 'Cliente' | 'Repartidor';
}


export class Administrador implements Usuario {
  tipoUsuario: 'Administrador' = 'Administrador';
  constructor(
    public _id: string,
    public username: string,
    public password: string,
    public nombre: string,
    public apellido: string,
    public estado: boolean,
    public email: string,
    public telefono: string,
    public activo: boolean,
    public permisos: number,
    public ultimaModificacion: string
  ) {}
}

export class Cliente implements Usuario {
  tipoUsuario: 'Cliente' = 'Cliente';
  constructor(
    public _id: string,
    public username: string,
    public password: string,
    public nombre: string,
    public apellido: string,
    public estado: boolean,
    public email: string,
    public telefono: string,
    public activo: boolean,
    public barrio: string,
    public calle: string,
    public numeroCalle: number,
    public descuento: number
  ) {}
}

export class Repartidor implements Usuario {
  tipoUsuario: 'Repartidor' = 'Repartidor';
  constructor(
    public _id: string,
    public username: string,
    public password: string,
    public nombre: string,
    public apellido: string,
    public estado: boolean,
    public email: string,
    public telefono: string,
    public activo: boolean,
    public documento: string,
    public numeroLicencia: string,
    public domicilio: string,
    public vehiculo: string,
    public zonaAsignada: string,
    public rating: number
  ) {}
}
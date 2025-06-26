export interface Usuario {
  _id?: string;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  activo: boolean;
  tipo?: 'admin' | 'cliente' | 'repartidor';
}

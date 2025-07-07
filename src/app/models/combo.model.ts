export class Combo {
  public cantidad?: number;
  
  constructor(
    public _id?: string,
    public nombre?: string,
    public descripcion?: string,
    public precio?: number,
    public imagen?: string,
    public componentes?: string[],
    public disponible?: boolean,
    public categoria?: string
  ) {}
} 
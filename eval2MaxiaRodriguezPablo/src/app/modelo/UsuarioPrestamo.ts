import { Libro } from './Libro';

export class UsuarioPrestamo {
  public constructor(
    public id: number,
    public apellidos: string,
    public nombre: string,
    public librosPrestamo: Libro[]
  ) {}
}

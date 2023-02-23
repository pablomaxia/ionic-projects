export class Libro {
  public constructor(
    public id: number,
    public titulo: string,
    public fechaPrestamo: string,
    public diasPrestamo?: number,
    public idUsuarioPrestamo?: number
  ) {}
}

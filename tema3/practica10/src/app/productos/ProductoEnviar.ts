export class ProductoEnviar {
  public constructor(
    public descripcion: string,
    public unidades: number,
    public importeUnitario: number,
    public importeTotal: number
  ) {}
}

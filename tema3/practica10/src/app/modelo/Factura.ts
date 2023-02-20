import { LineaDetalle } from './LineaDetalle';

export class Factura {
  constructor(
    public id: number,
    public cliente: string,
    public porcentajeIva: number,
    public productos: LineaDetalle[]
  ) {}

  public static crearFacturaVacia(): Factura {
    return new Factura(null, null, 21, new Array());
  }

  public getTotalSinIva(): number {
    let total: number = 0;
    this.productos.forEach((producto) => {
      total += producto.importeUnitario * producto.unidades;
    });

    return total;
  }

  public getIva(): number {
    return (this.getTotalSinIva() * this.porcentajeIva) / 100;
  }

  public getTotalConIva(): number {
    return this.getTotalSinIva() * this.getIva();
  }
}

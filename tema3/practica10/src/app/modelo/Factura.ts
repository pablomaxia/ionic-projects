import { LineaDetalle } from './LineaDetalle';

export class Factura {
  constructor(
    public id: number,
    public cliente: string,
    public porcentajeIva: number,
    public productos: LineaDetalle[]
  ) {}

  public static crearFacturaVacia(): Factura {
    return new Factura(null, null, null, new Array());
  }

  public getTotalSinIva(): number {
    let total: number = 0;
    this.productos.forEach((producto) => {
      total += producto.importeUnitario * producto.unidades;
    });

    //total = total * (1 + this.porcentajeIva / 100);

    return total;
  }

  public getTotalConIva(): number {
    let total: number = 0;
    this.productos.forEach((producto) => {
      total += producto.importeUnitario * producto.unidades;
    });

    total = total * (1 + this.porcentajeIva / 100);

    return total;
  }
}

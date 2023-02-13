import { LineaDetalle } from './LineaDetalle';

export class Factura {
  constructor(
    public id: number,
    public cliente: string,
    public porcentajeIva: number,
    public productos: LineaDetalle[]
  ) {}
}

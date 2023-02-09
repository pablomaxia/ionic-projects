import { FacturaInterface } from './FacturaInterface';
import { ProductoFactura } from './ProductoFactura';

export class Factura implements FacturaInterface {
  constructor(
    public id: number,
    public cliente: string,
    public porcentajeIva: number,
    public productos: ProductoFactura[]
  ) {}
}

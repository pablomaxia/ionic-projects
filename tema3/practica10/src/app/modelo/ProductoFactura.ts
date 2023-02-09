import { ProductoFacturaInterface } from './ProductoFacturaInterface';

export class ProductoFactura implements ProductoFacturaInterface {
  constructor(
    public descripcion: string,
    public importeUnitario: number,
    public unidades: number
  ) {}
}

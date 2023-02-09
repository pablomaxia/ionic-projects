import { ProductoFactura } from './ProductoFactura';

export interface FacturaInterface {
  id: number;
  cliente: string;
  porcentajeIva: number;
  productos: ProductoFactura[];
}

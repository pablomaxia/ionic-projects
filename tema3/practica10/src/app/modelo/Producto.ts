import { ProductoInterface } from './ProductoInterface';

export class Producto implements ProductoInterface {
  constructor(
    public id: number,
    public descripcion: string,
    public importeUnitario: number
  ) {}
}

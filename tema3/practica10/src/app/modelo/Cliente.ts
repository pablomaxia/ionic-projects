export class Cliente {
  constructor(public id: number, public cliente: string) {}

  public static crearClienteVacio(): Cliente {
    return new Cliente(null, null);
  }
}

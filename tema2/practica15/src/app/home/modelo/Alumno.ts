export class Alumno {
  constructor(
    public apellidos: string,
    public nombre: string,
    public sexo: string,
    public edad: number,
    public dni: string,
    public trabaja: boolean,
    public estadoCivil: string,
    public dniPadre: string,
    public dniMadre: string,
    public apellidosPadre: string,
    public apellidosMadre: string
  ) {}
}

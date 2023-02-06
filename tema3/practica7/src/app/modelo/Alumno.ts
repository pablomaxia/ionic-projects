import { AlumnoInterface } from './AlumnoInterface';

export class Alumno implements AlumnoInterface {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public idGrupo: number
  ) {}
}

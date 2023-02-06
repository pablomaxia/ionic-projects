import { Alumno } from '../modelo/Alumno';
import { Grupo } from '../modelo/Grupo';

export class AlumnoGrupo {
  public constructor(public grupo: Grupo, public alumnos: Alumno[]) {}
}

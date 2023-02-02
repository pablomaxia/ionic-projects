export interface Alumno {
  id: number;
  first_name: string;
  last_name: string;
  idGrupo: number;
}

export interface Grupo {
  id: number;
  grupo: string;
}

export interface AlumnoGrupo {
  alumno: Alumno;
  grupo: Grupo;
}

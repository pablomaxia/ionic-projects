export class Alumno {
  id: number;
  first_name: string;
  last_name: string;
  idGrupo: number;

  constructor(alumnoJson: any) {
    this.id = alumnoJson.id;
    this.first_name = alumnoJson.first_name;
    this.last_name = alumnoJson.last_name;
    this.idGrupo = alumnoJson.idGrupo;
  }
}

export class Grupo {
  id: number;
  grupo: string;
  alumnos: Alumno[];

  constructor(grupoJson: any) {
    this.id = grupoJson.id;
    this.grupo = grupoJson.grupo;
    this.alumnos = [];
  }
}

export class AlumnoGrupo {
  alumno: Alumno;
  grupo: Grupo;

  constructor(alumnoGrupoJson: any) {
    this.alumno = alumnoGrupoJson.alumno;
    this.grupo = alumnoGrupoJson.grupo;
  }
}

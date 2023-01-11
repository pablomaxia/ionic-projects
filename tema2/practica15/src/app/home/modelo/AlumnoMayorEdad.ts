import { Alumno } from "./Alumno";

export class AlumnoMayorEdad{
    constructor(
        public alumno:Alumno,
        public dniAlumno:string,
        public trabaja:boolean,
        public estadoCivil:string
        ){}
}
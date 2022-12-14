import { Alumno } from "./Alumno";

export class AlumnoMenorEdad{
    constructor(
        public alumno:Alumno,
        public dniPadre:string,
        public dniMadre:string,
        public apellidosPadre:string,
        public apellidosMadre:string,
        ){}
}
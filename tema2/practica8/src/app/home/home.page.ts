import { AlumnoAsignatura } from './../modelo/AlumnoAsignatura';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private asignaturas: string[] = ["Matemáticas","Lengua","Historia"];
  private alumnos: string[] = ["A","S","M"];
  private alumnosAsignaturas: AlumnoAsignatura[];
  private alumnosSel: string[];

  private asigSel: string;
  private alu: string;

  constructor() {
  }


  cambiaAsignaturas(event){
    console.log(event.target.value);
    console.log(this.asigSel);
  }

  seleccionadosAlumnos(event) {
    console.log(this.alumnosSel);
    this.alumnosAsignaturas=[];
    this.alumnosSel.forEach((alumno:string)=>{
      this.alumnosAsignaturas.push(new AlumnoAsignatura(alumno,this.asigSel));
    })
  } 
}

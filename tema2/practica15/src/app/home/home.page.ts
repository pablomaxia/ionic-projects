import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Alumno } from './modelo/Alumno';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public alumno: Alumno;

  constructor(private navCtrl: NavController) {
    this.alumno = new Alumno("","","",0,"",false,"","","","","");
  }

  datosAlumno(alumno: Alumno) {
    console.log(alumno);
    if (this.comprobarDatos(alumno)){
      let navigationExtras: NavigationExtras = {
        queryParams: {
          alumno: JSON.stringify(alumno),
        },
      };
      this.navCtrl.navigateForward('/pagina2', navigationExtras);
    }
    else{
      alert("Faltan datos por poner");
    }
    }

  comprobarDatos(alumno: Alumno){
    console.log(alumno);

    if(alumno.edad >= 18){
      return alumno.apellidos && alumno.nombre && alumno.sexo && alumno.edad && alumno.dni && alumno.trabaja && alumno.estadoCivil;
    }
    else{
      return alumno.apellidos && alumno.nombre && alumno.sexo && alumno.edad && alumno.dniPadre && alumno.dniMadre && alumno.apellidosPadre && alumno.apellidosMadre; 
    }
  }
}

import { Alumno } from './../home/modelo/Alumno';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

  private alumno:Alumno;
  private mensaje:string;

  constructor(private alertController: AlertController,private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe((params) => {
      this.alumno = JSON.parse(params['alumno']);
      console.log(this.alumno);
      if (this.alumno.edad >= 18){
        this.mensaje = 
          "Nombre: "+ this.alumno.nombre + " - \n" +
          "Apellidos: "+ this.alumno.apellidos + " - \n" +
          "Sexo: "+ this.alumno.sexo + " - \n" +
          "Edad: "+ this.alumno.edad + " - \n" +
          "DNI: "+ this.alumno.dni + " - \n" +
          "Trabaja: "+ this.alumno.trabaja + " - \n" +
          "Estado Civil: "+ this.alumno.estadoCivil + "\n"
      }
      else{
        this.mensaje = 
          "Nombre: "+ this.alumno.nombre + " - \n" +
          "Apellidos: "+ this.alumno.apellidos + " - \n" +
          "Sexo: "+ this.alumno.sexo + " - \n" +
          "Edad: "+ this.alumno.edad + " - \n" +
          "DNI Padre: "+ this.alumno.dniPadre + " - \n" +
          "DNI Madre: "+ this.alumno.dniMadre + " - \n" +
          "Apellidos Padre: "+ this.alumno.apellidosPadre + " - \n" +
          "Apellidos Madre: "+ this.alumno.apellidosMadre + "\n"
      }
      this.presentAlert();
    });
  }

  ngOnInit() {
  } 
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Datos del alumno: \n',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            "Gracias";
          },
        },
      ],
      message: this.mensaje,
    });

    await alert.present();
  }
}

import { InterfaceMunicipio } from './../modelo/Interfaces';
import { Component, OnInit } from '@angular/core';
import { InterfacePrevisionDiariaMunicipio } from '../modelo/Interfaces';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { PrevisionPresentacion } from '../modelo/PrevisionPresentacion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public listaPrevisiones: Array<PrevisionPresentacion> = new Array();
  public municipio: InterfaceMunicipio;

  constructor(
    private apiService: ApiServiceProvider,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.municipio = JSON.parse(params['municipio']);
    });
  }
  ngOnInit(): void {
    this.apiService
      .getPrevisionDiariaMunicipio(
        this.municipio.codProvincia + this.municipio.codMunicipio
      )
      .then((data: InterfacePrevisionDiariaMunicipio[]) => {
        let fechaHoraActual = moment(new Date());
        fechaHoraActual.locale('es');
        let horaActual: number = fechaHoraActual.hour();
        //previsión para hoy
        //solo añado la previsión de los intervalos horarios superiores
        //a la hora actual
        if (
          horaActual <
          Number.parseInt(
            data[0].prediccion.dia[0].estadoCielo[3].periodo.substring(3, 5)
          )
        ) {
          this.listaPrevisiones.push(
            //intervalo de las 0 a las 6
            new PrevisionPresentacion(
              'hoy',
              data[0].prediccion.dia[0].estadoCielo[3].periodo,
              data[0].prediccion.dia[0].estadoCielo[3].value,
              data[0].prediccion.dia[0].estadoCielo[3].descripcion
            )
          );
        }
        if (
          horaActual <
          Number.parseInt(
            data[0].prediccion.dia[0].estadoCielo[4].periodo.substring(3, 5)
          )
        ) {
          this.listaPrevisiones.push(
            //intervalo de las 6 a las 12
            new PrevisionPresentacion(
              'hoy',
              data[0].prediccion.dia[0].estadoCielo[4].periodo,
              data[0].prediccion.dia[0].estadoCielo[4].value,
              data[0].prediccion.dia[0].estadoCielo[4].descripcion
            )
          );
        }
        if (
          horaActual <
          Number.parseInt(
            data[0].prediccion.dia[0].estadoCielo[5].periodo.substring(3, 5)
          )
        ) {
          this.listaPrevisiones.push(
            //intervalo de las 12 a las 18
            new PrevisionPresentacion(
              'hoy',
              data[0].prediccion.dia[0].estadoCielo[5].periodo,
              data[0].prediccion.dia[0].estadoCielo[5].value,
              data[0].prediccion.dia[0].estadoCielo[5].descripcion
            )
          );
        }
        if (
          horaActual <
          Number.parseInt(
            data[0].prediccion.dia[0].estadoCielo[6].periodo.substring(3, 5)
          )
        ) {
          this.listaPrevisiones.push(
            //intervalo de las 18 a las 24
            new PrevisionPresentacion(
              'hoy',
              data[0].prediccion.dia[0].estadoCielo[6].periodo,
              data[0].prediccion.dia[0].estadoCielo[6].value,
              data[0].prediccion.dia[0].estadoCielo[6].descripcion
            )
          );
        }

        //previsión para mañana
        this.listaPrevisiones.push(
          //intervalo de las 0 a las 6
          new PrevisionPresentacion(
            'mañana',
            data[0].prediccion.dia[1].estadoCielo[3].periodo,
            data[0].prediccion.dia[1].estadoCielo[3].value,
            data[0].prediccion.dia[1].estadoCielo[3].descripcion
          )
        );
        this.listaPrevisiones.push(
          //intervalo de las 6 a las 12
          new PrevisionPresentacion(
            'mañana',
            data[0].prediccion.dia[1].estadoCielo[4].periodo,
            data[0].prediccion.dia[1].estadoCielo[4].value,
            data[0].prediccion.dia[1].estadoCielo[4].descripcion
          )
        );
        this.listaPrevisiones.push(
          //intervalo de las 12 a las 18
          new PrevisionPresentacion(
            'mañana',
            data[0].prediccion.dia[1].estadoCielo[5].periodo,
            data[0].prediccion.dia[1].estadoCielo[5].value,
            data[0].prediccion.dia[1].estadoCielo[5].descripcion
          )
        );
        this.listaPrevisiones.push(
          //intervalo de las 18 a las 24
          new PrevisionPresentacion(
            'mañana',
            data[0].prediccion.dia[1].estadoCielo[6].periodo,
            data[0].prediccion.dia[1].estadoCielo[6].value,
            data[0].prediccion.dia[1].estadoCielo[6].descripcion
          )
        );
        console.log(this.listaPrevisiones);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_ngOnInit
} //end_class

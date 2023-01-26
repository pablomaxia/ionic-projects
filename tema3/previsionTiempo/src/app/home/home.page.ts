import { EstadoCielo } from './../modelo/Interfaces';
import { Component, OnInit } from '@angular/core';
import { InterfacePrevisionDiariaMunicipio } from '../modelo/Interfaces';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public estadosCielo = new Array<EstadoCielo>();

  public municipio: string = '41901';

  constructor(
    private apiService: ApiServiceProvider,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //this.apiService.getMunicipios();
    this.activatedRoute.queryParams.subscribe((params) => {
      let municipioRecibido = JSON.parse(params['municipio']);
      this.municipio =
        municipioRecibido.codProvincia + municipioRecibido.codMunicipio; // Para formar el código completo
      console.log(this.municipio);
    });
    this.apiService
      .getPrevisionDiariaMunicipio(this.municipio)
      .then((data: InterfacePrevisionDiariaMunicipio[]) => {
        // previsión para hoy
        //if (data[0].prediccion.dia[0].fecha.getMilliseconds() < moment.now())
        this.estadosCielo.push(data[0].prediccion.dia[0].estadoCielo[3]); // intervalo de las 0 a las 6
        this.estadosCielo.push(data[0].prediccion.dia[0].estadoCielo[4]); // intervalo de las 7 a las 12
        this.estadosCielo.push(data[0].prediccion.dia[0].estadoCielo[5]); // intervalo de las 12 a las 18
        this.estadosCielo.push(data[0].prediccion.dia[0].estadoCielo[6]); // intervalo de las 18 a las 24
        // previsión para mañana
        this.estadosCielo.push(data[0].prediccion.dia[1].estadoCielo[3]); // intervalo de las 0 a las 6
        this.estadosCielo.push(data[0].prediccion.dia[1].estadoCielo[4]); // intervalo de las 7 a las 12
        this.estadosCielo.push(data[0].prediccion.dia[1].estadoCielo[5]); // intervalo de las 12 a las 18
        this.estadosCielo.push(data[0].prediccion.dia[1].estadoCielo[6]); // intervalo de las 18 a las 24

        console.log(this.estadosCielo);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_ngOnInit
} //end_class

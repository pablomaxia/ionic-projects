import { Component, OnInit } from '@angular/core';
import { InterfaceMunicipio } from '../modelo/Interfaces';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.page.html',
  styleUrls: ['./municipios.page.scss'],
})
export class MunicipiosPage implements OnInit {
  public municipios: InterfaceMunicipio[] = new Array();
  public municipiosBuscados: InterfaceMunicipio[] = new Array();

  public busqueda: string;

  constructor(private apiService: ApiServiceProvider) {}
  ngOnInit(): void {
    this.busquedaMunicipios(this.busqueda);
  } //end_ngOnInit

  busquedaMunicipios(cadena: string) {
    this.apiService
      .busquedaMunicipios(cadena)
      .then((data: InterfaceMunicipio[]) => {
        console.log(data);
        this.municipiosBuscados = data;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_busquedaMunicipios

  getMunicipios() {
    this.apiService
      .getMunicipios()
      .then((data: InterfaceMunicipio[]) => {
        console.log(data[0].municipio);
        this.municipios = data;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getMunicipios
} //end_class

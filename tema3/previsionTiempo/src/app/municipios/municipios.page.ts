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
  constructor(private apiService: ApiServiceProvider) {}
  ngOnInit(): void {
    this.apiService
      .getMunicipios()
      .then((data: InterfaceMunicipio[]) => {
        console.log(data[0].municipio);
        this.municipios = data;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_ngOnInit
} //end_class

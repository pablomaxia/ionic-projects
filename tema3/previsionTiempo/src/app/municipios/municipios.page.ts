import { Component, OnInit } from '@angular/core';
import { InterfaceMunicipio } from '../modelo/Interfaces';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.page.html',
  styleUrls: ['./municipios.page.scss'],
})
export class MunicipiosPage implements OnInit {
  public municipios: InterfaceMunicipio[];
  public municipiosBuscados: InterfaceMunicipio[];

  public municipioBuscar: string;

  constructor(
    private apiService: ApiServiceProvider,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.apiService
      .getMunicipios()
      .then((data: InterfaceMunicipio[]) => {
        this.municipios = data;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_ngOnInit

  buscarMunicipio() {
    if (this.municipioBuscar.trim() == '') {
      this.municipiosBuscados = new Array();
      return;
    }
    this.municipiosBuscados = new Array();
    this.municipios.forEach((municipio) => {
      if (
        municipio.municipio
          .toUpperCase()
          .startsWith(this.municipioBuscar.trim().toUpperCase())
      ) {
        this.municipiosBuscados.push(municipio);
      }
    });
  }

  municipioClick(municipio: InterfaceMunicipio) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        municipio: JSON.stringify(municipio),
      },
    };
    this.navCtrl.navigateForward('/home', navigationExtras);
  }
} //end_class

import { AlumnoGrupo, Grupo } from './../modelo/Interfaces';
import { Component, OnInit } from '@angular/core';
import { Alumno } from '../modelo/Interfaces';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public alumnos = new Array<Alumno>();
  public grupos = new Array<Grupo>();

  public alumnosGrupo = new Array<AlumnoGrupo>();

  constructor(private apiService: ApiServiceProvider) {}

  async ngOnInit() {
    this.grupos = await this.apiService.getGrupos();
    for (const grupo of this.grupos) {
      grupo.alumnos = await this.apiService.getAlumnosGrupo(grupo.id);
    }
  } //end_ngOnInit

  async getAlumnosGrupo(idGrupo: number) {
    await this.apiService
      .getAlumnosGrupo(idGrupo)
      .then((alumnos: Alumno[]) => {
        this.alumnos = alumnos;
        console.log(this.alumnos);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }
  async getGrupos() {
    await this.apiService
      .getGrupos()
      .then(async (grupos: Grupo[]) => {
        this.grupos = grupos;
        console.log(this.grupos);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getGrupos

  getAlumnos() {
    this.apiService
      .getAlumnos()
      .then((alumnos: Alumno[]) => {
        this.alumnos = alumnos;
        console.log(this.alumnos);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getAlumnos
} //end_class

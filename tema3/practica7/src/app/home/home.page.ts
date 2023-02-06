import { Component, OnInit } from '@angular/core';
import { AlumnoGrupo } from '../modelo/AlumnoGrupo';
import { Grupo } from '../modelo/Grupo';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public grupos = new Array<Grupo>();
  public alumnosGrupo = new Array<AlumnoGrupo>();

  constructor(private apiService: ApiServiceProvider) {}

  async ngOnInit() {
    this.apiService
      .getGrupos()
      .then((grupos: Grupo[]) => {
        this.grupos = grupos;
        this.grupos.forEach((grupo) => {
          this.apiService
            .getAlumnosGrupo(grupo.id)
            .then((alumnos) => {
              let elementoLista = new AlumnoGrupo(grupo, alumnos);
              this.alumnosGrupo.push(elementoLista);
            })
            .catch((error: string) => {
              console.log(error);
            });
        });
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_ngOnInit
} //end_class

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from 'src/app/modelo/Alumno';
import { Grupo } from 'src/app/modelo/Grupo';

@Injectable()
export class ApiServiceProvider {
  private URL = 'http://localhost:3000';

  constructor(public http: HttpClient) {}

  getAlumnos(): Promise<Alumno[]> {
    let promise = new Promise<Alumno[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/alumnos')
        .toPromise()
        .then((data: any) => {
          let alumnos = new Array<Alumno>();
          data.forEach((alumno: Alumno) => {
            alumnos.push(alumno);
          });
          resolve(alumnos);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  } //end_getAlumnos

  getGrupos(): Promise<Grupo[]> {
    let promise = new Promise<Grupo[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/grupos')
        .toPromise()
        .then((data: any) => {
          let grupos = new Array<Grupo>();
          data.forEach((grupo: Grupo) => {
            grupos.push(grupo);
          });
          resolve(grupos);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  } //end_getGrupos

  getAlumnosGrupo(idGrupo: number) {
    let promise = new Promise<Alumno[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/alumnos/?idGrupo=' + idGrupo)
        .toPromise()
        .then((data: any) => {
          let alumnos = new Array<Alumno>();
          data.forEach((alumno: Alumno) => {
            alumnos.push(alumno);
          });
          resolve(alumnos);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  } //end_getAlumnosGrupo
} //end_class

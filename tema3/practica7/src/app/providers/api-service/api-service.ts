import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno, Grupo, AlumnoGrupo } from 'src/app/modelo/Interfaces';

@Injectable()
export class ApiServiceProvider {
  private URL = 'http://localhost:3000';

  constructor(public http: HttpClient) {}

  async getAlumnos(): Promise<Alumno[]> {
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

  async getGrupos(): Promise<Grupo[]> {
    let promise = new Promise<Grupo[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/grupos')
        .toPromise()
        .then((data: any) => {
          data = data.map((g: any) => {
            return new Grupo(g);
          });
          resolve(data);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  } //end_getGrupos

  async getAlumnosGrupo(idGrupo: number) {
    let promise = new Promise<Alumno[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/alumnos/?idGrupo=' + idGrupo)
        .toPromise()
        .then((data: any) => {
          data = data.map((a: any) => {
            return new Alumno(a);
          });
          resolve(data);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  } //end_getAlumnosGrupo
} //end_class

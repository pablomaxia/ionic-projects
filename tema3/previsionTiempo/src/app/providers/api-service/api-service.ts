import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterfacePrevisionDiariaMunicipio } from 'src/app/modelo/Interfaces';

@Injectable()
export class ApiServiceProvider {
  private URL: string =
    'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/';
  private API_KEY: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwYWJsby5tYXhpYS5yb2RyaWd1ZXouYWx1QGllc2p1bGlvdmVybmUuZXMiLCJqdGkiOiIxYmIyMTExMS1iZTE0LTRkNGItOWEyMS0xMWMwZmU5ZTgzMDkiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTY3NDA3MjE4NiwidXNlcklkIjoiMWJiMjExMTEtYmUxNC00ZDRiLTlhMjEtMTFjMGZlOWU4MzA5Iiwicm9sZSI6IiJ9.4kpwTCiipV9R6GtCrnP7bBqyueYW-uM9iWmkGJB-J-8';

  constructor(public http: HttpClient) {}
  getPrevisionDiariaMunicipio(
    municipio: string
  ): Promise<InterfacePrevisionDiariaMunicipio[]> {
    let promise = new Promise<InterfacePrevisionDiariaMunicipio[]>(
      (resolve, reject) => {
        this.http
          .get(this.URL + municipio + '/?api_key=' + this.API_KEY)
          .toPromise()
          .then((data: any) => {
            this.http
              .get(data['datos'])
              .toPromise()
              .then((data: any) => {
                console.log(data);
                resolve(data);
              })
              .catch((error: Error) => {
                reject(error.message);
              });
          })
          .catch((error: Error) => {
            reject(error.message);
          });
      }
    );
    return promise;
  } //end_getPrevisionDiariaMunicipio

  /*eliminarAlumno(id: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.delete(this.URL + "/alumnos/" + id).toPromise().then(
                (data: any) => { // Success
                    console.log(data)
                    resolve(true);
                }
            )
                .catch((error: Error) => {
                    console.log(error.message);
                    reject(error.message);
                });
        });
        return promise;
    }//end_eliminar_alumno*/
} //end_class

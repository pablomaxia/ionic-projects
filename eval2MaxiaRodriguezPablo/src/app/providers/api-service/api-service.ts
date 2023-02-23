import { Libro } from './../../modelo/Libro';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/modelo/Usuario';

@Injectable()
export class ApiServiceProvider {
  private URL = 'http://localhost:3000';

  constructor(public http: HttpClient) {}

  busquedaUsuario(id: number): Promise<Usuario> {
    let promise = new Promise<Usuario>((resolve, reject) => {
      this.http
        .get(this.URL + '/usuarios/?id=' + id)
        .toPromise()
        .then((data: any) => {
          let usuario = data;
          console.log(usuario);
          resolve(usuario);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  }
  //end busquedaUsuario

  getUsuarios(): Promise<Usuario[]> {
    let promise = new Promise<Usuario[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/usuarios')
        .toPromise()
        .then((data: any) => {
          let usuarios = new Array<Usuario>();
          data.forEach((usuario: Usuario) => {
            usuarios.push(usuario);
          });
          resolve(usuarios);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  }
  //end_getUsuarios
  getLibrosUsuario(idUsuario: number): Promise<Libro[]> {
    let promise = new Promise<Libro[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/libros/?idUsuarioPrestamo=' + idUsuario)
        .toPromise()
        .then((data: any) => {
          let libros = new Array<Libro>();
          data.forEach((libro: Libro) => {
            libros.push(libro);
          });
          resolve(libros);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  }
  //end_getLibrosUsuario
  getLibros(): Promise<Libro[]> {
    let promise = new Promise<Libro[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/libros')
        .toPromise()
        .then((data: any) => {
          let libros = new Array<Libro>();
          data.forEach((libro: Libro) => {
            libros.push(libro);
          });
          resolve(libros);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  }
  //end_getLibros

  modificarLibro(nuevosDatosLibro: Libro): Promise<Libro> {
    let promise = new Promise<Libro>((resolve, reject) => {
      var header = { headers: { 'Content-Type': 'application/json' } };
      let datos = JSON.stringify(nuevosDatosLibro);
      this.http
        .put(this.URL + '/libros/' + nuevosDatosLibro.id, datos, header)
        .toPromise()
        .then((data: any) => {
          // Success
          let libro: Libro;
          libro = data;
          resolve(libro);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  } //end_modificarLibro
  getLibrosCampo(campo: string, valorCampo: string): Promise<Libro[]> {
    let url =
      campo == 'titulo'
        ? this.URL + '/libros/?' + campo + '_like=' + valorCampo
        : this.URL + '/libros/?' + campo + '=' + valorCampo;
    let promise = new Promise<Libro[]>((resolve, reject) => {
      this.http
        .get(url)
        .toPromise()
        .then((data: any) => {
          let libros = new Array<Libro>();
          data.forEach((libro: Libro) => {
            libros.push(libro);
          });
          resolve(libros);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  }
  //end_getLibrosCampo
}

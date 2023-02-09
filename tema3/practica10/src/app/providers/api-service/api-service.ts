import { Factura } from './../../modelo/Factura';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/modelo/Cliente';

@Injectable()
export class ApiServiceProvider {
  private URL = 'http://localhost:3000';

  constructor(public http: HttpClient) {}

  getClientes(): Promise<Cliente[]> {
    let promise = new Promise<Cliente[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/clientes')
        .toPromise()
        .then((data: any) => {
          let clientes = new Array<Cliente>();
          data.forEach((cliente: Cliente) => {
            clientes.push(cliente);
          });
          resolve(clientes);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });

    return promise;
  } //end_getClientes

  getFacturas(): Promise<Factura[]> {
    let promise = new Promise<Factura[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/facturas')
        .toPromise()
        .then((data: any) => {
          let facturas = new Array<Factura>();
          data.forEach((factura: Factura) => {
            facturas.push(factura);
          });
          resolve(facturas);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });

    return promise;
  } //end_getFacturas
}

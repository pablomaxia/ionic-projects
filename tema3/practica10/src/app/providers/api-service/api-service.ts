import { Factura } from './../../modelo/Factura';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/modelo/Cliente';
import { LineaDetalle } from 'src/app/modelo/LineaDetalle';
import { Producto } from 'src/app/modelo/Producto';

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

  getClientesPaginado(
    numPagina: number,
    numElementosPorPagina: number,
    campo: string,
    order: string
  ): Promise<Cliente[]> {
    let promise = new Promise<Cliente[]>((resolve, reject) => {
      this.http
        .get(
          this.URL +
            '/clientes/?_page=' +
            numPagina +
            '&_limit=' +
            numElementosPorPagina +
            '&_sort=' +
            campo +
            '&_order=' +
            order
        )
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
  } //end_getClientesPaginado

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

  getLineasDetalle(): Promise<LineaDetalle[]> {
    let promise = new Promise<LineaDetalle[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/productos')
        .toPromise()
        .then((data: any) => {
          let productos = new Array<LineaDetalle>();
          data.forEach((producto: LineaDetalle) => {
            productos.push(producto);
          });
          resolve(productos);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });

    return promise;
  } // end_getLineasDetalle

  getProductos(): Promise<Map<number, Producto>> {
    let promise = new Promise<Map<number, Producto>>((resolve, reject) => {
      this.http
        .get(this.URL + '/productos')
        .toPromise()
        .then((data: any) => {
          let productos = new Map<number, Producto>();
          data.forEach((producto: Producto) => {
            productos.set(producto.id, producto);
          });
          resolve(productos);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });

    return promise;
  } // end_getProductos

  getProductosArray(): Promise<Producto[]> {
    let promise = new Promise<Producto[]>((resolve, reject) => {
      this.http
        .get(this.URL + '/productos')
        .toPromise()
        .then((data: any) => {
          let productos = new Array<Producto>();
          data.forEach((producto: Producto) => {
            productos.push(producto);
          });
          resolve(productos);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });

    return promise;
  } // end_getProductosArray

  insertarFactura(datosNuevaFactura: Factura): Promise<Factura> {
    let promise = new Promise<Factura>((resolve, reject) => {
      var header = { headers: { 'Content-Type': 'application/json' } };
      let datos = JSON.stringify(datosNuevaFactura);
      this.http
        .post(this.URL + '/facturas/', datos, header)
        .toPromise()
        .then((data: any) => {
          // Success
          let factura: Factura;
          factura = data;
          resolve(factura);
        })
        .catch((error: Error) => {
          reject(error.message);
        });
    });
    return promise;
  }
  //end_insertarFactura
}

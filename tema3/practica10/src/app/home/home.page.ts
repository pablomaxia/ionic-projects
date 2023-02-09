import { Factura } from './../modelo/Factura';
import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public clientes: Cliente[];
  public facturas: Factura[];

  constructor(
    private apiService: ApiServiceProvider,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.getFacturas();
  }

  getClientes() {
    this.apiService
      .getClientes()
      .then((clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(this.clientes);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getClientes

  getFacturas() {
    this.apiService
      .getFacturas()
      .then((facturas: Factura[]) => {
        this.facturas = facturas;
        console.log(this.facturas);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getFacturas

  public importeTotal(factura: Factura): number {
    let total: number = 0;

    factura.productos.forEach((producto) => {
      total += producto.importeUnitario * producto.unidades;
      //console.log(total);
    });
    total *= factura.porcentajeIva;

    return Math.round(total);
  } // end_importeTotal

  crearFactura() {
    this.navCtrl.navigateForward('/nueva-factura');
  } // end_crearFactura
}

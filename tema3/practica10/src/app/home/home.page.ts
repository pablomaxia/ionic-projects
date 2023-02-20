import { NuevaFacturaPage } from './../nueva-factura/nueva-factura.page';
import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ElementoLista } from './ElementoLista';
import { Factura } from './../modelo/Factura';
import { Cliente } from '../modelo/Cliente';
import { LineaDetalle } from '../modelo/LineaDetalle';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public facturas: Factura[];
  public lista: ElementoLista[] = new Array();

  constructor(
    private apiService: ApiServiceProvider,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getFacturas();
  } //end_ngOnInit

  ionViewWillEnter() {
    console.log(this.lista);
  } //end_ionViewWillEnter

  getFacturas() {
    this.apiService
      .getFacturas()
      .then((facturas: Factura[]) => {
        this.facturas = facturas;
        this.lista = new Array();

        // recorre todas las facturas
        this.facturas.forEach((factura: Factura) => {
          let importeTotalSinIva: number = 0.0;
          // recorro todos los productos de la factura
          for (let i: number = 0; i < factura.productos.length; i++) {
            let lineaDetalle: LineaDetalle = factura.productos[i];

            importeTotalSinIva +=
              lineaDetalle.importeUnitario * lineaDetalle.unidades;
          }
          //end for
          let importeTotalConIva =
            importeTotalSinIva * (1 + factura.porcentajeIva / 100);

          let elementoLista = new ElementoLista(
            factura.id,
            factura.cliente,
            Number.parseFloat(importeTotalConIva.toFixed(2))
          );
          this.lista.push(elementoLista);
        });
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getFacturas

  async crearFactura() {
    /*
    let lineasDetalle: LineaDetalle[] = new Array<LineaDetalle>();
    lineasDetalle.push(new LineaDetalle('descripcion1', 10, 4));
    lineasDetalle.push(new LineaDetalle('descripcion2', 20, 5));
    lineasDetalle.push(new LineaDetalle('descripcion3', 30, 6));

    let factura: Factura = new Factura(null, 'Pepe', 21, lineasDetalle);

    this.apiService
      .insertarFactura(factura)
      .then((factura: Factura) => {
        console.log(factura);
      })
      .catch((error: string) => console.log(error));
    this.navCtrl.navigateForward('/nueva-factura');
*/
    const modal = await this.modalController.create({
      component: NuevaFacturaPage,
    });
    modal.onDidDismiss().then((dataNuevaFactura) => {
      console.log(dataNuevaFactura['data']);
      let nuevaFactura: Factura = dataNuevaFactura['data'];
      console.log(nuevaFactura);
      if (nuevaFactura != null) {
        this.apiService
          .insertarFactura(nuevaFactura)
          .then((factura: Factura) => {
            this.facturas.push(factura);
          })
          .catch((error: string) => {
            console.log(error);
          });
      }
    });
    return await modal.present();
  } // end_crearFactura
}

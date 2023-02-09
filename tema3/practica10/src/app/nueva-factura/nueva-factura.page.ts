import { ProductoFactura } from './../modelo/ProductoFactura';
import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { Factura } from '../modelo/Factura';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.page.html',
  styleUrls: ['./nueva-factura.page.scss'],
})
export class NuevaFacturaPage implements OnInit {
  public clientes: Cliente[];
  public productos: ProductoFactura[];
  public factura: Factura;
  public facturas: Factura[];

  constructor(
    private apiService: ApiServiceProvider,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getClientes();
  } //end_ngOnInit

  getClientes() {
    this.apiService
      .getClientes()
      .then((clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(clientes);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getClientes

  getProductosFactura() {
    this.apiService
      .getProductosFactura()
      .then((productos: ProductoFactura[]) => {
        this.productos = productos;
        console.log(productos);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getProductosFactura

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

  public importeTotal(factura: Factura, iva: boolean): number {
    let total: number = 0;

    factura.productos.forEach((producto) => {
      total += producto.importeUnitario * producto.unidades;
      //console.log(total);
    });

    if (iva) {
      total *= factura.porcentajeIva;
    }

    return Math.round(total);
  } // end_importeTotal

  async anadirProductosFactura() {
    const modal = await this.modalController.create({
      component: NuevaFacturaPage,
      componentProps: {
        producto: JSON.stringify(new ProductoFactura(null, null, null)),
      },
    });

    modal.onDidDismiss().then((producto) => {});
    return await modal.present();
  } //end_anadirProductosFactura

  crearFactura() {
    this.apiService
      .insertarFactura(this.factura)
      .then((factura: Factura) => {
        this.facturas.push(factura);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_crearFactura

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,

      duration: 2000,
    });

    toast.present();
  } //end_presentToast
}

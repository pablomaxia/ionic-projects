import { ProductosPage } from './../productos/productos.page';
import { ProductoFactura } from './../modelo/ProductoFactura';
import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { Factura } from '../modelo/Factura';
import {
  ToastController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.page.html',
  styleUrls: ['./nueva-factura.page.scss'],
})
export class NuevaFacturaPage implements OnInit {
  public clientes: Cliente[];
  public productos: ProductoFactura[];
  public producto: ProductoFactura = new ProductoFactura('', 0, 0);
  public factura: Factura = new Factura(null, null, null, null);
  public facturas: Factura[];

  constructor(
    private apiService: ApiServiceProvider,
    private toastController: ToastController,
    private modalController: ModalController,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
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
    /*this.activatedRoute.queryParams.subscribe((params) => {
      this.producto = JSON.parse(params['producto']);
    });*/
    const modal = await this.modalController.create({
      component: ProductosPage,
      componentProps: {
        producto: JSON.stringify(this.producto),
      },
    });
    modal.onDidDismiss().then(() => {
      this.factura.productos.push(this.producto);
    });
    return await modal.present();
  } //end_anadirProductosFactura

  crearFactura() {
    this.apiService
      .insertarFactura(this.factura)
      .then((factura: Factura) => {
        this.facturas.push(factura);
        this.navCtrl.navigateForward('/home');
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

  cancelar() {
    this.navCtrl.navigateBack('/home');
  } //end_cancelar
}

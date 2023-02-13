import { ProductosPage } from './../productos/productos.page';
import { LineaDetalle } from './../modelo/LineaDetalle';
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
  public productos: LineaDetalle[] = new Array();
  public producto: LineaDetalle = new LineaDetalle('', 0, 0);
  public factura: Factura = new Factura(null, null, null, null);
  public facturas: Factura[] = new Array();

  constructor(
    private apiService: ApiServiceProvider,
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

  cancelar() {
    this.navCtrl.navigateBack('/home');
  } //end_cancelar
}

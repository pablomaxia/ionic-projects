import { ClientesPage } from './../clientes/clientes.page';
import { ProductosPage } from './../productos/productos.page';
import { LineaDetalle } from './../modelo/LineaDetalle';
import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { Factura } from '../modelo/Factura';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.page.html',
  styleUrls: ['./nueva-factura.page.scss'],
})
export class NuevaFacturaPage implements OnInit {
  public clientes: Cliente[];
  public factura: Factura = Factura.crearFacturaVacia();

  constructor(
    private apiService: ApiServiceProvider,
    private modalController: ModalController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    console.log(this.factura);
    this.getClientes();
  } //end_ngOnInit

  aceptar() {
    if (!this.factura.cliente || this.factura.productos.length == 0) return;
    this.modalCtrl.dismiss(this.factura);
  } //end_aceptar

  cancelar() {
    this.modalCtrl.dismiss(); //se cancela la edición. No se devuelven datos.
  } //end_cancelar

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

  async nuevoProducto() {
    const modal = await this.modalController.create({
      component: ProductosPage,
      componentProps: {},
    });
    modal.onDidDismiss().then((dataNuevaLineaDetalle) => {
      console.log(dataNuevaLineaDetalle['data']);
      let lineaDetalle: LineaDetalle = dataNuevaLineaDetalle['data'];
      if (lineaDetalle != null) {
        this.factura.productos.push(lineaDetalle);
      }
    });
    return await modal.present();
  } //end_nuevoProducto

  async nuevoCliente() {
    const modal = await this.modalController.create({
      component: ClientesPage,
      componentProps: {},
    });
    modal.onDidDismiss().then((dataNuevoCliente) => {
      console.log(dataNuevoCliente['data']);
      let cliente: Cliente = dataNuevoCliente['data'];
      if (cliente != null) {
        this.factura.cliente = cliente.cliente;
      }
    });
    return await modal.present();
  } //end_nuevoProducto
}

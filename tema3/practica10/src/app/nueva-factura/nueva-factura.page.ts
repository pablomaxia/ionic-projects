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
  private IVA: number[] = [];
  public clientes: Cliente[];
  public producto: LineaDetalle = new LineaDetalle('', 0, 0);
  public factura: Factura = Factura.crearFacturaVacia();
  public cliente: Cliente = Cliente.crearClienteVacio();

  constructor(
    private apiService: ApiServiceProvider,
    private modalController: ModalController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getClientes();
    for (let index = 1; index < 50; index++) {
      this.IVA.push(index);
    }
    console.log(this.factura);
    console.log(this.cliente);
  } //end_ngOnInit

  aceptar() {
    console.log(this.factura);
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

  async anadirProductosFactura() {
    const modal = await this.modalController.create({
      component: ProductosPage,
      componentProps: {
        productoEnviar: JSON.stringify(this.producto),
      },
    });
    modal.onDidDismiss().then((dataProducto) => {
      console.log(dataProducto['data']);
      let producto: LineaDetalle = new LineaDetalle(
        dataProducto['data'].descripcion,
        dataProducto['data'].importeUnitario,
        dataProducto['data'].unidades
      );
      console.log(producto);
      if (producto != null) {
        this.factura.productos.push(producto);
      }
    });
    return await modal.present();
  } //end_anadirProductosFactura
}

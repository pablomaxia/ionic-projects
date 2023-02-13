import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LineaDetalle } from '../modelo/LineaDetalle';
import { Producto } from '../modelo/Producto';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  public productos: Producto[];
  public productoEnviar: LineaDetalle = new LineaDetalle('', 0, 0);

  constructor(
    private apiService: ApiServiceProvider,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.apiService
      .getProductos()
      .then((productos: Producto[]) => {
        this.productos = productos;
        console.log(this.productos);
      })
      .catch((error: string) => console.log(error));
  } //end_ngOnInit

  enviarProducto() {
    /*let navigationExtras: NavigationExtras = {
      queryParams: {
        producto: JSON.stringify(this.productoEnviar),
      },
    };
    this.navCtrl.navigateForward('/nueva-factura', navigationExtras);*/
    this.navCtrl.navigateForward('/nueva-factura');
  } //end_enviarProducto

  cancelar() {
    this.navCtrl.navigateForward('/nueva-factura');
  } //end_cancelar
}

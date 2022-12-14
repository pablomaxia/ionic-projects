import { Component } from '@angular/core';
import { Producto } from '../modelo/Producto';
import { ProductoUnidades } from '../modelo/ProductoUnidades';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private idProductosSel: number[];
  private productosSel: Producto[];
  private productosUni: ProductoUnidades[];
  private productos: Producto[] = [
    {
      id: 1,
      descripcion: 'Champú anticaspa',
      precio: 5.99,
    },
    {
      id: 2,
      descripcion: 'Gel de manos',
      precio: 1.99,
    },
    {
      id: 3,
      descripcion: 'Desodorante',
      precio: 2.45,
    },
    {
      id: 4,
      descripcion: 'Gomina',
      precio: 6.25,
    },
    {
      id: 5,
      descripcion: 'Acondicionador',
      precio: 5,
    },
  ];
  constructor(private alertController: AlertController) {}

  /*productosSeleccionados(event) {
    console.log(this.productosSel);
    this.productosUni = [];
    this.productosSel.forEach((unidades: number) => {
      this.productosUni.push(
        new ProductoUnidades(
          this.productosSel.id,
          this.productosSel.descripcion,
          this.productosSel.precio,
          unidades
        )
      );
    });
  }*/
//(ionChange)="productosSeleccionados($event)"
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Inserte la cantidad de unidades de este producto:',
      buttons: ['OK'],
      inputs: [
        {
          type: 'number',
          placeholder: 'Unidades',
          min: 1,
          max: 100,
        }
      ],
    });
  
    await alert.present();
  }
 }
 


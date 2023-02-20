import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LineaDetalle } from '../modelo/LineaDetalle';
import { Producto } from '../modelo/Producto';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  public productos: Map<number, Producto>;
  public idProductoSeleccionado: number;
  public productoSeleccionado: Producto;
  public unidades: number;

  constructor(
    private apiService: ApiServiceProvider,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.apiService
      .getProductos()
      .then((productos: Map<number, Producto>) => {
        this.productos = productos;
        console.log(this.productos);
      })
      .catch((error: string) => console.log(error));
  } //end_ngOnInit

  aceptar() {
    if (!this.productoSeleccionado || this.unidades <= 0) return;
    let lineaDetalle: LineaDetalle = new LineaDetalle(
      this.productoSeleccionado.descripcion,
      this.productoSeleccionado.importeUnitario,
      this.unidades
    );
    this.modalCtrl.dismiss(lineaDetalle);
  } //end_enviarProducto

  public cancelar() {
    this.modalCtrl.dismiss(null); //se cancela la edición. No se devuelven datos.
  }

  getProducto(producto: Producto) {
    console.log(producto);
  } //end_getProductos

  cambiaProducto() {
    console.log(this.idProductoSeleccionado);
    this.productoSeleccionado = this.productos.get(
      Number(this.idProductoSeleccionado)
    );
    console.log(this.productoSeleccionado);
    this.unidades = 0;
  }
  //end_cambiaProducto
}

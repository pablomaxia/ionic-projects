import { ProductoEnviar } from './ProductoEnviar';
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
  public productos: Producto[];
  public productoEnviar: ProductoEnviar = new ProductoEnviar('', 0, 0, 0.0);
  public producto: Producto = new Producto(null, null, null);
  validations_form!: FormGroup;

  constructor(
    private apiService: ApiServiceProvider,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.validations_form = this.formBuilder.group({
      producto: new FormControl(this.producto, Validators.required),
      unidades: new FormControl(
        1,
        Validators.compose([Validators.required, Validators.min(1)])
      ),
      importeUnitario: new FormControl(
        1,
        Validators.compose([Validators.required, Validators.min(1)])
      ),
      importeTotal: new FormControl(
        1,
        Validators.compose([Validators.required, Validators.min(1)])
      ),
    });
  }

  ngOnInit() {
    this.apiService
      .getProductos()
      .then((productos: Producto[]) => {
        this.productos = productos;
        console.log(this.productos);
      })
      .catch((error: string) => console.log(error));
  } //end_ngOnInit

  onSubmit(values: any) {
    console.log(values['producto']);
    let producto: ProductoEnviar = new ProductoEnviar(
      values['producto'].descripcion,
      values['producto'].unidades,
      values['producto'].importeUnitario,
      values['importeTotal']
    );
    console.log(producto);
    this.modalCtrl.dismiss(producto);
  } //end_enviarProducto

  public cancelar() {
    this.modalCtrl.dismiss(); //se cancela la edición. No se devuelven datos.
  }
}

import { UsuarioPrestamo } from './../modelo/UsuarioPrestamo';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Libro } from '../modelo/Libro';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-nuevo-prestamo',
  templateUrl: './nuevo-prestamo.page.html',
  styleUrls: ['./nuevo-prestamo.page.scss'],
})
export class NuevoPrestamoPage implements OnInit {
  public opciones = ['id', 'titulo'];
  public opcionSeleccionada: string;
  public textoBusqueda: string;
  public librosBusqueda: Libro[];

  @Input() usuarioJson: any;
  public usuario: UsuarioPrestamo;

  constructor(
    private apiService: ApiServiceProvider,
    private alertController: AlertController,
    private modalController: ModalController
  ) {} //end_constructor

  ngOnInit() {
    this.usuario = JSON.parse(this.usuarioJson);
  } //end_ngOnInit

  buscarLibro() {
    this.apiService
      .getLibrosCampo(this.opcionSeleccionada, this.textoBusqueda)
      .then((libros: Libro[]) => {
        this.librosBusqueda = libros;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_buscarLibro

  prestarLibro(libro: Libro) {
    if (libro.idUsuarioPrestamo != null) {
      this.alertError();
      return;
    }
    let libroPrestado = libro;
    libroPrestado.idUsuarioPrestamo = this.usuario.id;
    libroPrestado.fechaPrestamo = '23-02-2023';
    libroPrestado.diasPrestamo = 10;

    this.modalController.dismiss(libroPrestado);
  } //end_prestarLibro

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      message: 'El libro ya está prestado',
    });
    await alert.present();
  } //end_alertError

  cancelar() {
    this.modalController.dismiss(null);
  }
  //end_cancelar
}

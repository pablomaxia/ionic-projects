import { NuevoPrestamoPage } from './../nuevo-prestamo/nuevo-prestamo.page';
import { UsuarioPrestamo } from './../modelo/UsuarioPrestamo';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import {
  AlertController,
  NavController,
  ModalController,
} from '@ionic/angular';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { Libro } from '../modelo/Libro';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  public usuario: Usuario = new Usuario(0, 'a', 'b');
  public librosPrestamo: Libro[];
  public libros: Libro[];
  public usuarioPrestamo: UsuarioPrestamo = new UsuarioPrestamo(
    0,
    '',
    '',
    new Array()
  );

  @Input() usuarioPrestamoJson: any;

  constructor(
    private apiService: ApiServiceProvider,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['usuarioBuscar'] != null)
        this.usuario = JSON.parse(params['usuarioBuscar'])[0];
    });

    // Controla que el JSON solo se parsee si se ha accedido a la página como modal.
    if (this.usuarioPrestamoJson != null)
      this.usuarioPrestamo = JSON.parse(this.usuarioPrestamoJson);
    else {
      this.apiService
        .getLibrosUsuario(this.usuario.id)
        .then((librosPrestamo: Libro[]) => {
          this.librosPrestamo = librosPrestamo;
          this.usuarioPrestamo = new UsuarioPrestamo(
            this.usuario.id,
            this.usuario.apellidos,
            this.usuario.nombre,
            this.librosPrestamo
          );
        })
        .catch((error: string) => {
          console.log(error);
        });
    }
    this.apiService
      .getLibros()
      .then((libros: Libro[]) => {
        this.libros = libros;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_ngOnInit
  async devolverLibro(libroDevolver: Libro) {
    const alert = await this.alertController.create({
      header: '¿Devolver el libro?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Ok',
          handler: (data: any) => {
            libroDevolver.idUsuarioPrestamo = null;
            libroDevolver.fechaPrestamo = null;
            libroDevolver.diasPrestamo = null;
            this.apiService
              .modificarLibro(libroDevolver)
              .then((libroDevolver: Libro) => {
                let indice = this.usuarioPrestamo.librosPrestamo.findIndex(
                  (libro) => libro.id === libroDevolver.id
                );
                this.usuarioPrestamo.librosPrestamo.splice(indice, 1); //si se ha modificado en la api se actualiza en la lista
              })
              .catch((error: string) => {
                console.log(error);
              });
          },
        },
      ],
    });
    await alert.present();
  } //end_devolverLibro

  async nuevoPrestamo() {
    const modal = await this.modalController.create({
      component: NuevoPrestamoPage,
      componentProps: {
        usuarioJson: JSON.stringify(this.usuarioPrestamo),
      },
    });

    modal.onDidDismiss().then((dataNuevoLibro) => {
      let libroPrestado: Libro = dataNuevoLibro['data'];
      if (libroPrestado != null) {
        this.apiService
          .modificarLibro(libroPrestado)
          .then((libroPrestado: Libro) => {
            this.usuarioPrestamo.librosPrestamo.push(libroPrestado); //si se ha insertado en la api se añade en la lista
          })
          .catch((error: string) => {
            console.log(error);
          });
      }
    });
    return await modal.present();
  } //end_libroPrestado

  volver() {
    // Si se pasó un usuario desde el modal, lo cierra. En cualquier otro caso se va a home.
    if (this.usuarioPrestamoJson != null) this.modalController.dismiss();
    else this.navCtrl.navigateBack('/home');
  } //end_volver
}

import { UsuariosPrestamoPage } from './../usuarios-prestamo/usuarios-prestamo.page';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { alertController } from '@ionic/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuarios: Usuario[] = new Array();
  public usuarioBuscar: Usuario = new Usuario(0, '', '');
  public idBusqueda: string = '';

  constructor(
    private apiService: ApiServiceProvider,
    private alertController: AlertController,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.apiService
      .getUsuarios()
      .then((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  async buscarUsuario() {
    const alert = await this.alertController.create({
      header: 'buscar usuario',
      inputs: [
        {
          name: 'id',
          type: 'text',
          value: this.idBusqueda,
          placeholder: 'id del usuario',
        },
      ],

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
            this.idBusqueda = data['id'];
            if (
              this.idBusqueda == '' ||
              !this.usuarios.find(
                (usuario) => usuario.id === parseInt(this.idBusqueda)
              )
            ) {
              this.alertError();
              return;
            }
            this.apiService
              .busquedaUsuario(parseInt(this.idBusqueda))
              .then((usuarioBuscar: Usuario) => {
                this.usuarioBuscar = usuarioBuscar;

                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    usuarioBuscar: JSON.stringify(this.usuarioBuscar),
                  },
                };
                this.navCtrl.navigateForward('/usuario', navigationExtras);
              })
              .catch((error: string) => {
                console.log(error);
              });
          },
        },
      ],
    });
    await alert.present();
  } //end_buscarUsuario

  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      message: 'No existe usuario con ese id',
    });
    await alert.present();
  } //end_alertError

  usuariosPrestamo() {
    this.navCtrl.navigateForward('/usuarios-prestamo');
  }
}

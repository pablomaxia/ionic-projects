import { UsuarioPrestamo } from './../modelo/UsuarioPrestamo';
import { UsuarioPage } from './../usuario/usuario.page';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { Usuario } from '../modelo/Usuario';
import { Libro } from '../modelo/Libro';

@Component({
  selector: 'app-usuarios-prestamo',
  templateUrl: './usuarios-prestamo.page.html',
  styleUrls: ['./usuarios-prestamo.page.scss'],
})
export class UsuariosPrestamoPage implements OnInit {
  public usuariosPrestamo: UsuarioPrestamo[] = new Array();
  public usuarios: Usuario[];
  public libros: Libro[];

  constructor(
    private apiService: ApiServiceProvider,
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.apiService.getUsuarios().then((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.usuarios.forEach((usuario: Usuario) => {
        this.apiService.getLibrosUsuario(usuario.id).then((libros: Libro[]) => {
          if (libros.length > 0) {
            let usuarioPrestamo = new UsuarioPrestamo(
              usuario.id,
              usuario.apellidos,
              usuario.nombre,
              libros
            );
            console.log(usuarioPrestamo);
            this.usuariosPrestamo.push(usuarioPrestamo);
          }
        });
      });
    });
  } //end_ngOnInit

  volver() {
    this.navCtrl.navigateBack('/home');
  }
  //end_volver

  async datosUsuario(usuarioPrestamo: UsuarioPrestamo) {
    const modal = await this.modalController.create({
      component: UsuarioPage,
      componentProps: {
        usuarioPrestamoJson: JSON.stringify(usuarioPrestamo),
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }
}

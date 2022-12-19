import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../modelo/Pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class PeliculasPage implements OnInit {
  peliculas = [
    new Pelicula('Wendell & Wild', 'Henry Selick', '2022'),
    new Pelicula('Turning Red', 'Domee Shi', '2022'),
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async borrar(pelicula: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar para borrar',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            var index = this.peliculas.indexOf(pelicula);
            this.peliculas.splice(index, 1);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
      message: '¿Quieres borrar esta película?',
    });
    await alert.present();
  }

  async alertBorrar() {
    const alert = await this.alertController.create({
      header: 'Confirmar para borrar',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {},
        },
      ],
      message: '¿Quieres borrar esta película?',
    });
    await alert.present();
  }
  //end alertHome
}

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Actor } from '../modelo/Actor';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.page.html',
  styleUrls: ['./actores.page.scss'],
})
export class ActoresPage implements OnInit {
  actores = [
    new Actor('Pedro Pascal', 'Chileno', '1975'),
    new Actor('Oscar Isaac', 'Guatemalteco', '1979'),
  ];
  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async borrar(actor: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar para borrar',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            var index = this.actores.indexOf(actor);
            this.actores.splice(index, 1);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
      message: '¿Quieres borrar este actor?',
    });
    await alert.present();
  }
}

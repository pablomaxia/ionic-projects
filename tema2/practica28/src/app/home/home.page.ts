import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.alertHome();
  }
  async alertHome() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      message: 'Esta es la práctica 28 de Maxiá Rodríguez Pablo',
    });
    await alert.present();
  }
  //end alertHome
}

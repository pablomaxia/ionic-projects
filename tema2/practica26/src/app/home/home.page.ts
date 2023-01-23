import { Component } from '@angular/core';
import { Reserva } from '../modelo/Reserva';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reservas = [
    new Reserva(
      'Plaza Mayor de lujo',
      'Madrid',
      'España',
      '2019-12-16',
      '2019-12-19'
    ),
    new Reserva('Weekendo', 'Granada', 'España', '2020-1-18', '2020-5-19'),
    new Reserva(
      'Hotel YIT Ciudad De Zaragoza',
      'Zaragoza',
      'España',
      '2020-3-18',
      '2020-3-19'
    ),
  ];

  constructor() {}

  borrar(reserva: any) {
    var index = this.reservas.indexOf(reserva);
    this.reservas.splice(index, 1);
  }
}

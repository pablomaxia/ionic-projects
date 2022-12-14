import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  num: number;
  mayorMenor: String = '...';
  numSecret: number = this.numAleatorio(0, 100);

  constructor() {
    console.log('El número secreto es: ' + this.numSecret);
  }

  numAleatorio(a, b) {
    return Math.round(Math.random() * (b - a) + parseInt(a, 10));
  }

  compruebaNumero() {
    console.log('El número introducido es: ' + this.num);
    if (this.num) {
      if (this.numSecret < this.num) {
        this.mayorMenor = 'menor que';
      } else if (this.numSecret > this.num) {
        this.mayorMenor = 'mayor que';
      } else {
        this.mayorMenor = '';
      }
    }
  }

  reinicia() {
    // reiniciamos las variables
    this.num = null;
    this.mayorMenor = '...';
    this.numSecret = this.numAleatorio(0, 100);
  }
}

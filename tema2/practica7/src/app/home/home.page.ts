import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  opcion: String = 'a';
  opcion2: String = '';
  repite: boolean = false;
  ciclos: String[] = ['DAM', 'DAW', 'ASIR'];
  str1: String = '';
  str2: String = '';
  constructor() {}

  valores() {
    switch (this.opcion) {
      case 'eso':
        this.str1 = 'ESO';
        break;
      case 'ciclo':
        this.str1 = 'Ciclo';
        break;
    }

    switch (this.opcion2) {
      case '1eso':
        this.str2 = '1º de ESO';
        break;
      case '2eso':
        this.str2 = '2º de ESO';
        break;
      case '3eso':
        this.str2 = '3º de ESO';
        break;
      case 'DAM':
        this.str2 = 'Ciclo DAM';
        break;
      case 'DAW':
        this.str2 = 'Ciclo DAW';
        break;
      case 'ASIR':
        this.str2 = 'Ciclo ASIR';
        break;
    }
    if (this.repite) {
      this.str2 = this.str2 + ' - repite';
    } else {
      this.str2 = this.str2 + ' - no repite';
    }
  }
  aceptar() {
    this.valores();
    console.log(this.str1 + ' - ' + this.str2);
  }
}

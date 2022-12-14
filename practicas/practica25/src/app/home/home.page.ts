import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formulario: FormGroup;
  tiposTarjeta = [{}];
  constructor(private builder: FormBuilder) {
    this.formulario = this.builder.group({});
  }

  clickBorrar() {}

  clickAceptar() {}
}

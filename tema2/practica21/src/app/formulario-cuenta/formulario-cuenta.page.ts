import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuenta } from '../modelo/Cuenta';

@Component({
  selector: 'app-formulario-cuenta',
  templateUrl: './formulario-cuenta.page.html',
  styleUrls: ['./formulario-cuenta.page.scss'],
})
export class FormularioCuentaPage implements OnInit {
  mensaje: string = '';
  cuenta: Cuenta = new Cuenta('', '');

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.cuenta = JSON.parse(params['cuenta']);
      console.log(this.cuenta);
      this.mensaje =
        'DNI Propietario: ' +
        this.cuenta.dni +
        'IBAN Cuenta: ' +
        this.cuenta.iban;
      console.log(this.mensaje);
    });
  }

  ngOnInit() {}
}

import { NavigationExtras } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Cuenta } from '../modelo/Cuenta';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  validations_form: FormGroup;
  validation_messages = {
    dni: [
      { type: 'required', message: 'El DNI es obligatorio.' },
      {
        type: 'maxlength',
        message: 'El DNI tiene que ser de 9 caracteres.',
      },
      {
        type: 'minlength',
        message: 'El DNI tiene que ser de 9 caracteres.',
      },
      { type: 'pattern', message: 'El DNI no es válido.' },
    ],
    iban: [
      { type: 'required', message: 'El IBAN es obligatorio.' },
      { type: 'pattern', message: 'El IBAN no es válido.' },
      {
        type: 'maxlength',
        message:
          'El IBAN tiene que ser de 24 caracteres (sin contar los espacios).',
      },
      {
        type: 'minlength',
        message:
          'El IBAN tiene que ser de 24 caracteres (sin contar los espacios).',
      },
    ],
  };
  constructor(public formBuilder: FormBuilder, private navCtrl: NavController) {
    this.validations_form = this.formBuilder.group(
      {
        dni: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(9),
            Validators.minLength(9),
            Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$'),
          ])
        ),
        // end dni
        iban: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^ES [0-9]{2} [0-9]{4} [0-9]{4} [0-9]{2} [0-9]{10}$'
            ),
            Validators.minLength(29),
            Validators.maxLength(29),
          ])
        ),
        // end iban
      },
      { validators: [this.formularioNoValido()] }
    );
    // end validations_form
  }
  //end constructor
  onSubmit(values: any) {
    let cuenta = new Cuenta(values.dni, values.iban);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        cuenta: JSON.stringify(cuenta),
      },
    };
    this.navCtrl.navigateForward('/formulario-cuenta', navigationExtras);
  }
  //end onSubmit
  formularioNoValido() {
    return (formGroup: FormGroup) => {
      const dni: string = formGroup.get('dni')?.value;
      const iban: string = formGroup.get('iban')?.value;
      if (!this.validarDNI(dni) && !this.validarIBAN(iban))
        return { isValid: false };
      //en otro caso se valida
      return null;
    };
  }

  validarDNI(dni: string) {
    // cadena con las letras del DNI
    var letras_dni = 'TRWAGMYFPDXBNJZSQVHLCKE';
    // DNI sin la letra
    var numero = Number.parseInt(dni.substring(dni.length - 1, -dni.length));
    // letra del DNI introducido
    var letra = dni.charAt(8);
    // índice de la letra que se coge de la cadena con las letras
    var resto = numero % letras_dni.length;
    // letra que se ha obtenido con el cálculo
    var letra_calculada = letras_dni.charAt(resto);

    return letra === letra_calculada;
  }
  //end validarDNI
  validarIBAN(iban: string) {
    var enc = false;
    var cuentas = [
      {
        dni: '54202913D',
        iban: 'ES 12 0075 7133 51 6644427394',
      },
      {
        dni: '54202914X',
        iban: 'ES 04 2100 1666 07 5931948758',
      },
    ];

    for (let i = 0; i < cuentas.length && !enc; i++) {
      if (
        iban === cuentas[i].iban &&
        this.validations_form.value.dni === cuentas[i].dni
      ) {
        enc = true;
      }
    }
    return enc;
  }
  // end validarIBAN
}

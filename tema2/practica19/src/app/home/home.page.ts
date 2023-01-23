import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Alumno } from '../modelo/Alumno';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  validations_form: FormGroup;

  genders: Array<String>;
  estadosCiviles: Array<String>;

  validation_messages = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio.' },
      { type: 'pattern', message: 'El nombre tiene que ser una cadena.' },
      {
        type: 'minlength',
        message: 'El nombre tiene que tener un mínimo de 3 caracteres.',
      },
      {
        type: 'maxlength',
        message: 'El nombre tiene que tener un máximo de 25 caracteres.',
      },
    ],
    apellidos: [
      { type: 'required', message: 'Los apellidos son obligatorios.' },
      { type: 'pattern', message: 'Los apellidos tienen que ser una cadena.' },
      {
        type: 'minlength',
        message: 'Los apellidos tienen que tener un mínimo de 5 caracteres.',
      },
      {
        type: 'maxlength',
        message: 'Los apellidos tienen que tener un máximo de 50 caracteres.',
      },
    ],
    sexo: [{ type: 'required', message: 'Seleccione una opción.' }],
    edad: [
      { type: 'required', message: 'La edad es obligatoria.' },
      { type: 'pattern', message: 'Introduzca un número positivo.' },
      {
        type: 'maxlength',
        message: 'La edad solo puede tener hasta 3 dígitos.',
      },
    ],
    dni: [{ type: 'pattern', message: 'Introduzca un DNI válido.' }],
    dniPadre: [{ type: 'pattern', message: 'Introduzca un DNI válido.' }],
    dniMadre: [{ type: 'pattern', message: 'Introduzca un DNI válido.' }],
    apellidosPadre: [
      {
        type: 'pattern',
        message:
          'Los apellidos del padre son obligatorios y tienen que ser una cadena.',
      },
      {
        type: 'minlength',
        message: 'Los apellidos tienen que tener un mínimo de 5 caracteres.',
      },
      {
        type: 'maxlength',
        message: 'Los apellidos tienen que tener un máximo de 50 caracteres.',
      },
    ],
    apellidosMadre: [
      {
        type: 'pattern',
        message:
          'Los apellidos de la madre son obligatorios y tienen que ser una cadena.',
      },
      {
        type: 'minlength',
        message: 'Los apellidos tienen que tener un mínimo de 5 caracteres.',
      },
      {
        type: 'maxlength',
        message: 'Los apellidos tienen que tener un máximo de 50 caracteres.',
      },
    ],
  };

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController) {
    const DNI_PRUEBA = '54202913D';
    this.genders = ['Hombre', 'Mujer'];
    this.estadosCiviles = ['Soltero', 'Casado', 'Divorciado', 'Viudo'];

    // Crea el formulario
    this.validations_form = this.formBuilder.group(
      {
        // NOMBRE
        nombre: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[A-Za-z]+$'),
            Validators.minLength(3),
            Validators.maxLength(25),
          ])
        ),
        // APELLIDOS
        apellidos: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[A-Za-z]+$'),
            Validators.minLength(5),
            Validators.maxLength(50),
          ])
        ),
        // Sexo
        sexo: new FormControl('', Validators.required),
        // Edad
        edad: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('^[0-9]+$'), // solo valores positivos
            Validators.maxLength(3),
          ])
        ),
        // DNI ALUMNO
        dni: new FormControl(
          DNI_PRUEBA,
          Validators.compose([
            Validators.pattern('(^s*$)|^[0-9]{8,8}[A-Za-z]$'),
          ])
        ),
        // TRABAJA
        trabaja: new FormControl(false),
        // ESTADO CIVIL
        estadoCivil: new FormControl(''),
        // DNI PADRE
        dniPadre: new FormControl(
          DNI_PRUEBA,
          Validators.compose([Validators.pattern('^[0-9]{8,8}[A-Za-z]$')])
        ),
        // DNI MADRE
        dniMadre: new FormControl(
          DNI_PRUEBA,
          Validators.compose([Validators.pattern('^[0-9]{8,8}[A-Za-z]$')])
        ),
        // APELLIDOS PADRE
        apellidosPadre: new FormControl(
          '',
          Validators.compose([
            Validators.pattern('^[A-Za-z]+$'),
            Validators.minLength(5),
            Validators.maxLength(50),
          ])
        ),
        // APELLIDOS MADRE
        apellidosMadre: new FormControl(
          '',
          Validators.compose([
            Validators.pattern('^[A-Za-z]+$'),
            Validators.minLength(5),
            Validators.maxLength(50),
          ])
        ),
      },
      // Validador según la edad.
      { validators: [this.formularioNoValido()] }
    );
  }

  ngOnInit(): void {
    this.genders = ['Hombre', 'Mujer'];
    this.estadosCiviles = ['Soltero', 'Casado', 'Divorciado', 'Viudo'];
  }

  formularioNoValido() {
    return (formGroup: FormGroup) => {
      const edad: number = Number(formGroup.get('edad')?.value);
      const dni: string = formGroup.get('dni')?.value;
      const estadoCivil: string = formGroup.get('estadoCivil')?.value;
      const dniPadre: string = formGroup.get('dniPadre')?.value;
      const apellidosPadre: string = formGroup.get('apellidosPadre')?.value;
      const dniMadre: string = formGroup.get('dniMadre')?.value;
      const apellidosMadre: string = formGroup.get('apellidosMadre')?.value;

      if (edad >= 18) {
        if ((!dni && !this.validarDNI(dni)) || !estadoCivil)
          return { isValid: false };
      }
      if (edad < 18) {
        if (
          (!dniPadre && !this.validarDNI(dniPadre)) ||
          (!dniMadre && !this.validarDNI(dniMadre)) ||
          !apellidosPadre ||
          !apellidosMadre
        )
          return { isValid: false };
      }
      //en otro caso se valida
      return null;
    };
  }

  onSubmit(values: any) {
    let alumno = new Alumno(
      values.apellidos,
      values.nombre,
      values.sexo,
      values.edad,
      values.dni,
      values.trabaja,
      values.estadoCivil,
      values.dniPadre,
      values.dniMadre,
      values.apellidosPadre,
      values.apellidosMadre
    );

    let navigationExtras: NavigationExtras = {
      queryParams: {
        alumno: JSON.stringify(alumno),
      },
    };
    this.navCtrl.navigateForward('/pagina2', navigationExtras);
  }
  //end_onSubmit
  getIntEdad() {
    return Number(this.validations_form.get('edad')?.value);
  }
  //end getIntEdad
  validarDNI(dni: string) {
    var dni_letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    var letter = dni_letters.charAt(parseInt(dni, 10) % 23);

    return letter == dni.charAt(8);
  }
  //end validarDNI
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from '../modelo/Usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  validations_form: FormGroup = new FormGroup({});
  genders: Array<string> = ['Male', 'Female'];
  matching_passwords_group: FormGroup = new FormGroup({});
  validation_messages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      {
        type: 'minlength',
        message: 'Username must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Username cannot be more than 25 characters long.',
      },
      {
        type: 'pattern',
        message:
          'Your username must contain only numbers and letters, and must begin with a letter.',
      },
      {
        type: 'usernameRepetido',
        message: 'Your username has already been taken.',
      },
    ],
    name: [{ type: 'required', message: 'Name is required.' }],
    lastname: [{ type: 'required', message: 'Last name is required.' }],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 8 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Password must be less than or equal to 15 characters.',
      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase, one lowercase, one number and one of this characters: . - ;',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required.' },
    ],
    matching_passwords: [
      { type: 'confirmPassword', message: 'Password mismatch.' },
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions.' },
    ],
  };
  // end validation messages
  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.genders = ['Male', 'Female'];
    /*La expresión regular de validación de la clave consta de estas partes:
(?=.{8,})  comprueba que al menos tiene 8 caracteres
(?=.*[a-z]) comprueba que contiene al menos una minúscula
(?=.*[A-Z]) comprueba que contiene al menos una mayúscula
(?=.*[0-9]) comprueba que contiene al menos un dígito
(?=.*[.,-]).*$')  comprueba que contiene al menos uno de estos tres
                         caracteres: . , -
.*        captura toda la cadena si se cumplen las anteriores condiciones
*/
    this.matching_passwords_group = new FormGroup(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.maxLength(15),
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,-]).*$'
            ),
            Validators.required,
          ])
        ),
        confirmPassword: new FormControl('', Validators.required),
      },
      (formGroup: FormGroup) => {
        return this.passwordRepetida(formGroup);
      }
    );

    //Es IMPORTANTE que la definición de matching_password_group
    //se haga antes de la definición de validation_form

    // Crea el formulario
    this.validations_form = this.formBuilder.group({
      // USUARIO
      username: new FormControl(
        '',
        Validators.compose([
          this.usernameRepetido,
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9]+$'),
          Validators.required,
        ])
      ),
      password: this.matching_passwords_group,
      // NOMBRE
      name: new FormControl('', Validators.required),
      // APELLIDOS
      lastname: new FormControl('', Validators.required),
      // EMAIL
      email: new FormControl(
        'badgirlcoven@gmail.com',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$'
          ),
        ])
      ),
      // GÉNERO
      gender: new FormControl(this.genders[0], Validators.required),
      // CONTRASEÑAS
      matching_passwords: this.matching_passwords_group,
      // TÉRMINOS Y CONDICIONES DE SERVICIO
      terms: new FormControl(false, Validators.pattern('true')),
    });
  }
  //end_ngOnInit
  onSubmit(values: any) {
    let user = new Usuario(
      values.username,
      values.password,
      values.name,
      values.lastname,
      values.email,
      values.gender,
      values.terms
    );

    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user),
        numero: 3,
      },
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }
  //end_onSubmit

  usernameRepetido(fc: FormControl) {
    if (
      fc.value.toLowerCase() === 'abc123' ||
      fc.value.toLowerCase() === 'cba321'
    ) {
      return { usernameRepetido: true };
    } else {
      return null;
    }
  }
  // end usernameRepetido
  passwordRepetida(fg: FormGroup) {
    if (fg.controls['password'].value != fg.controls['confirmPassword'].value)
      return { confirmPassword: true };
    else return null;
  }
  //end confirmPassword
} //end_class

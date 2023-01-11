import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Partido } from './modelo/Partido';
import { NavigationExtras } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  equipos = [
    {
      equipo: 'Alaves',
      jugadores: [
        'Fernando Pacheco',
        'Antonio Sivera',
        'Aritz Castro',
        'Tachi',
        ' Rubén Duarte',
        'Rodrigo Ely',
        'Víctor Laguardia',
      ],
    },

    {
      equipo: 'Atletico Madrid',
      jugadores: [
        'Ivo Grbic',
        'Jan Oblak',
        'Miguel San Román',
        'José Giménez',
        ' Manuel Sánchez',
        'Renan Lodi',
        'Stefan Savic',
      ],
    },

    {
      equipo: 'Cadiz',
      jugadores: [
        'Jeremías Ledesma',
        'David Gil',
        'Juan Flere',
        'Sergio González',
        ' Fali',
        'Marcos Mauro',
        'Carlos Akapo',
      ],
    },
  ];
  validation_messages = {
    fecha: [{ type: 'required', message: 'La fecha es obligatoria.' }],
    local: [
      { type: 'required', message: 'El equipo visitante es obligatorio.' },
    ],
    visitante: [
      { type: 'required', message: 'El equipo local es obligatorio.' },
    ],
    goles_local: [
      {
        type: 'required',
        message: 'Los goles del equipo local son obligatorios.',
      },
      {
        type: 'min',
        message: 'Los goles del equipo local tienen que ser mínimo de 0.',
      },
      {
        type: 'pattern',
        message:
          'Los goles del equipo local tienen que ser positivos y enteros.',
      },
    ],
    goles_visitante: [
      {
        type: 'required',
        message: 'Los goles del equipo visitante son obligatorios.',
      },
      {
        type: 'min',
        message: 'Los goles del equipo visitante tienen que ser mínimo de 0.',
      },
      {
        type: 'pattern',
        message:
          'Los goles del equipo visitante tienen que ser positivos y enteros.',
      },
    ],
    jugadores_local: [
      {
        type: 'required',
        message: 'Los jugadores del equipo local son obligatorios.',
      },
    ],
    jugadores_visitante: [
      {
        type: 'required',
        message: 'Los jugadores del equipo visitante son obligatorios.',
      },
    ],
  };
  validations_form: FormGroup;
  constructor(private navCtrl: NavController, public formBuilder: FormBuilder) {
    this.validations_form = this.formBuilder.group(
      {
        fecha: new FormControl('', Validators.compose([Validators.required])),
        local: new FormControl('', Validators.compose([Validators.required])),
        visitante: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        goles_local: new FormControl(
          '',
          Validators.compose([
            Validators.min(0),
            Validators.pattern('^[0-9]+$'),
            Validators.required,
          ])
        ),
        goles_visitante: new FormControl(
          '',
          Validators.compose([
            Validators.min(0),
            Validators.pattern('^[0-9]+$'),
            Validators.required,
          ])
        ),
        jugadores_local: new FormControl('', Validators.required),
        jugadores_visitante: new FormControl('', Validators.required),
      },
      { validators: [this.formularioNoValido()] }
    );
  }
  //end constructor
  onSubmit(values: any) {
    let partido = new Partido(
      values.fecha,
      values.local.equipo,
      values.visitante.equipo,
      values.goles_local,
      values.goles_visitante,
      values.jugadores_local,
      values.jugadores_visitante
    );
    console.log(partido);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        partido: JSON.stringify(partido),
      },
    };
    console.log(partido);
    this.navCtrl.navigateForward('/pagina2', navigationExtras);
  }
  // end ngSubmit
  formularioNoValido() {
    return (formGroup: FormGroup) => {
      const fecha = formGroup.get('fecha')?.value;
      const local = formGroup.get('local')?.value;
      const visitante = formGroup.get('visitante')?.value;
      const goles_local = formGroup.get('goles_local')?.value;
      const goles_visitante = formGroup.get('goles_visitante')?.value;

      if (this.validarFecha(fecha) || local === visitante)
        return { isValid: false };
      return null;
    };
  }
  // end formularioNoValido

  validarFecha(fecha: Date) {
    let fecha_actual: Date = new Date();
    let fecha_actual_format: moment.Moment = moment(
      fecha_actual.getDate() +
        '/' +
        (fecha_actual.getMonth() + 1) +
        '/' +
        fecha_actual.getFullYear(),
      'DD-MM-YYYY'
    );
    let fecha_form: moment.Moment = moment(fecha, 'DD-MM-YYYY');
    if (
      fecha_actual_format.toDate().getTime() > fecha_form.toDate().getTime()
    ) {
      //milisegundos desde 1970
      //la fecha introducida es menor que la actual - la fecha no es válida
      return { fechaValida: true };
    } else {
      //la fecha introducida es mayor o igual a la actual - la fecha es válida
      return null;
    }
  }
  //end validarFecha
  onChangeEquipo(event: any) {
    this.validations_form.controls['goles_local'].setValue('');
    this.validations_form.controls['goles_visitante'].setValue('');
    this.validations_form.controls['jugadores_local'].setValue('');
    this.validations_form.controls['jugadores_visitante'].setValue('');
  }
  //end onChangeEquipo
}

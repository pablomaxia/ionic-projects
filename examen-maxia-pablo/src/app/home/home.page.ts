import { AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Partido } from '../modelo/Partido';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  equipos = [
    'SANTA CLARA',
    'SAFAUR',
    'BETIS ESPARTINAS',
    'SIDERAL',
    'FRESAS',
    'MAIRENA DEL ALJARAFE',
  ];

  partidos = [
    new Partido('SANTA CLARA', 'SAFAUR', 36, 62),
    new Partido('SIDERAL', 'BETIS ESPARTINAS', 50, 46),
    new Partido('MAIRENA DEL ALJARAFE', 'FRESAS', 66, 49),
  ];

  nuevo_partido: boolean = false;
  validations_form: FormGroup = new FormGroup([]);
  mensaje: string = '';
  editar: boolean = false;
  partido: any = '';
  modo_editar_input_local: boolean = false;
  modo_editar_input_visit: boolean = false;
  no_editar_local: boolean = false;
  no_editar_visitante: boolean = false;

  constructor(
    private builder: FormBuilder,
    private alertController: AlertController
  ) {
    this.validations_form = this.builder.group({
      local: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Z a-z]+$'),
        ])
      ),
      visitante: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Z a-z]+$'),
        ])
      ),
    });
  }
  // end constructor
  onSubmit(values: any) {
    const local: string = values.local;
    const visitante: string = values.visitante;
    var valid = true;

    if (!this.equipos.includes(local)) {
      this.mensaje = 'Equipo local no existe';
      valid = false;
    } else if (!this.equipos.includes(visitante)) {
      this.mensaje = 'Equipo visitante no existe';
      valid = false;
    } else if (local === visitante) {
      this.mensaje = 'Los 2 equipos son iguales';
      valid = false;
    } else {
      this.partidos.forEach((partido) => {
        console.log(partido);
        if (
          (local === partido.local && visitante === partido.visitante) ||
          (local === partido.visitante && visitante === partido.local)
        ) {
          this.mensaje = 'El partido ya existe';
          valid = false;
        }
      });
    }

    if (valid) {
      this.confirmPartidoAlert();
    } else {
      this.partidoNoValidoAlert();
    }
  }
  // end onSubmit
  async partidoNoValidoAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      message: this.mensaje,
    });
    await alert.present();
  }
  //end partidoNoValidoAlert
  async confirmPartidoAlert() {
    const local: string = this.validations_form.get('local')?.value;
    const visitante: string = this.validations_form.get('visitante')?.value;
    const alert = await this.alertController.create({
      header: 'Confirmar',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: () => {
            this.mensaje = 'Alert canceled';
            this.nuevo_partido = false;
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.mensaje = 'Alert confirmed';
            this.partidos.push(new Partido(local, visitante, 0, 0));
            this.nuevo_partido = false;
          },
        },
      ],
      message: '',
    });
    await alert.present();
  }
  //end partidoExistsAlert
  nuevoPartido(event: any) {
    this.editar = false;
    this.validations_form.controls['local'].setValue('');
    this.validations_form.controls['visitante'].setValue('');
  }
  //end nuevoPartido
  partidoClick(partido: Partido) {
    this.editar = true;
    this.partido = partido;
  }
  //end partidoClick
  marcadorLocal(valor: number) {
    this.no_editar_visitante = true;
    this.partido.goles_local += valor;
  }
  // end marcadorLocal
  marcadorVisit(valor: number) {
    this.no_editar_local = true;
    this.partido.goles_visitante += valor;
  }
  // end marcadorVisit
  volverInicio() {
    this.editar = false;
    this.no_editar_visitante = false;
    this.no_editar_local = false;
  }
  // end volverInicio
  editarModoVisit() {
    this.no_editar_local = true;
    if (!this.modo_editar_input_visit) this.modo_editar_input_visit = true;
    else this.modo_editar_input_visit = false;
  }
  // end editarModoVisit
  editarModoLocal() {
    this.no_editar_visitante = true;
    if (!this.modo_editar_input_local) this.modo_editar_input_local = true;
    else this.modo_editar_input_local = false;
  }
  // end editarModoLocal
}

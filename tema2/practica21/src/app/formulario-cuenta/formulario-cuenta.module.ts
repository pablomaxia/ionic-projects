import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioCuentaPageRoutingModule } from './formulario-cuenta-routing.module';

import { FormularioCuentaPage } from './formulario-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioCuentaPageRoutingModule
  ],
  declarations: [FormularioCuentaPage]
})
export class FormularioCuentaPageModule {}

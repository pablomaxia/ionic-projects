import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPrestamoPageRoutingModule } from './usuarios-prestamo-routing.module';

import { UsuariosPrestamoPage } from './usuarios-prestamo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPrestamoPageRoutingModule
  ],
  declarations: [UsuariosPrestamoPage]
})
export class UsuariosPrestamoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaValoracionesPageRoutingModule } from './pagina-valoraciones-routing.module';

import { PaginaValoracionesPage } from './pagina-valoraciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaValoracionesPageRoutingModule
  ],
  declarations: [PaginaValoracionesPage]
})
export class PaginaValoracionesPageModule {}

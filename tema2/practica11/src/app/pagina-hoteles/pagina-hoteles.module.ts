import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaHotelesPageRoutingModule } from './pagina-hoteles-routing.module';

import { PaginaHotelesPage } from './pagina-hoteles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaHotelesPageRoutingModule
  ],
  declarations: [PaginaHotelesPage]
})
export class PaginaHotelesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActoresPageRoutingModule } from './actores-routing.module';

import { ActoresPage } from './actores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActoresPageRoutingModule
  ],
  declarations: [ActoresPage]
})
export class ActoresPageModule {}

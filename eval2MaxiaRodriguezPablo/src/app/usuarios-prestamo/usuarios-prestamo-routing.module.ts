import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosPrestamoPage } from './usuarios-prestamo.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPrestamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosPrestamoPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioCuentaPage } from './formulario-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioCuentaPageRoutingModule {}

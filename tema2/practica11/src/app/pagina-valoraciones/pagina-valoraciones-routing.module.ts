import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaValoracionesPage } from './pagina-valoraciones.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaValoracionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaValoracionesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaHotelesPage } from './pagina-hoteles.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaHotelesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaHotelesPageRoutingModule {}

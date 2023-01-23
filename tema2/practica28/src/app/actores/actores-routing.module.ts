import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActoresPage } from './actores.page';

const routes: Routes = [
  {
    path: '',
    component: ActoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActoresPageRoutingModule {}

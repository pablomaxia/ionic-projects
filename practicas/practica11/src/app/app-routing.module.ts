import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pagina-hoteles/:id',
    loadChildren: () => import('./pagina-hoteles/pagina-hoteles.module').then( m => m.PaginaHotelesPageModule)
  },
  {
    path: 'pagina-valoraciones/:id',
    loadChildren: () => import('./pagina-valoraciones/pagina-valoraciones.module').then( m => m.PaginaValoracionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

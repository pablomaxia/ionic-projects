import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./usuario/usuario.module').then((m) => m.UsuarioPageModule),
  },
  {
    path: 'nuevo-prestamo',
    loadChildren: () => import('./nuevo-prestamo/nuevo-prestamo.module').then( m => m.NuevoPrestamoPageModule)
  },
  {
    path: 'usuarios-prestamo',
    loadChildren: () => import('./usuarios-prestamo/usuarios-prestamo.module').then( m => m.UsuariosPrestamoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'Películas', url: '/peliculas', icon: 'paper-plane' },
    { title: 'Actores', url: '/actores', icon: 'heart' },
  ];
  constructor() {}
}

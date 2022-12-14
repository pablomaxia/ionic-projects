import { ViewWillLeave, ViewDidLeave } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit, ViewWillLeave, ViewDidLeave, OnDestroy {

  constructor() { }

  ngOnInit() {

  }

  ionViewWillLeave(): void {
    console.log('ionViewWillLeave pagina2');
  }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave pagina2');
  }
  
  ngOnDestroy() {
    console.log('ngOnDestroy pagina2');
  }
}

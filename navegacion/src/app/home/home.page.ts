import { Component, OnInit } from '@angular/core';
import { NavController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave{

  constructor(private navCtrl: NavController) {
    console.log('constructor home');
  }

  ionViewWillEnter(): void {
    console.log('ionViewWillEnter home');
  }

  ionViewDidEnter(): void {
    console.log('ionViewDidEnter home');
  }
  
  ngOnInit(): void {
    console.log('ngOnInit home');
  }

  ionViewWillLeave(): void {
    console.log('ionViewWillLeave home');
  }

  ionViewDidLeave(): void {
    console.log('ionViewDidLeave home');
  }
  
  goToPagina2(){
    this.navCtrl.navigateForward('/pagina2');
  }
}

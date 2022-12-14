import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  estadoCivil:String = "";
  familiaNumerosa:String = "";
  
  apellidos:String;
  nombre:String;
  provincia:String;

  constructor() {}

  activarBoton(){
   return this.apellidos && this.nombre && this.provincia && 
          this.estadoCivil == "casado" && this.familiaNumerosa == "si";
  }

}

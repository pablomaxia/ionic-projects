import { ModalController } from '@ionic/angular';
import { ApiServiceProvider } from './../providers/api-service/api-service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  public clientes: Cliente[] = new Array();
  public cliente: Cliente;

  constructor(
    private apiService: ApiServiceProvider,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getClientes();
  }

  aceptar() {
    if (!this.cliente) return;
    this.modalCtrl.dismiss(this.cliente);
  } //end_aceptar

  cancelar() {
    this.modalCtrl.dismiss(); //se cancela la edición. No se devuelven datos.
  } //end_cancelar
  getClientes() {
    this.apiService
      .getClientes()
      .then((clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(clientes);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getClientes
}

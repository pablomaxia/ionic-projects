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
  public cliente: Cliente = Cliente.crearClienteVacio();

  public numPagina: number = 1;
  private NUM_ELEMENTOS_PAGINA: number = 10;
  private CAMPO_ORDENAR: string = 'cliente';
  private ORDEN: string = 'asc';

  constructor(
    private apiService: ApiServiceProvider,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getClientesPaginado();
  }

  cancelar() {
    this.modalCtrl.dismiss(); //se cancela la edición. No se devuelven datos.
  } //end_cancelar

  seleccionarCliente(cliente: Cliente) {
    this.cliente = cliente;
    console.log(this.cliente);
    if (!this.cliente) return;
    this.modalCtrl.dismiss(this.cliente);
  }
  //end_seleccionarCliente

  getClientesPaginado() {
    this.apiService
      .getClientesPaginado(
        this.numPagina,
        this.NUM_ELEMENTOS_PAGINA,
        this.CAMPO_ORDENAR,
        this.ORDEN
      )
      .then((clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log(clientes);
      })
      .catch((error: string) => {
        console.log(error);
      });
  } //end_getClientes

  paginaAnterior() {
    this.numPagina--;
    this.getClientesPaginado();
  }
  //end_paginaAnterior

  paginaSiguiente() {
    this.numPagina++;
    this.getClientesPaginado();
  }
  //end_paginaSiguiente

  paginaInicio() {
    this.numPagina = 1;
    this.getClientesPaginado();
  }
  //end_paginaInicio
}

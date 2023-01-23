import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { Alumno } from '../modelo/Alumno';
import { AlertController, ModalController } from '@ionic/angular';
import { EditarAlumnoPage } from '../editar-alumno/editar-alumno.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public alumnos = new Array<Alumno>();
  public numPagina: number = 1;
  private NUM_ELEMENTOS_PAGINA: number = 10;
  private CAMPO_ORDENAR: string = 'last_name';
  private ORDEN: string = 'asc';

  private first_name_busqueda: string = '';
  private last_name_busqueda: string = '';

  constructor(
    private apiService: ApiServiceProvider,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  /*

cuando se carga la pantalla se llama al método getAlumnos de la Api. Este es un método asíncrono que devuelve un objeto Promise del que debe ser evaluado el resultado.

Si el acceso a la Api ha ido bien se ejecuta el código asociado a la cláusula then.  Símplemente se coge el array de alumnos que llega y se asocia a él el atributo alumnos de la clase.

Si ha ido mal el acceso (por ejemplo si no hemos lanzado jsonServer) se coge el error que llega y se muestra por consola.

*/

  ngOnInit(): void {
    this.paginaInicio();
  }

  /*

este método llama al método eliminarAlumno de la Api y le pasa el id del alumno a eliminar. Se devuelve un objeto Promise. Si el borrado ha ido bien se ejecuta el código asociado a la cláusula then. Símplemente se muestra por consola un mensaje y se elimina el alumno del array de alumnos de la clase, lo que hará que deje de verse en la vista.

Si el borrado ha ido mal muestro por consola el error que ha ocurrido.

*/

  eliminarAlumno(indice: number) {
    this.apiService
      .eliminarAlumno(this.alumnos[indice].id)
      .then((correcto: Boolean) => {
        console.log('Borrado correcto del alumno con indice: ' + indice);
        this.alumnos.splice(indice, 1);
      })
      .catch((error: string) => {
        console.log('Error al borrar: ' + error);
      });
  } //end_eliminar_alumno

  /*
este método pasa a un activity abierto en modal el objeto alumno que se encuentra en la posición de la lista que se ha pulsado.
El activity tiene un formulario para modificar los datos.
Si los datos son válidos y se pulsa aceptar en el activity se devuelve el objeto alumno con los datos modificados.
En este caso se actualiza el objeto alumno del array con los nuevos datos.
Si se pulsa cancelar en el activity se devuelve null.
*/
  async modificarAlumno(indice: number) {
    const modal = await this.modalController.create({
      component: EditarAlumnoPage,
      componentProps: {
        alumnoJson: JSON.stringify(this.alumnos[indice]),
      },
    });

    modal.onDidDismiss().then((dataAlumnoModificado) => {
      let alumnoModificado: Alumno = dataAlumnoModificado['data'];
      if (alumnoModificado != null) {
        this.apiService
          .modificarAlumno(alumnoModificado)
          .then((alumno: Alumno) => {
            this.alumnos[indice] = alumno; //si se ha modificado en la api se actualiza en la lista
          })
          .catch((error: string) => {
            console.log(error);
          });
      }
    });

    return await modal.present();
  } //end_modificarAlumno

  paginaAnterior() {
    this.numPagina--;
    this.getAlumnosPaginado();
  }
  //end_paginaAnterior

  paginaSiguiente() {
    this.numPagina++;
    this.getAlumnosPaginado();
  }
  //end_paginaSiguiente

  paginaInicio() {
    this.numPagina = 1;
    this.getAlumnosPaginado();
  }
  //end_paginaInicio

  getAlumnosPaginado() {
    this.apiService
      .getAlumnosPaginado(
        this.numPagina,
        this.NUM_ELEMENTOS_PAGINA,
        this.CAMPO_ORDENAR,
        this.ORDEN
      )
      .then((alumnos: Alumno[]) => {
        this.alumnos = alumnos;
        //this.ordenarPorApellido(this.alumnos);
        console.log(this.alumnos);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }
  //end_getAlumnosPaginado

  async busquedaAlumno() {
    const alert = await this.alertController.create({
      header: 'Buscar alumno por nombre y apellido',
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          value: this.first_name_busqueda,
          placeholder: 'first_name',
        },
        {
          name: 'last_name',
          type: 'text',
          id: 'last_name',
          value: this.last_name_busqueda,
          placeholder: 'last_name',
        },
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.first_name_busqueda = data['first_name'];
            this.last_name_busqueda = data['last_name'];
            console.log(data);
            if (
              this.first_name_busqueda == '' &&
              this.last_name_busqueda == ''
            ) {
              this.getAlumnosPaginado();
              return;
            }
            this.apiService
              .busquedaAlumno(
                this.first_name_busqueda,
                this.last_name_busqueda,
                this.CAMPO_ORDENAR,
                this.ORDEN
              )
              .then((alumnos: Alumno[]) => {
                this.alumnos = alumnos;
                //this.ordenarPorApellido(this.alumnos);
                console.log(alumnos);
              })
              .catch((error: string) => {
                console.log(error);
              });
            console.log('Confirm Ok');
          },
        },
      ],
    });
    await alert.present();
  }
  //end busquedaAlumno

  ordenarPorApellido(alumnos: Alumno[]): Alumno[] {
    return alumnos.sort((a, b) => a.last_name.localeCompare(b.last_name));
  }
} //end_class

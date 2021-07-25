import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Eestatus } from '../../../@core/data/comonModel';
import { EmpleadoModel } from '../../../@core/data/empleadoModel';
import { Erol, Iauxiliar, Ijefatura } from '../../../@core/data/userModel';
import { ToastService } from '../../../@core/mock/Toast.service';
import { Eaccion } from '../../../@theme/components';
import { FILTER } from '../../alumno/tabla/alumno-settings';
import { SETTINGS } from './empleado-settings';

@Component({
  selector: 'app-tabla-empleado',
  templateUrl: './tabla-empleado.component.html',
  styleUrls: ['./tabla-empleado.component.scss']
})
export class TablaEmpleadoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Ijefatura[] | Iauxiliar[] = [];
  public loadingData: boolean = false;


  constructor(
    private toastService: ToastService,
    private empleadoService: EmpleadoModel,
  ) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.empleadoService.getEmpleados$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dataSource = data;
        this.loadingData = false;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }


  get loading(): Observable<boolean> {
    return new Observable((obs) => obs.next(this.loadingData));
  }

  get data(): Observable<Ijefatura[] | Iauxiliar[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar
   * @param $event
   */
  empleadoSeleccionado($event) {
    switch ($event.accion) {
      case Eaccion.DATA_UPDATE:
        this.dataupdate();
        break;
      case Eaccion.EDIT:
        this.editar($event.data);
        break;
      case Eaccion.DELETE:
        this.delete($event.data);
        break;
    }
  }

  private dataupdate() {
    const DATA: Ijefatura[] | Iauxiliar[] = [
      {
        idusuario: 1,
        perfil: 'string',
        email: 'string',
        password: 'string',
        rol: Erol.AUXILIAR,
        token: 'string',
        ultima_conexion: new Date(),
        idunidad: 1,
        nombre: 'string',
        ape_1: 'string',
        ape_2: 'string',
        telefono: 'string',
        idjefatura: null,
        estatus: Eestatus.ALTA,
      },
    ];

    this.dataSource = DATA;
    console.log(this.dataSource);
  }

  private editar(data: Ijefatura[] | Iauxiliar) {
    //llamada a alumnoService -> updateAlumno
    if (true) {
      const msj = {
        title: 'Edición de elemento',
        body: `Información del empleado actaulizada.`
      };
      this.toastService.show(msj.title, msj.body);
    } else {
      const msj = {
        title: 'Edición de elemento',
        body: 'No es posible actualizar la información. Intente nuevamente.'
      };
      this.toastService.show(msj.title, msj.body, 'danger');
    }
  }

  private delete(data: Ijefatura[] | Iauxiliar) {
    //llamada a alumnoService -> updateAlumno : estatus = b
    if (true) {
      const msj = {
        title: 'Baja de empleado',
        body: 'Empleado dado de baja con exito.'
      };
      this.toastService.show(msj.title, msj.body);
    } else {
      const msj = {
        title: 'Baja de alumno',
        body: 'No es posible la baja del alumno. Intente nuevamente.'
      };
      this.toastService.show(msj.title, msj.body, 'danger');
    }
  }
}

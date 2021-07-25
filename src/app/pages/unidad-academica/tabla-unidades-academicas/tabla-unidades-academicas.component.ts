import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Eestatus } from '../../../@core/data/comonModel';
import { Iunidadacademica, UnidadAcademicaModel } from '../../../@core/data/unidadAcademicaModel';
import { ToastService } from '../../../@core/mock/Toast.service';
import { Eaccion } from '../../../@theme/components';
import { FILTER, SETTINGS } from './unidad-academica-settings';

@Component({
  selector: 'app-tabla-unidades-academicas',
  templateUrl: './tabla-unidades-academicas.component.html',
  styleUrls: ['./tabla-unidades-academicas.component.scss']
})
export class TablaUnidadesAcademicasComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Iunidadacademica[] = [];
  public loadingData: boolean = false;

  constructor(
    private toastService: ToastService,
    private unidadService: UnidadAcademicaModel,
  ) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.unidadService.getUnidadesAcademicas$()
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

  get data(): Observable<Iunidadacademica[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar
   * @param $event
   */
  unidadSeleccionada($event) {
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
    const DATA: Iunidadacademica[] = [
      {
        idunidad: 1,
        perfil: 'string',
        clave: 'string',
        nombre: 'string',
        direccion: 'string',
        correo: 'string',
        telefono: 'string',
        estatus: Eestatus.ALTA,
      }
    ];

    this.dataSource = DATA;
    console.log(this.dataSource);
  }

  private editar(data: Iunidadacademica) {
    //llamada a alumnoService -> updateAlumno
    if (true) {
      const msj = {
        title: 'Edición de elemento',
        body: `Información de la unidad académica actaulizada.`
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

  private delete(data: Iunidadacademica) {
    //llamada a alumnoService -> updateAlumno : estatus = b
    if (true) {
      const msj = {
        title: 'Baja de alumno',
        body: `Unidad académica dada de baja con exito.`
      };
      this.toastService.show(msj.title, msj.body);
    } else {
      const msj = {
        title: 'Baja de alumno',
        body: 'No es posible la baja de la unidad académica. Intente nuevamente.'
      };
      this.toastService.show(msj.title, msj.body, 'danger');
    }
  }
}

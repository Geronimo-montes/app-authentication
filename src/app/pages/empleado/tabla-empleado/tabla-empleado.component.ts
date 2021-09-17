import { take, takeUntil } from 'rxjs/operators';
import { EmpleadoModel } from '../../../@core/data/empleadoModel';
import { Eaccion } from '../../../@theme/components';
import { Observable, Subject } from 'rxjs';
import { Iusuario } from '../../../@core/data/userModel';
import { NbDialogService } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseData } from '../../../@core/data/headerOptions';
import {
  EtypeMessage,
  ToastService
} from '../../../@core/mock/root-provider/Toast.service';
import {
  SETTINGS,
  FILTER
} from './empleado-settings';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { UnidadAcademicaModel } from '../../../@core/data/unidadAcademicaModel';

@Component({
  selector: 'app-tabla-empleado',
  template: ` <app-tabla [title]="title" [object]="object" [settings]="settings"
   [loadingData]="loading | async" [data]="data  | async"
   (rowSelected)="empleadoSeleccionado($event)" [filter]="filter">
  </app-tabla>`,
  styleUrls: ['./tabla-empleado.component.scss']
})
export class TablaEmpleadoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public title: string = '';  // nombre de la tabla
  public object: string = 'empleado';  // nombre de la tabla
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Iusuario[] = [];
  public loadingData: boolean = false;


  constructor(
    private empleadoService: EmpleadoModel,
    private unidadService: UnidadAcademicaModel,
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private accessChecker: NbAccessChecker,
    private activateRouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Indica el estado de carga de los datos, de tal manera que inavilita los controles
   */
  get loading(): Observable<boolean> {
    return new Observable((obs) => obs.next(this.loadingData));
  }


  /**
   * Data para mostrar en la tabla. Listado de empleados
   */
  get data(): Observable<Iusuario[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Realiza la petición para listar los datos de los empleados regustrados. Se utiliza para inicializar la tabla y recargar la data.
   */
  private async loadData() {
    this.loadingData = true;
    const claveunidad = this.activateRouter.snapshot.params.claveunidad;


    if (claveunidad) {
      const unidad =
        await this.unidadService.getUnidadAcademicaById$(claveunidad).toPromise();

      this.dataSource =
        await this.empleadoService.getEmpleadosByUnidad$(claveunidad).toPromise();

      this.title = `Unidad Academica ${unidad.nombre}`;
    } else {
      this.dataSource = await this.empleadoService.getEmpleados$().toPromise();
      this.title = `Lista de empleados`;
    }

    this.loadingData = false;
  }
  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar. Valida los permisos de usuario a la acción solicitada y despues ejecuta la acción o muestra un menaje informativo.
   * @param $event
   */
  empleadoSeleccionado($event) {
    this.accessChecker.isGranted($event.accion, 'empleado')
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(access => {
        if (access) {
          switch ($event.accion) {
            case Eaccion.UPDATE_DATA_LIST: this.loadData(); break;
            case Eaccion.EDIT: this.editar($event.data); break;
            case Eaccion.DELETE: this.delete($event.data); break;
          }
        } else {
          const
            title = 'Acceso denegado.',
            body = `No tienes permiso para realizar la accion realizada.`;
          this.toastService.show(title, body, EtypeMessage.INFO);
        }
      });
  }


  /**
   * Una vez confirmados los cambios en la información del alumno, realiza la peticion para la actualización de los datos
   * @param {Iusuario} data 
   */
  private editar(data: Iusuario) {
    this.empleadoService.updateEmpleado$(data)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = 'Actualización de información',
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
        this.loadData();
      });
  }

  /**
   * Cambia el estatus de un alumno a baja
   * @param {Iusuario} data 
   */
  private delete(data: Iusuario) {
    this.empleadoService.updateEmpleado$(data)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = (data.estatus === 'a') ?
            `El alumno ${data.nombre} ${data.ape_1} ${data.ape_2} se dara de alta.` :
            `El alumno ${data.nombre} ${data.ape_1} ${data.ape_2} se dara de baja.`,
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
        this.loadData();
      });
  }
}

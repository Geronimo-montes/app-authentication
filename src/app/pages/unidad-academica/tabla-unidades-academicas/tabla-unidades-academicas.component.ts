import { Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ResponseData } from '../../../@core/data/headerOptions';
import {
  EtypeMessage,
  ToastService
} from '../../../@core/mock/root-provider/Toast.service';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Iunidadacademica,
  UnidadAcademicaModel
} from '../../../@core/data/unidadAcademicaModel';
import {
  ConfirmacionComponent,
  Eaccion,
  Iacciondata,
  typeicon
} from '../../../@theme/components';
import {
  FILTER,
  SETTINGS
} from './unidad-academica-settings';

@Component({
  selector: 'app-tabla-unidades-academicas',
  template: `<app-tabla [title]="title" [object]="object" [settings]="settings" 
    [loadingData]="loading | async" [data]="data | async" 
    (rowSelected)="unidadSeleccionada($event)" 
    [filter]="filter">
  </app-tabla>`,
  styleUrls: ['./tabla-unidades-academicas.component.scss']
})
export class TablaUnidadesAcademicasComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public title: string = 'Lista de Unidades Académicas'; // nombre de la tabla
  public object: string = 'unidad'; // nombre de la tabla
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Iunidadacademica[] = [];
  public loadingData: boolean = false;

  constructor(
    private unidadService: UnidadAcademicaModel,
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private accessChecker: NbAccessChecker,
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
   * Observable de las unidades academicas a listar
   */
  get data(): Observable<Iunidadacademica[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Realiza la peticion para obtener la lista de unidades academicas registradas. 
   */
  private loadData() {
    this.loadingData = true;

    this.unidadService.getUnidadesAcademicas$()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(unidadesAcademicas => {
        this.dataSource = unidadesAcademicas;
        this.loadingData = false;
      });
  }

  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar
   * @param $event
   */
  public unidadSeleccionada($event: Iacciondata) {
    this.accessChecker.isGranted($event.accion, 'unidad')
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(access => {
        if (access) {
          switch ($event.accion) {
            case Eaccion.UPDATE_DATA_LIST: this.loadData(); break;
            case Eaccion.EDIT: this.editar($event.data); break;
            case Eaccion.DELETE: this.delete($event.data); break;
            case Eaccion.VIEW: this.view($event.data); break;
          }
        } else {
          const
            title = 'Acceso denegado.',
            body = `No tienes permiso para realizar la accion solicitada.`;
          this.toastService.show(title, body, EtypeMessage.INFO);
        }
      });
  }

  /**
   * Una vez confirmados los cambios en la unidad seleccionado, realiza la peticion para la actualización de los datos
   * @param {Iunidadacademica} data 
   */
  private editar(data: Iunidadacademica) {
    this.unidadService.updateUnidadAcademica$(data)
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
   * Da de baja del sistema al elemento seleccionado.
   * @param {Iunidadacademica} data 
   */
  private delete(data: Iunidadacademica) {
    this.unidadService.updateUnidadAcademica$(data)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = (data.estatus === 'a') ?
            'Alta de Unidad Académica' :
            'Baja de Unidad Académica',
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
        this.loadData();
      });
  }

  /**
   * Redirige la pagina a la lista de alumnos de la unidad académica seleccionada.
   * @param data 
   */
  private view(data: Iunidadacademica) {
    const
      title = `Unidad Académica ${data.nombre}`,
      body = `¿Desea listar alumnos ó empleados?`,
      type = typeicon.QUESTION;

    this.dialogService.open(ConfirmacionComponent, {
      context: { titulo: title, cuerpo: body, btnCancel: 'Alumnos', btnConfirmar: 'Empleados' },
      closeOnEsc: false,
      closeOnBackdropClick: false,
    }).onClose.pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        if (res)
          this.router.navigateByUrl(`/pages/empleado/tabla-empleados/${data.idunidad}`);
        else
          this.router.navigateByUrl(`/pages/alumno/tabla-alumnos/${data.idunidad}`);
      })
  }
}

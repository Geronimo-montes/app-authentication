import { ActivatedRoute } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ResponseData } from '../../../@core/data/headerOptions';
import { ViewAlumnoComponent } from '../view-alumno/view-alumno.component';
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
  Eaccion,
  Iacciondata
} from '../../../@theme/components';
import {
  FILTER,
  SETTINGS
} from './alumno-settings';
import {
  AlumnoModel,
  Ialumno
} from '../../../@core/data/alumnoModel';

@Component({
  selector: 'app-tabla-alumno',
  template: `<app-tabla [object]="object" [settings]="settings" 
  [loadingData]="loading | async" [data]="data | async" 
  (rowSelected)="alumnoSeleccionado($event)" [filter]="filter">
  </app-tabla>`,
  styleUrls: ['./tabla-alumno.component.scss']
})
export class TablaAlumnoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public object: string = 'alumno';  // nombre de la tabla
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Ialumno[] = [];
  public loadingData: boolean = false;

  constructor(
    private alumnoService: AlumnoModel,
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private accessChecker: NbAccessChecker,
    private router: ActivatedRoute,
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
   * Data para mostrar en la tabla. Listado de alumnos
   */
  get data(): Observable<Ialumno[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Realiza la peticion para obtener la lista de alumnos de la unidad_academica especificada. 
   */
  private loadData() {
    this.loadingData = true;
    const idunidad = this.router.snapshot.params.idunidad;

    this.alumnoService.getAlumnosByUnidad$(idunidad)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(alumnos => {
        this.dataSource = alumnos;
        this.loadingData = false;
      });
  }

  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar, valida los permisos de usuario y realiza la accion en caso de tener los permisos.
   * @param $event {accion: Eaccion, data: any}
   */
  public alumnoSeleccionado($event: Iacciondata) {
    this.accessChecker.isGranted($event.accion, 'alumno')
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
            body = `No tienes permiso para realizar la accion realizada.`;
          this.toastService.show(title, body, EtypeMessage.INFO);
        }
      });
  }

  /**
   * Una vez confirmados los cambios en la información del alumno, realiza la peticion para la actualización de los datos
   * @param {Ialumno} data 
   */
  private editar(data: Ialumno) {
    this.alumnoService.updateAlumno$(data)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = 'Actualización de información',
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
      });
  }

  /**
   * Cambia el estatus de un alumno a baja
   * @param {Ialumno} data 
   */
  private delete(data: Ialumno) {
    this.alumnoService.updateAlumno$(data)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = `${(data.estatus === 'a') ? 'Alta' : 'Baja'} del alumno ${data.nombre} ${data.ape_1}.`,
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
        this.loadData();
      });
  }

  /**
   * Visualiza los datos del alumno, muestra la interfaz para la subida de documentos
   * @param {Ialumno} data 
   */
  private view(data: Ialumno) {
    this.dialogService.open(ViewAlumnoComponent, {
      context: { data: data },
      closeOnEsc: false,
      closeOnBackdropClick: false,
    }).onClose
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => { });
  }
}

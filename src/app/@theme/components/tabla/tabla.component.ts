import { NbAccessChecker } from '@nebular/security';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import {
  take,
  takeUntil
} from 'rxjs/operators';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  EDIT_CONTROL,
  DELETE_CONTROL,
  VIEW_CONTROL,
} from './tabla-general-settings';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

export enum Eaccion {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  UPDATE_DATA_LIST = 'update_data_list',
  DEFAULT = 'default',// sin accion establcida
};

export interface Iacciondata {
  accion: Eaccion,
  data: any
};

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit, OnChanges, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  @Input() object: string;
  @Input() title: string;
  @Input() settings;
  @Input() loadingData: boolean = false;
  @Input() data: any[] = [];
  @Input() filter: any[];
  @Output() rowSelected: any = new EventEmitter<Iacciondata>();

  source: LocalDataSource;

  constructor(
    private dialogService: NbDialogService,
    private accessChecker: NbAccessChecker,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.source = new LocalDataSource();
    this.source.load(this.data);
  }

  ngOnInit(): void {
    this.addControlsViewEditDelete();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
  * @description Establece una funcion para el filtrado de los datos
  * @param query 
  */
  search(query: string = '') {
    if (query !== '') {
      this.filter.forEach(d => d.search = query);
      this.source.setFilter(this.filter, false, true);
    } else {
      this.source.reset();
    }
  }

  /**
   * @description Evento para emitir la data seleccionada y la acciona realizar
   * @param $event 
   * @param accion 
   */
  public rowSelectedEmit(data, accion) {
    this.rowSelected.emit(<Iacciondata>{ accion: accion, data: data });
  }

  /**
   * @description Mensaje de confirmación para la actualizacion del elemento
   * @param $event 
   */
  public editConfirmacion($event) {
    const
      title = 'Mensaje de confirmacion',
      body = `Esta por entrar guardar los cambios realizados.`;

    this.dialogeConfirmacion(title, body)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        if (res)
          this.rowSelectedEmit($event.data, Eaccion.EDIT);
        else
          $event.confirm.reject();
      });
  }

  /**
   * @description Mensaje de confirmacion para dar de baje el elemnto seleccionado.
   * @param $event
   */
  public deleteConfirmacion($event) {
    const
      title = 'Mensaje de confirmacion',
      body = ($event.data.estatus === 'a') ?
        `El elemento seleccionado se dara de baja en el sistema.` :
        `El elemento seleccionado se dara de alta en el sistema.`;

    this.dialogeConfirmacion(title, body)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        if (res) {
          $event.data.estatus = ($event.data.estatus === 'a') ? 'b' : 'a';
          this.rowSelectedEmit($event.data, Eaccion.DELETE);
        } else {
          $event.confirm.reject();
        }
      });
  }

  /**
   * Contiene la estructura para llamar el mensaje de confirmacion. Retorna un observable que contiene la respueta emitida despues de la selección del usuario. Evita repetir codigo.
   * @param title 
   * @param body 
   * @returns 
   */
  private dialogeConfirmacion(title: string, body: string): Observable<boolean> {
    return this.dialogService
      .open(ConfirmacionComponent, {
        context: { titulo: title, cuerpo: body, },
        closeOnEsc: false,
        closeOnBackdropClick: false,
      }).onClose;
  }

  /**
   * Verifica los permisos del usuario para editar o eliminar un objeto de la tabla. Y establece la visibilidad de estos deacuerdo a los permisos del usuario.
   * @param accion 
   * @param object 
   */
  private addControlsViewEditDelete(): void {
    this.accessChecker.isGranted(Eaccion.EDIT, this.object)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(access => this.settings.edit = (access) ? EDIT_CONTROL : null);

    this.accessChecker.isGranted(Eaccion.DELETE, this.object)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(access => this.settings.delete = (access) ? DELETE_CONTROL : null);

    this.accessChecker.isGranted(Eaccion.VIEW, this.object)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(access => this.settings.actions.custom = (access) ? VIEW_CONTROL : null);
  }
}

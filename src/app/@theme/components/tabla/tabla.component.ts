import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmacionComponent, typeicon } from '../confirmacion/confirmacion.component';

export enum Eaccion {
  ADD = 'add',
  DELETE = 'delete',
  EDIT = 'edit',
  VIEW = 'view',
  DATA_UPDATE = 'data_update',
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
export class TablaComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones

  @Input() settings;
  @Input() loadingData: boolean = false;
  @Input() data: any[] = [];
  @Input() filter: any[];
  @Output() rowSelected: any = new EventEmitter<Iacciondata>();

  source: LocalDataSource;

  constructor(
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.source = new LocalDataSource();
    this.source.load(this.data);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
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
  public rowSelectedEmit($event, accion) {
    this.rowSelected.emit(<Iacciondata>{ accion: accion, data: $event.data });
  }


  public updateLista(accion) {
    this.rowSelectedEmit({ data: null }, Eaccion.DATA_UPDATE);
    this.data = [];
    this.source.load(this.data);
  }

  /**
   * @description Mensaje de confirmación para la actualizacion del elemento
   * @param $event 
   */
  public editConfirmacion($event) {
    const msj = {
      title: 'Mensaje de confirmacion',
      body: `Se han realizado cambios en el elemento seleccionado.`,
      type: typeicon.QUESTION
    };

    this.dialogeConfirmacion(msj.title, msj.body)
      .subscribe((res: boolean) => {
        if (res) {
          this.rowSelectedEmit($event, Eaccion.EDIT);
          $event.confirm.resolve($event.newData);
        } else {
          $event.confirm.reject();
        }
      });
  }

  /**
   * @description Mensaje de confirmacion para eliminar elemetno
   * @param $event
   */
  public deleteConfirmacion($event) {
    const msj = {
      title: 'Mensaje de confirmacion',
      body: `El elemento seleccionado se dara de baja.`,
      type: typeicon.DELETE
    };

    this.dialogeConfirmacion(msj.title, msj.body)
      .subscribe((res: boolean) => {
        if (res) {
          $event.confirm.resolve($event.newData);
          this.rowSelectedEmit($event, Eaccion.DELETE);
        } else {
          $event.confirm.reject();
        }
      });
  }

  /**
   * @description Llamada al compononte para mostrar un mensaje de confirmación
   * @param title 
   * @param body 
   * @returns 
   */
  private dialogeConfirmacion(title: string, body: string) {
    return this.dialogService
      .open(ConfirmacionComponent, {
        context: { titulo: title, cuerpo: body, },
        closeOnEsc: false,
        closeOnBackdropClick: false,
      }).onClose.pipe(takeUntil(this.destroy$));
  }
}

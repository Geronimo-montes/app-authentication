import { NbAccessChecker } from '@nebular/security';
import { NbDialogService } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EtypeMessage, ToastService } from '../../../@core/mock/root-provider/Toast.service';
import { Eaccion } from '../../../@theme/components';
import { ViewPackComponent } from '../view-pack/view-pack.component';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  SETTINGS,
  FILTER
} from './documentacion-settings';
import {
  DocumentoModel,
  Idocumento,
  Ipackdocumentacion
} from '../../../@core/data/documentoModel';
import { ResponseData } from '../../../@core/data/headerOptions';

@Component({
  selector: 'app-tabla-documentacion',
  template: `<app-tabla [object]="object" [settings]="settings" 
  [loadingData]="loading | async"  [data]="data | async" 
  (rowSelected)="documentacionSeleccionado($event)" [filter]="filter">
</app-tabla>`,
  styleUrls: ['./tabla-documentacion.component.scss']
})
export class TablaDocumentacionComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public object = 'documento';
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Ipackdocumentacion[] = [];
  public loadingData: boolean = false;

  constructor(
    private documentoService: DocumentoModel,
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private accessChecker: NbAccessChecker,
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
   * Observable de los paquetes de documentos a listar.
   */
  get data(): Observable<Ipackdocumentacion[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Realiza la peticion para obtener la lista de paquetes de documentacion registrados.
   */
  private loadData() {
    this.loadingData = true;

    this.documentoService.getPaqueteDocumentos$()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(paquetesDocumentos => {
        this.dataSource = paquetesDocumentos;
        this.loadingData = false;
      });
  }

  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar
   * @param $event
   */
  documentacionSeleccionado($event) {
    this.accessChecker.isGranted($event.accion, 'documento')
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
   * Despues de modificar la información del paquete y ver confirmado la accion se realiza la peticion para la actualizacion de los datos.
   * @param {Ipackdocumentacion} data 
   */
  private editar(data: Ipackdocumentacion) {
    this.documentoService.updatePaqueteDocumentos$(data)
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
   * Al confirmar la accion se realiza la peticion para la actualizacion del estatus del paquete de documentos, si esta dado de baja lo actualiza a alta y viceverza.
   * @param {Ipackdocumentacion} data 
   */
  private delete(data: Ipackdocumentacion) {
    this.documentoService.updatePaqueteDocumentos$(data)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = (data.estatus === 'a') ?
            `El paquete de documentos ${data.nombre} se dara de alta.` :
            `El paquete de documentos ${data.nombre} se dara de Baja.`,
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
        this.loadData();
      });
  }

  private view(data: Ipackdocumentacion) {
    this.documentoService.getDetallePackDocumento$(data.idpaquete)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((documentos: Idocumento[]) => {
        data.detalleDocumento = documentos;

        this.dialogService
          .open(ViewPackComponent, {
            context: { data: data },
            closeOnEsc: false,
            closeOnBackdropClick: false,
          }).onClose
          .pipe(take(1), takeUntil(this.destroy$))
          .subscribe(() => { });
      });
  }
}

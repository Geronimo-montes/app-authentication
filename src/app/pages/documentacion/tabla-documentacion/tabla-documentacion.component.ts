import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DocumentoModel, Idocumento, Ipackdocumentacion } from '../../../@core/data/documentoModel';
import { ToastService } from '../../../@core/mock/Toast.service';
import { Eaccion } from '../../../@theme/components';
import { ViewPackComponent } from '../view-pack/view-pack.component';
import { SETTINGS, FILTER } from './documentacion-settings';

@Component({
  selector: 'app-tabla-documentacion',
  templateUrl: './tabla-documentacion.component.html',
  styleUrls: ['./tabla-documentacion.component.scss']
})
export class TablaDocumentacionComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Ipackdocumentacion[] = [];
  public loadingData: boolean = false;

  constructor(
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private documentoService: DocumentoModel,
  ) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.documentoService.getPacksDocumentos$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.dataSource = data;
        this.loadingData = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }

  get loading(): Observable<boolean> {
    return new Observable((obs) => obs.next(this.loadingData));
  }

  get data(): Observable<Ipackdocumentacion[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar
   * @param $event
   */
  documentacionSeleccionado($event) {
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
      case Eaccion.VIEW:
        this.view($event.data);
        break;
    }
  }

  private dataupdate() {
    const DATA: Ipackdocumentacion[] = [];
    this.dataSource = DATA;
    console.log(this.dataSource);
  }

  private editar(data: Ipackdocumentacion) {
    //llamada a alumnoService -> updateAlumno
    if (true) {
      const msj = {
        title: 'Edición de elemento',
        body: `Información actaulizada.`
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

  private delete(data: Ipackdocumentacion) {
    //llamada a alumnoService -> updateAlumno : estatus = b
    if (true) {
      const msj = {
        title: 'Baja de documentación',
        body: `Elemento dado de baja.`
      };
      this.toastService.show(msj.title, msj.body);
    } else {
      const msj = {
        title: 'Baja de documentación',
        body: 'No es posible la baja. Intente nuevamente.'
      };
      this.toastService.show(msj.title, msj.body, 'danger');
    }
  }

  private view(data: Ipackdocumentacion) {
    this.dialogService
      .open(ViewPackComponent, {
        context: { data: data },
        closeOnEsc: false,
        closeOnBackdropClick: false,
      }).onClose.pipe(takeUntil(this.destroy$))
      .subscribe(() => { });
  }
}

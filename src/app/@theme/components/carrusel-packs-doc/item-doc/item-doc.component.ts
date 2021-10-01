import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseData } from '../../../../@core/data/headerOptions';
import {
  NbComponentStatus,
  NbPopoverDirective,
} from '@nebular/theme';
import {
  Ialumno,
  IdocumentoEntregado,
} from '../../../../@core/data/alumnoModel';
import {
  DocumentoModel,
  Idocumento,
} from '../../../../@core/data/documentoModel';
import {
  EtypeMessage,
  ToastService,
} from '../../../../@core/mock/root-provider/Toast.service';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ipackdocumentacion } from '../../../../@core/data/paqueteDocumentoModel';

export type KAccionButton = keyof typeof EAccionButtons;
export enum EAccionButtons {
  VIEW_DOC = 1,
  VIEW = 2,
  DOWNLOAD = 3,
  UPLOAD = 4,
}

export interface Idata {
  nombre: string;
  imagen: string;
  data: any;
}


@Component({
  selector: 'app-item-doc',
  templateUrl: './item-doc.component.html',
  styleUrls: ['./item-doc.component.scss']
})
export class ItemDocComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  // Emite un paquete de documentos o null
  @Output('elementSelected') eleSelected = new EventEmitter<Ipackdocumentacion | null>();
  // Bandera para indicar que un evento asincrono esta cargando
  @Input('loadingData') loadingData: boolean;
  // Informacion tecnica del documento
  @Input('data') data: Idata;
  // Alumno seleccionado
  @Input('alumno') alumno: Ialumno;
  // Indica si el boton se debe renderizar
  @Input('buttons') buttons: KAccionButton[] = [];
  // Permite manipular el popover
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  // Informacion de la entrega del documento
  data_entrega: IdocumentoEntregado;
  // Objeto compuesto. Idica el estado de la entrega. {text: string, status: color}
  badge: { text: string, status: NbComponentStatus } = undefined;

  constructor(
    private documentoService: DocumentoModel,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.documentoIsEntregado();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async documentoIsEntregado() {
    const { idpaquete, iddocumento } = this.data.data;
    const { matricula } = this.alumno;

    this.data_entrega =
      await this.documentoService
        .getEntregaByPaqueteDocumentoMatricula$(idpaquete, iddocumento, matricula)
        .toPromise();

    this.badge = (this.data_entrega) ?
      { text: 'Entregado', status: 'success' } :
      { text: 'Sin entrega', status: 'danger' };

    console.log(this.data_entrega)
  }

  public showPopover() {
    (this.popover.isShown) ? this.popover.hide() : this.popover.show();
  }

  public emitirData($event) {
    this.eleSelected.emit($event);
  }

  public uploadFile($event) {
    this.loadingData = true;

    const
      file = $event.target.files[0],
      matricula = this.alumno.matricula,
      idpaquete = this.data.data.idpaquete,
      iddocumento = this.data.data.iddocumento,
      title = 'Entrega de documento';

    this.documentoService.postUploadDocumento$(idpaquete, iddocumento, matricula, file)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ResponseData) => {
        if (response.response) {
          this.toastService.show(title, response.message, EtypeMessage.SUCCESS);
          this.documentoIsEntregado();
        } else
          this.toastService.show(title, response.message, EtypeMessage.DANGER);

        this.loadingData = false;
      })
  }

  public viewDocumento(documento: Idocumento) {
    const { idpaquete, iddocumento } = documento;
    const { matricula } = this.alumno;

    this.documentoService.getDocumentoById$(idpaquete, iddocumento, matricula)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        window.open(window.URL.createObjectURL(response));
      });
  }

  public downloadDocumento(documento: Idocumento) {
    const { idpaquete, iddocumento, nombre, formato } = documento;
    const { matricula } = this.alumno;

    this.documentoService.getDownloadDocumentoById$(idpaquete, iddocumento, matricula)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        const a = document.createElement('a');
        const ruta = window.URL.createObjectURL(response);
        a.href = ruta;
        a.setAttribute('download', `${nombre.split(' ').join('_')}.${formato}`)
        document.body.appendChild(a);
        a.click();
      });
  }
}

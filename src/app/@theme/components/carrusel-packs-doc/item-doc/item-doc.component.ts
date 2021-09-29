import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ialumno } from '../../../../@core/data/alumnoModel';
import { DocumentoModel, Idocumento } from '../../../../@core/data/documentoModel';
import { ResponseData } from '../../../../@core/data/headerOptions';
import { EtypeMessage, ToastService } from '../../../../@core/mock/root-provider/Toast.service';

@Component({
  selector: 'app-item-doc',
  templateUrl: './item-doc.component.html',
  styleUrls: ['./item-doc.component.scss']
})
export class ItemDocComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  @Output() loadData: any = new EventEmitter<boolean>();
  /**
   * Bandera para indicar que un evento asincrono esta cargando
   */
  @Input('loadingData') loadingData: boolean;
  /**
   * Informacion tecnica del documento
   */
  @Input('documento') documento: Idocumento;
  /**
   * Alumno seleccionado
   */
  @Input('alumno') alumno: Ialumno;
  /**
   * Objeto compuesto. Idica el estado de la entrega. {text: string, status: color}
   */
  @Input('badge') badge: any;
  /**
   * @description Inidica si el boton de visualizacion del popover se habilita. Por defecto su valor es true.
   */
  @Input('btnView') btnView: boolean = true;
  /**
   * @description Inidica si el boton de subidad de documentos se habilita. Por defecto su valor es true.
   */
  @Input('btnUpload') btnUpload: boolean = true;
  /**
   * @description Habilita la edición de los datos del documento desde el popover. Por defecto su valor es false.
   */
  @Input('editPopover') editTemplate: boolean = false;
  /**
   * Permite manupular el popover 
   */
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor(
    private documentoService: DocumentoModel,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Muestra el popover del item
   */
  public showPopover() {
    if (this.popover.isShown)
      this.popover.hide();
    else
      this.popover.show();
  }

  /**
   * Carga el documento y los sube a la plataforma
   * @param $event Documento a subir
   */
  public uploadFile($event) {
    this.loadingData = true;

    const
      file = $event.target.files[0],
      matricula = this.alumno.matricula,
      idpaquete = this.documento.idpaquete,
      iddocumento = this.documento.iddocumento,
      title = 'Entrega de documento';

    this.documentoService.postUploadDocumento$(idpaquete, iddocumento, matricula, file)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ResponseData) => {
        if (response.response) {
          this.toastService.show(title, response.message, EtypeMessage.SUCCESS);
          this.loadData.emit(true);
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

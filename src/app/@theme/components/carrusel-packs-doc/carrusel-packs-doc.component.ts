import { Ialumno, } from '../../../@core/data/alumnoModel';
import { takeUntil } from 'rxjs/operators';
import { Ipackdocumentacion } from '../../../@core/data/paqueteDocumentoModel';
import {
  Observable,
  Subject,
} from 'rxjs';
import {
  Component,
  Input,
} from '@angular/core';
import {
  DocumentoModel,
  Idocumento,
} from '../../../@core/data/documentoModel';

@Component({
  selector: 'app-carrusel-packs-doc',
  templateUrl: './carrusel-packs-doc.component.html',
  styleUrls: ['./carrusel-packs-doc.component.scss']
})
export class CarruselPacksDocComponent {
  // desuscribe las suscripciones a obserbalbes
  private destroy$: Subject<void> = new Subject<void>();
  // Data a mostrar en el carrusel
  @Input('packs_documentos') packs: Ipackdocumentacion[] = [];
  // Bandera para mostrar el spinner con las solicitudes asincronas
  public loadingData: boolean = false;

  // Data del alumno seleccionado
  @Input('alumno') alumno: Ialumno; // Emiter
  // Bandera que indica cuando se ingresa a visualizar el detalle
  public view_datalle: boolean = false;
  // data del paquete seleccionado
  public selected_pack: Ipackdocumentacion = null; // info pack_documentos + detall

  constructor(
    private documentoService: DocumentoModel,
  ) { }

  /**
   * Datos que seran listados por la directiva. Listado de paquetes y documentos del paquete seleccionado.
   */
  get data(): Idocumento[] | Ipackdocumentacion[] {
    return (this.view_datalle) ? this.selected_pack.detalleDocumento : this.packs;
  }

  /**
   * Indica si se esta cargando datos
   */
  get loading(): Observable<boolean> {
    return new Observable(obs => obs.next(this.loadingData));
  }

  /**
   * Guarda temporalmente el pack seleccionado, se realiza una consulta a la bd para obtener la informacion de los documentos que lo conforman.
   * @param {Ipackdocumentacion} data 
   */
  public async selectedPackDocumentos(data: Ipackdocumentacion) {
    // RETORNAOS CUANDO LA DATA VENTA EN NULL
    if (data === null) return;

    this.loadingData = true;
    this.selected_pack = data;
    this.view_datalle = true

    // Obtenermos los documentos que conforman el pauqete
    this.selected_pack.detalleDocumento =
      await this.documentoService.getDocumentosByPaquete$(this.selected_pack.idpaquete)
        .toPromise();
    // Obtenemos los documentos que el alumno ya ha entregado
    this.loadingData = false;
  }

  public downloadDocumentosZIP() {
    const { idpaquete } = this.selected_pack;
    const { matricula } = this.alumno;

    this.documentoService.getDownloadDocumentosByPaquete$(idpaquete, matricula)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        const a = document.createElement('a');
        const ruta = window.URL.createObjectURL(data);
        a.href = ruta;
        a.setAttribute('download', 'nombre.zip');
        document.body.appendChild(a);
        a.click();
      });
  }
}


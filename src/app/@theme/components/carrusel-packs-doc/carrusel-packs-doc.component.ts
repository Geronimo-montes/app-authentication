import { Observable, Subject } from 'rxjs';
import { Ipackdocumentacion } from '../../../@core/data/paqueteDocumentoModel';
import { takeUntil } from 'rxjs/operators';
import { NbComponentStatus } from '@nebular/theme';
import {
  Component,
  Input,
} from '@angular/core';
import {
  DocumentoModel,
  Idocumento,
} from '../../../@core/data/documentoModel';
import {
  Ialumno,
  IdocumentoEntregado
} from '../../../@core/data/alumnoModel';

/**
 * Recuadro que indica si el documento ya ha sido entregado o no.
 */
interface Ibadge {
  text: string;
  status: NbComponentStatus
};

@Component({
  selector: 'app-carrusel-packs-doc',
  templateUrl: './carrusel-packs-doc.component.html',
  styleUrls: ['./carrusel-packs-doc.component.scss']
})
export class CarruselPacksDocComponent {
  private destroy$: Subject<void> = new Subject<void>();

  // Data de los paquetes de documentos
  @Input('packs_documentos') packs: Ipackdocumentacion[] = [];
  // Data del alumno seleccionado
  @Input('alumno') alumno: Ialumno;
  // Indica cuando un proceso asincrono esta cargando
  public loadingData: boolean = false;
  // Bandera que indica cuando se ingresa a visualizar el detalle
  public view_datalle: boolean = false;
  // data del paquete seleccionado
  public selected_pack: Ipackdocumentacion = null; // info pack_documentos + detall
  //
  public docs_entregados: IdocumentoEntregado[] = [];

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
   * @param {Ipackdocumentacion} pack 
   */
  public async selectedPackDocumentos(pack: Ipackdocumentacion) {
    this.loadingData = true;
    this.selected_pack = pack;
    this.view_datalle = true

    // Obtenermos los documentos que conforman el pauqete
    this.selected_pack.detalleDocumento =
      await this.documentoService.getDocumentosByPaquete$(this.selected_pack.idpaquete)
        .toPromise();
    // Obtenemos los documentos que el alumno ya ha entregado
    this.cargarEntregas();
    this.loadingData = false;
  }

  public async cargarEntregas() {
    this.docs_entregados =
      await this.documentoService
        .getEntregasByPaqueteMatricula$(this.selected_pack.idpaquete, this.alumno.matricula).toPromise();
  }

  /**
   * MEdiante el iddocumento se realiza un busqueda en el array de docs_entregados, y deacuerdo al resultado es el mensaje que se regresa.
   * @param {number} iddocumento 
   * @returns {Ibadge} indica si el doc se entrego
   */
  public findDocInDocsEntregados(iddocumento: number): { badge: Ibadge, entrega: IdocumentoEntregado } {
    const entrega = this.docs_entregados
      .filter(d => d.iddocumento === iddocumento)
      .splice(0, 1);

    if (entrega.length === 1)
      return {
        badge: {
          text: 'Entregado',
          status: 'success',
        },
        entrega: entrega[0],
      };
    else
      return {
        badge: {
          text: 'Sin entrega',
          status: 'danger',
        },
        entrega: null,
      };
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


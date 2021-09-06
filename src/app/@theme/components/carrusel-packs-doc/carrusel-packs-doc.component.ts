import { NbComponentStatus } from '@nebular/theme';
import {
  Component,
  Input,
} from '@angular/core';
import {
  DocumentoModel,
  Idocumento,
  Ipackdocumentacion
} from '../../../@core/data/documentoModel';
import {
  AlumnoModel,
  Ialumno,
  IdocumentoEntregado
} from '../../../@core/data/alumnoModel';
import { Observable } from 'rxjs';

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

  /**
   * Data de los paquetes de documentos
   */
  @Input('packs_documentos') packs: Ipackdocumentacion[] = [];
  /**
   * Data del alumno seleccionado
   */
  @Input('alumno') alumno: Ialumno;
  /**
   * Indica cuando un proceso asincrono esta cargando
   */
  public loadingData: boolean = false;
  /**
   * Bandera que indica cuando se ingresa a visualizar el detalle
   */
  public view_datalle: boolean = false;
  /**
   * data del paquete seleccionado
   */
  public selected_pack: Ipackdocumentacion = null; // info pack_documentos + detalle
  /**
   * Array que obtiene los documentos que ya han sido entregados del paquete selecciondo por el alumno.
   */
  public docs_entregados: IdocumentoEntregado[] = [];

  constructor(
    private alumnoService: AlumnoModel,
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
    this.selected_pack.detalleDocumento = await this.documentoService
      .getDetallePackDocumento$(this.selected_pack.idpaquete).toPromise();
    // Obtenemos los documentos que el alumno ya ha entregado
    this.cargarEntregas();
    this.loadingData = false;
  }

  public async cargarEntregas() {
    this.docs_entregados = await this.alumnoService.getDocsEntregadosByMatriculaPack(this.alumno.matricula, this.selected_pack.idpaquete).toPromise();
  }

  /**
   * MEdiante el iddocumento se realiza un busqueda en el array de docs_entregados, y deacuerdo al resultado es el mensaje que se regresa.
   * @param {number} iddocumento 
   * @returns {Ibadge} indica si el doc se entrego
   */
  public validarDocumento(iddocumento: number): Ibadge {
    const validacion = this.docs_entregados
      .find(d => d.iddocumento === iddocumento);

    return {
      text: (validacion === undefined) ? 'Sin entrega' : 'Entregado',
      status: (validacion === undefined) ? 'danger' : 'success'
    };
  }
}


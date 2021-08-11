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

  @Input('packs_documentos') packs: Ipackdocumentacion[] = [];
  @Input('alumno') alumno: Ialumno;

  public loadingData: boolean = false;

  public view_datalle: boolean = false;
  public selected_pack: Ipackdocumentacion = null; // info pack_documentos + detalle
  public docs_entregados: IdocumentoEntregado[] = []; // documentos entregados por el alumno.


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

    this.selected_pack.detalleDocumento = await this.documentoService
      .getDetallePackDocumento$(this.selected_pack.idpaquete).toPromise();

    this.docs_entregados = await this.alumnoService.getDocsEntregadosByMatriculaPack(this.alumno.matricula, this.selected_pack.idpaquete).toPromise();

    this.loadingData = false;
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


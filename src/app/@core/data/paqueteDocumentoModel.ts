import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { Idocumento } from "./documentoModel";
import { HeaderOption, ResponseData } from "./headerOptions";

export interface Ipackdocumentacion {
  idpaquete: number;
  ruta_imagen: string;
  nombre: string;
  descripcion: string;
  numero_documentos: number;
  detalleDocumento: Idocumento[];
  fecha_creacion: Date;
  fecha_modificacion: Date;
  estatus: Eestatus;
};

export abstract class PaqueteDocModel extends HeaderOption {

  /**
   * lista todos los paquetes de documentos registrados en la bd.
   * @returns {Observable<IpackDocumentacion[]>} 
   */
  abstract getAllPaquete$(): Observable<Ipackdocumentacion[]>;

  /**
   * Lsita los datos generales de un paquete de  mediante el id.
   * @param {number} idpaquete 
   * @returns {Observable<Ipackdocumentacion>}
   */
  abstract getPaqueteById$(idpaquete: number): Observable<Ipackdocumentacion>;

  /**
   * Registra un nuevo paquete de 
   * @param data 
   */
  abstract newPaquete$(data: Ipackdocumentacion): Observable<ResponseData>;

  /**
   * Actualiza la infromacion general del paquete de 
   */
  abstract updatePaquete$(data: Ipackdocumentacion): Observable<ResponseData>;

  /**
   * Actualiza la infromacion general del paquete de 
   */
  abstract updateEstatusPaquete$(idpaquete: number, estatus: string): Observable<ResponseData>;

}

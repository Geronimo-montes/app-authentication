import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
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

export interface Idocumento {
  iddocumento: number;
  idpaquete: number;
  nombre: string;
  formato: Eformato;
  peso_max: number;
  requerido: Erequerido;
  foto_ejemplo: string;
  estatus: Eestatus;
};

export enum Eformato {
  PDF = 'pdf',
  PNG = 'png',
  JPG = 'jpg',
  DOCX = 'docx'
}

export enum Erequerido {
  REQUERIDO = 'a',
  OPCIONAL = 'o',
  OTRO_ESTADO = 'w'
}

export abstract class DocumentoModel extends HeaderOption {

  /**
   * lista todos los paquetes de documentos registrados en la bd.
   * @returns {Observable<IpackDocumentacion[]>} 
   */
  abstract getPaqueteDocumentos$(): Observable<Ipackdocumentacion[]>;

  /**
   * Lsita los datos generales de un paquete de documentos mediante el id.
   * @param {number} idpaquetedocumentos 
   * @returns {Observable<Ipackdocumentacion>}
   */
  abstract getPaqueteDocumentosById$(idpaquetedocumentos: number): Observable<Ipackdocumentacion>;

  /**
   * Obtiene los documentos que conforman el paquete de documento. Solo lista los detalles tecnicos de cada documento.
   * @param {number} idpaquete 
   * @returns {Observable<Idocumento[]>} Lista de documentos con su informacion
   */
  abstract getDetallePackDocumento$(idpaquete: number): Observable<Idocumento[]>;

  abstract updatePaqueteDocumentos$(data: Ipackdocumentacion): Observable<ResponseData>;

  abstract newPaqueteDocumentos$(data: Ipackdocumentacion): Observable<ResponseData>;
}
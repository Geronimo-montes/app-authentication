import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { HeaderOption } from "./headerOptions";

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
  abstract getPacksDocumentos$(): Observable<Ipackdocumentacion[]>;

}
import { Observable } from "rxjs";
import { IdocumentoEntregado } from "./alumnoModel";
import { Eestatus } from "./comonModel";
import { HeaderOption, ResponseData } from "./headerOptions";
import { Ipackdocumentacion } from "./paqueteDocumentoModel";

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

  abstract getDocumentosByPaquete$(idpaquete: number): Observable<Idocumento[]>;

  abstract getInfoDocumento$(idpaquete: number, iddocumento: number): Observable<Idocumento>;

  abstract getEntregasByPaqueteMatricula$(idpaquete: number, matricula: string): Observable<IdocumentoEntregado[]>;

  abstract getEntregaByPaqueteDocumentoMatricula$(idpaquete: number, iddocumento: number, matricula: string): Observable<IdocumentoEntregado>;

  abstract getDownloadDocumentosByPaquete$(idpaquete: number, matricula: string): Observable<any>;

  abstract getDownloadDocumentoById$(idpaquete: number, iddocumento: number, matricula: string): Observable<any>

  abstract getDocumentoById$(idpaquete: number, iddocumento: number, matricula: string): Observable<any>;

  abstract postUploadDocumento$(idpaquete: number, iddocumento: number, matricula: string, file: File): Observable<ResponseData>;

  abstract putUploadDocumento$(idpaquete: number, iddocumento: number, matricula: string, file: File): Observable<ResponseData>;
}

import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { Idocumento, Ipackdocumentacion } from "./documentoModel";
import { HeaderOption, ResponseData } from "./headerOptions";

export interface Ialumno {
  matricula: string;
  idunidad: number;
  perfil: string;
  //documentos: Ipackdocumentacion[] | null;
  nombre: string;
  ape_1: string;
  ape_2: string;
  genero: Egenero;
  direccion: string;
  telefono: string;
  email: string;
  estatus: Eestatus;
};

export interface IdocumentoEntregado {
  matricula: string;
  idpaquete: number;
  iddocumento: number;
  nombre: string; // agregar campo a la bd
  fecha_entrega: Date;
}

export enum Egenero {
  MASCULINO = 'm',
  FEMENINO = 'f'
};

export abstract class AlumnoModel extends HeaderOption {

  /**
   * Obtiene los alumnos de una unidad académica
   * @param id_unidad 
   * @returns {Observable<Ialumno[]>} Array de alumnos
   */
  abstract getAlumnosByUniidad$(id_unidad: number): Observable<Ialumno[]>;

  /**
   * Obtiene los documentos registrados como entregados dado una matricula de alumno y idpack
   * @param matricula 
   * @param idpack 
   * @returns {IdocumentoEntregado[]}
   */
  abstract getDocumentacionEntregadaByAlumnoPack$(
    matricula: string,
    idpack: number,
  ): Observable<IdocumentoEntregado[]>;

  /**
   * Ingresa los datos de un nuevo alumno al sistema
   * @param  {Ialumno} $data 
   * @returns {ResponseData} Mensaje de respuesta
   */
  abstract registrarAlumno$($data: Ialumno): Observable<ResponseData>;

  /**
   * Actualiza los datos de un alumno, el cambio de estatus cuenta como alta o baja
   * @param {FormData} $data 
   */
  abstract actualizarAlumno$($data: Ialumno): Observable<ResponseData>;

}

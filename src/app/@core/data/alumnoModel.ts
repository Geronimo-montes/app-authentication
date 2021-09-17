import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { HeaderOption, ResponseData } from "./headerOptions";

export interface Ialumno {
  matricula: string;
  idunidad?: number;
  clave: string;
  perfil: string;
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
   * Obtiene listado de los alumnos de una unidad académica
   * @param id_unidad 
   * @returns {Observable<Ialumno[]>} Array de alumnos
   */
  abstract getAlumnosByUnidad$(unidad: string): Observable<Ialumno[]>;

  /**
   * Lista los datos de un alumno mediante su matricula
   * @param {string} matricula 
   * @returns {Observable<Ialumno>} Objeto con la informacion del alumno.
   */
  abstract getAlumnoByMatricula$(matricula: string): Observable<Ialumno>;

  /**
   * Valida si la matricula se enecuentra registrada. 
   * @param matricula true: para cuando este registrada en la BD. false: si no esta registrada en la BD.
   */
  abstract validarMatricula$(matricula: string): Observable<boolean>;

  /**
   * Ingresa los datos de un nuevo alumno al sistema
   * @param  {Ialumno} $data 
   * @returns {ResponseData} Mensaje de respuesta
   */
  abstract newAlumno$(alumno: FormData): Observable<ResponseData>;

  /**
   * Actualiza los datos de un alumno, el cambio de estatus cuenta como alta o baja
   * @param {FormData} $data 
   */
  abstract updateAlumno$(alumno: FormData): Observable<ResponseData>;

  /**
   * Obtiene los documentos registrados como entregados dado una matricula de alumno y idpack
   * @param {string} matricula 
   * @param {number} idpack 
   * @returns {Observable<IdocumentoEntregado[]>}
   */
  abstract getDocsEntregadosByMatriculaPack(matricula: string, idpack: number,): Observable<IdocumentoEntregado[]>;
}

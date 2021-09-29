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
  abstract postAlumno$(alumno: FormData, matricula: string): Observable<ResponseData>;

  /**
   * Actualiza los datos de un alumno
   * @param {FormData} $data 
   */
  abstract putAlumno$(alumno: FormData, matricula: string): Observable<ResponseData>;

  /**
   * Elimina un alumno
   * @param {FormData} $matricula 
   */
  abstract putEstatusAlumno$(matricula: string, estatus: string): Observable<ResponseData>;
}

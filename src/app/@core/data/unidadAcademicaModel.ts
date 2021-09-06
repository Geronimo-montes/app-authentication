import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { HeaderOption, ResponseData } from "./headerOptions";

export interface Iunidadacademica {
  idunidad: number;
  clave: string;
  nombre: string;
  perfil: string;
  direccion: string;
  correo: string;
  telefono: string;
  estatus: Eestatus;
};

export abstract class UnidadAcademicaModel extends HeaderOption {

  /**
   * Lista las unidades academicas registradas en el sistema con sus respectivos datos.
   * @returns {Observable<Iunidadacademica[]>} Array de unidades academicas.
   */
  abstract getUnidadesAcademicas$(): Observable<Iunidadacademica[]>;

  /**
   * Obtine la informacion de una unidad académica mediante el idunida.
   * @param {number} idunidad 
   * @returns {Observable<Iunidadacademica>} Datos de la unidad académica proporcionada
   */
  abstract getUnidadAcademicaById$(idunidad: number): Observable<Iunidadacademica>;

  /**
   * Actualiza los campos de una unidad academica. El campo esperado por la api es: unidad_academica
   * @param {Iunidadacademica} unidad_academica 
   */
  abstract updateUnidadAcademica$(unidad_academica: Iunidadacademica): Observable<ResponseData>;

  abstract newUnidadAcademica(unidad_academica: Iunidadacademica): Observable<ResponseData>;

  // abstract uploadFile(file: FormData, idunidad: number): Observable<boolean>;
}
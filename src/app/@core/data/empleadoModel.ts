import { Observable } from "rxjs";
import { Iusuario } from "./userModel";
import {
  HeaderOption,
  ResponseData
} from "./headerOptions";

export abstract class EmpleadoModel extends HeaderOption {

  abstract getEmpleados$(): Observable<Iusuario[]>;

  abstract getEmpleadosByUnidad$(clave: string): Observable<Iusuario[]>;

  abstract getEmpleadoById$(idempleado: number): Observable<Iusuario>;

  abstract updateEmpleado$(data: Iusuario): Observable<ResponseData>

  abstract updateEstatusEmpleado$(idusuario: number, estatus: string): Observable<ResponseData>;

  abstract newEmpleado$(data: Iusuario): Observable<ResponseData>;

}
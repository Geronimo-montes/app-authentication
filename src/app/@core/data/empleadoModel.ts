import { Observable } from "rxjs";
import { Iusuario } from "./userModel";
import {
  HeaderOption,
  ResponseData
} from "./headerOptions";

export abstract class EmpleadoModel extends HeaderOption {

  abstract getEmpleados$(): Observable<Iusuario[]>;

  abstract getEmpleadoById$(idempleado: number): Observable<Iusuario>;

  abstract updateEmpleado$(data: Iusuario): Observable<ResponseData>
    ;
  abstract newEmpleado$(data: Iusuario): Observable<ResponseData>;

}
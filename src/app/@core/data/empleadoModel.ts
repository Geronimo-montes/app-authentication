import { Observable } from "rxjs";
import { HeaderOption } from "./headerOptions";
import { Iauxiliar, Ijefatura, Iusuario } from "./userModel";

export abstract class EmpleadoModel extends HeaderOption {
  abstract getEmpleados$(): Observable<Ijefatura[] | Iauxiliar[]>;
}
import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { HeaderOption } from "./headerOptions";

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
  abstract getUnidadesAcademicas$(): Observable<Iunidadacademica[]>;
}
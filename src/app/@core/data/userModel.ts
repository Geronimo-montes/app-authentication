import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { HeaderOption } from "./headerOptions";

export interface Iusuario {
  idusuario: number;
  perfil: string;
  email: string;
  password: string;
  rol: Erol;
  token: string;
  ultima_conexion: Date;
  estatus: Eestatus;
}

export interface Ijefatura extends Iusuario {
  idunidad: number;
  nombre: string;
  ape_1: string;
  ape_2: string;
  telefono: string;
}

export interface Iauxiliar extends Ijefatura {
  idjefatura?: number;
}

export enum Erol {
  DIRECTOR = 'director',
  JEFATURA = 'jefatura',
  AUXILIAR = 'auxiliar'
}

export abstract class UserModel extends HeaderOption {
  abstract getUser$(): Observable<Iusuario>;
  abstract logOut$();
}
import { Observable } from "rxjs";
import { Eestatus } from "./comonModel";
import { HeaderOption } from "./headerOptions";

export interface Iusuario {
  idusuario: number;
  perfil: string;
  email: string;
  password?: string;
  rol: Erol;
  sesion_conectada?: string;
  clave?: string;
  idjefatura?: number;
  dataJefatura?: Iusuario;
  nombre?: string;
  ape_1?: string;
  ape_2?: string;
  telefono?: string;
  ultima_conexion?: Date;
  estatus?: Eestatus;
};

export enum Erol {
  NOASIGNADO = 'noasignado',
  DIRECTOR = 'director',
  JEFATURA = 'jefatura',
  AUXILIAR = 'auxiliar'
}

export abstract class UserModel extends HeaderOption {
  /**
   * @name getUsuer$
   * @description Recupera la informacion de la cuenta del usuario logueado
   * @returns {<Iusuario>usuario}
   */
  abstract getUser$(): Observable<Iusuario>;

  /**
   * @name getDataUser$
   * @description Recupera la informacion personal del usuario
   * @returns {Observable<Iauxiliar | Ijefatura>}
   */
  // abstract getDataUser$(): Observable<Iauxiliar | Ijefatura>;

  /**
   * @name logOut$
   * @description Destruye el token de session y elimina la sesion. Redirige al login
   * @return void
   */
  abstract logOut$();
}
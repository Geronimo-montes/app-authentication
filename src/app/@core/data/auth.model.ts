import { Observable } from "rxjs";
import { HeaderOption } from "./headerOptions";
import { IUser } from "./user.model";

export abstract class AuthModel {

  /**
   * Recupera la informacion de la cuenta del usuario logueado
   * @returns {IUser} user
   */
  abstract getUser$(): Observable<IUser>;

  /**
   * Destruye el token de session y elimina la sesion. Redirige al login
   * @return {void}
   */
  abstract logOut$();
}
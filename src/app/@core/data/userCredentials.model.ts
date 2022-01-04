import { Observable } from "rxjs";
import { HeaderOption } from "./headerOptions";

export interface IUserCredentials {
  _id?: string;
  _id_user: string;
  email: string;
  create_date: string;
  update_date: string;
}

export abstract class UserCredentialsModel extends HeaderOption {
  /**
   * 
   * @param {string} name 
   * @param {ERol} role 
   */
  abstract add$(_id: string, email: string, password: string): Observable<any>;
}
import { Observable } from "rxjs";
import { IFaceId } from "./faceId.model";
import { HeaderOption } from "./headerOptions";
import { IUserCredentials } from "./userCredentials.model";

export interface IUserResponse {
  perfil: string;
  _id_admin?: string;
  _id?: string;
  name: string;
  role: ERol;
  _id_face_id?: null | IFaceId;
  _id_credentials?: null | IUserCredentials;
  create_date: string;
  update_date: string;
}

export interface IUser {
  _id: string;
  perfil: string;
  name: string;
  role: ERol;
  faceId?: number;
  credentials?: string;
  create: string;
  update: string;
  estatus: Eestatus;
  create_date: string;
  update_date: string;
}

export enum Eestatus {
  ALTA = 'a',
  BAJA = 'b',
}

export enum ERol {
  /**
   * Usuario que tiene el poder de modificar los registros
   */
  ADMIN = 'admin',
  /**
   * Solo puede utilizar las rutas de autenticación
   */
  USER = 'user',
};


export abstract class UserModel {
  /**
   * 
   * @param {string} _id_admin _id_
   * @param {string} _id 
   */
  abstract findOne$(_id: string): Observable<any>;

  /**
   * 
   */
  abstract all$(): Observable<any>;

  /**
   * 
   * @param {string} name 
   * @param {ERol} role 
   */
  abstract add$(name: string, role: ERol): Observable<any>;

  /**
   * 
   * @param {string} _id 
   */
  abstract updateOne$(_id: string): Observable<any>;

  /**
   * 
   * @param {string} _id 
   */
  abstract altaBaja$(_id: string, estatus: Eestatus): Observable<any>;
}
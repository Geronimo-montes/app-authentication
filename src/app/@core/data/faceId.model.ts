import { Observable } from "rxjs";
import { HeaderOption } from "./headerOptions";

export interface IFaceId {
  _id?: string;
  _id_user: string;
  number_files: number;
  create_date: string;
  update_date: string;
}

export abstract class FaceIdModel {
  /**
   * 
   * @param {string} name 
   * @param {ERol} role 
   */
  abstract add$(_id: string, files): Observable<any>;

  /**
   * 
   * @param files 
   */
  abstract signIn$(files): Observable<any>;
}
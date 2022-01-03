import { Observable } from "rxjs";
import { HeaderOption } from "./headerOptions";

export interface IFaceId {
  _id?: string;
  _id_user: string;
  number_files: number;
}

export abstract class FaceIdModel extends HeaderOption {
  /**
   * 
   * @param {string} name 
   * @param {ERol} role 
   */
  abstract add$(_id: string, files): Observable<any>;
}
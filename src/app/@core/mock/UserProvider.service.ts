import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Eestatus, ERol } from "../data/user.model";
import { IUser } from "../data/user.model";
import { UserModel } from "../data/user.model";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService extends UserModel {

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  findOne$(_id: string): Observable<any> {
    return this.http.get<IUser[]>(`user/${_id}`)
      .pipe(
        map((user: any) => ({
          _id: user._id,
          perfil: `${environment.API_URL}${user.perfil}`,
          name: user.name,
          role: user.role,
          faceId: (user._id_face_id) ? user._id_face_id.number_files : 0,
          credentials: (user._id_credentials) ? user._id_credentials.email : '',
          create: user.create_date,
          update: user.update_date,
          estatus: user.estatus
        }))
      );
  }

  all$(): Observable<any> {
    return this.http.get<IUser[]>(`user/all`)
      .pipe(
        map((response: any) => response.users.map(
          (user: any) => ({
            _id: user._id,
            perfil: `${environment.API_URL}${user.perfil}`,
            name: user.name,
            role: user.role,
            faceId: (user._id_face_id) ? user._id_face_id.number_files : 0,
            credentials: (user._id_credentials) ? user._id_credentials.email : '',
            create: user.create_date,
            update: user.update_date,
            estatus: user.estatus
          })
        ))
      );
  }

  add$(name: string, role: ERol): Observable<any> {
    throw new Error("Method not implemented.");
  }

  updateOne$(_id: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  altaBaja$(_id: string, estatus: Eestatus): Observable<any> {
    return this.http.put(`user/${_id}`, { estatus })
      .pipe(
        map((response: any) => {
          console.log({ response })
        })
      );
  }

}
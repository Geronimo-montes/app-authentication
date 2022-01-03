import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { map, take } from "rxjs/operators";
import { filter } from "rxjs/operators";
import { concatMap } from "rxjs/operators";
import { takeWhile } from "rxjs/operators";

import { NbAuthResult } from "@nebular/auth";
import { NbAuthService } from "@nebular/auth";
import { NbAuthJWTToken } from "@nebular/auth";

import { Eestatus, ERol, IUser, IUserResponse } from "../data/user.model";
import { UserModel } from "../data/user.model";
import { environment } from "../../../environments/environment";

@Injectable()
export class UserService extends UserModel {

  constructor(
    protected http: HttpClient,
    private authService: NbAuthService,
    private router: Router,
  ) {
    super(http);
  }

  findOne$(_id: string): Observable<any> {
    return this.http.get<IUser[]>(
      `${environment.API_URL}user/${_id}`,
      this.getOptions()
    ).pipe(
      map((response: any) => {
        return <IUser>{
          _id: response._id,
          perfil: (response.perfil) ? response.perfil : 'assets/user.png',
          name: response.name,
          role: response.role,
          faceId: (response._id_face_id) ? response._id_face_id.number_files : 0,
          credentials: (response._id_credentials) ? response._id_credentials.email : '',
          create: new Date().toDateString(),
          update: new Date().toDateString(),
          estatus: Eestatus.ALTA,
        }
      }));
  }

  all$(): Observable<any> {
    return this.http.get<IUser[]>(
      `${environment.API_URL}user/all`,
      this.getOptions()
    ).pipe(
      map((response: any) => {
        return response.users.map((u: any) => {
          return <IUser>{
            _id: u._id,
            perfil: (u.perfil) ? u.perfil : 'assets/user.png',
            name: u.name,
            role: u.role,
            faceId: (u._id_face_id) ? u._id_face_id.number_files : 0,
            credentials: (u._id_credentials) ? u._id_credentials.email : '',
            create: new Date().toDateString(),
            update: new Date().toDateString(),
            estatus: Eestatus.ALTA,
          }
        });
      }));
  }

  add$(name: string, role: ERol): Observable<any> {
    throw new Error("Method not implemented.");
  }

  updateOne$(_id: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  deleteOne$(_id: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Eestatus, ERol } from "../data/user.model";
import { IUser } from "../data/user.model";
import { UserModel } from "../data/user.model";
import { environment } from "../../../environments/environment";
import { ToastService } from "../utils";
import { EtypeMessage } from "../utils/toast.service";

@Injectable()
export class UserService extends UserModel {

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
  ) {
    super();
  }

  findOne$(_id: string): Observable<any> {
    return this.http.get<IUser>(`user?id=${_id}`)
      .pipe(map((data: IUser) => data));
  }

  all$(): Observable<any> {
    return this.http.get<IUser[]>(`user/all`)
      .pipe(
        map((data: any) => data));
  }

  add$(name: string, role: ERol): Observable<any> {
    return this.http.post<IUser>(`user`, { name })
      .pipe(
        map((res: any) => {
          this.toastService.info('Usuario registrado en el sistema', res.msg)
          return <IUser>res.data
        })
      );
  }

  updateOne$(_id: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  altaBaja$(_id: string, estatus: Eestatus): Observable<any> {
    return this.http.put(`user?id=${_id}`, { estatus })
      .pipe(
        map((response: any) => {
          console.log({ response })
        })
      );
  }

}
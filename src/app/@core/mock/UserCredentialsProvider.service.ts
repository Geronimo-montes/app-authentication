import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ToastService } from "../utils";
import { IUserCredentials, UserCredentialsModel } from "../data/userCredentials.model";

@Injectable()
export class UserCredentialsService extends UserCredentialsModel {

  constructor(
    private router: Router,
    protected http: HttpClient,
    private toastService: ToastService,

  ) {
    super();
  }

  add$(_id: string, email: string, password: string): Observable<any> {
    return this.http.post<IUserCredentials>(
      `sign-up/user-credentials?id=${_id}`,
      { email, password }
    ).pipe(
      map((res: any) => {
        this.toastService
          .info('Credenciales de Usuario registradas en el sistema', res.msg);
        return res.data;
      })
    );
  }

  signIn$(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `sign-in/user-credentials`,
      { email, password }
    ).pipe(
      map((res: any) => {
        this.toastService
          .info(
            'Tesst Credenciales de Usuario',
            res.msg
          )
      })
    );
  }
}
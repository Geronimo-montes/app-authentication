import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { concatMap, filter, map, take, takeUntil, takeWhile } from "rxjs/operators";
import { ResponseData } from "../data/headerOptions";
import {
  Iusuario,
  UserModel
} from "../data/userModel";
import {
  NbAuthJWTToken,
  NbAuthResult, NbAuthService
} from "@nebular/auth";

@Injectable()
export class UserProvierService extends UserModel {

  constructor(
    protected http: HttpClient,
    private authService: NbAuthService,
    private router: Router,
  ) {
    super(http);
  }

  public getUser$(): Observable<Iusuario> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? token.getPayload().usuario : null;
        }),
      );
  }

  public logOut$() {
    let util = true;
    this.http.delete<ResponseData>(`auth/sign-out`, this.getOptions())
      .pipe(
        takeWhile(() => util),
        filter(response => response.response),
        concatMap(() => this.authService.logout('email')),
        filter((nbAuthResult: NbAuthResult) => nbAuthResult.isSuccess())
      ).subscribe(
        () => this.router.navigateByUrl('auth/login'),
        (err) => { throwError(err) },
        () => { util = false; }
      );
  }
}
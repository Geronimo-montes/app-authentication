import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// 
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { map } from "rxjs/operators";
import { filter } from "rxjs/operators";
import { concatMap } from "rxjs/operators";
import { takeWhile } from "rxjs/operators";
// 
import { NbAuthResult } from "@nebular/auth";
import { NbAuthService } from "@nebular/auth";
import { NbAuthJWTToken } from "@nebular/auth";
// 
import { AuthModel } from "../data/auth.model";

@Injectable()
export class AuthService extends AuthModel {

  constructor(
    protected http: HttpClient,
    private nbAuthService: NbAuthService,
    private router: Router,
  ) {
    super(http);
  }

  public getUser$(): Observable<any> {
    return this.nbAuthService
      .onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) =>
          token.isValid() ? token.getPayload() : null)
      );
  }

  public logOut$() {
    let util = true;
    this.http.delete<any>(`sign-out`, this.getOptions())
      .pipe(
        takeWhile(() => util),
        filter(response => response.response),
        concatMap(() => this.nbAuthService.logout('email')),
        filter((nbAuthResult: NbAuthResult) => nbAuthResult.isSuccess())
      ).subscribe(
        () => this.router.navigateByUrl('auth/login'),
        (err) => { throwError(err) },
        () => { util = false; }
      );
  }
}
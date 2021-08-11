import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthJWTToken, NbAuthResult, NbAuthService } from "@nebular/auth";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { ResponseData } from "../data/headerOptions";
import { Iusuario, UserModel } from "../data/userModel";

@Injectable()
export class UserProvierService extends UserModel {

  constructor(
    protected httpClient: HttpClient,
    private authService: NbAuthService,
    private router: Router,
  ) {
    super(httpClient);
  }

  public getUser$(): Observable<Iusuario> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? token.getPayload().usuario : null;
        }),
      );
  }

  // public getDataUser$(): Observable<Iauxiliar | Ijefatura> {
  //   return this.authService.onTokenChange()
  //     .pipe(
  //       map((token: NbAuthJWTToken) => {
  //         return token.isValid() ? token.getPayload().data : null;
  //       }),
  //     );
  // }

  public logOut$() {
    this.httpClient.delete<ResponseData>(
      `${this.baseURL}auth/sign-out`,
      this.getOptions()
    ).pipe(take(1))
      .subscribe((reponse: ResponseData) => {
        if (reponse.response)
          this.authService.logout('email')
            .pipe(take(1))
            .subscribe((nbAuthResult: NbAuthResult) => {
              if (nbAuthResult.isSuccess())
                this.router.navigateByUrl('auth/login');
            });
      });
  }

  // /**
  //  * @description Actualiza correo y contraseña del usuario
  //  * @param data
  //  * @returns <Iresponse> respuesta de la solicitud
  //  */
  // updateCredenciales(data: any): Observable<ResponseData> {
  //   return this.httpClient.put<ResponseData>(
  //     `${this.baseURL}auth/update-credenciales`, data, this.getOptions())
  //     .pipe(
  //       map((response) => response),
  //     );
  // }

  // /**
  //  * @descripcion Refesca el token de sesion
  //  */
  // refreshToken(): void {
  //   this.authService.refreshToken('email', { token: localStorage.getItem('auth_app_token') }).subscribe((result: NbAuthResult) => { });
  // }
}
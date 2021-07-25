import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthJWTToken, NbAuthResult, NbAuthService } from "@nebular/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Eestatus, Irespons } from "../data/comonModel";
import { Erol, Iusuario, UserModel } from "../data/userModel";

@Injectable()
export class UserProvierService extends UserModel {

  constructor(
    protected httpClient: HttpClient,
    private authService: NbAuthService,
    private router: Router,
  ) {
    super(httpClient);
  }

  private get usuario(): Iusuario {
    return <Iusuario>{
      idusuario: 1,
      perfil: './assets/user_250x250.png',
      email: 'email@email.com',
      password: 'pass',
      rol: Erol.AUXILIAR,
      token: 'token',
      ultima_conexion: new Date(),
      estatus: Eestatus.ALTA,
      dataperfil: null,
    }
  }

  /**
   * @name getUsuer$
   * @description Recupera la informacion del usuario logueado
   * @returns <Iusuario>usuario
   */
  getUser$(): Observable<Iusuario> {
    return new Observable(obs => obs.next(this.usuario))

    // return this.authService.onTokenChange()
    //   .pipe(
    //     map((token: NbAuthJWTToken) => {
    //       return token.isValid() ? token.getPayload().usuario : null;
    //     }),
    //   );
  }


  /**
   * @name logOut$
   * @description Destruye el token de session y elimina la sesion. Redirige al login
   * @return void
   */
  logOut$() {
    this.httpClient.delete<Irespons>(`${this.baseURL}auth/sign-out`, this.getOptions())
      .subscribe((respons) => {
        if (respons.respons)
          this.authService.logout('email')
            .subscribe((nbAuthResult: NbAuthResult) => {
              if (nbAuthResult.isSuccess())
                this.router.navigateByUrl(nbAuthResult.getRedirect());
            });
      });
  }

  /**
   * @description Actualiza correo y contraseña del usuario
   * @param data
   * @returns <Iresponse> respuesta de la solicitud
   */
  updateCredenciales(data: any): Observable<Irespons> {
    return this.httpClient.put<Irespons>(
      `${this.baseURL}auth/update-credenciales`, data, this.getOptions())
      .pipe(
        map((response) => response),
      );
  }

  /**
 * @descripcion Refesca el token de sesion
 */
  refreshToken(): void {
    this.authService.refreshToken('email', { token: localStorage.getItem('auth_app_token') }).subscribe((result: NbAuthResult) => { });
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { Erol } from '../data/userModel';

@Injectable()
export class RoleProviderService implements NbRoleProvider {

  constructor(private authService: NbAuthService) { }

  /**
   * @name getRole
   * @description Implementacion NbRoleProvide, complemento para gestion de permisos
   * @returns Observable<string> Rol del usuario actual, por defecto invitado
   */
  getRole(): Observable<Erol> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            return <Erol>token.getPayload().usuario.rol;
          }
        }),
      );
  }

  isDirector(): Observable<boolean> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            return <Erol>token.getPayload().usuario.rol === Erol.DIRECTOR;
          }
        }),
      );
  }
}

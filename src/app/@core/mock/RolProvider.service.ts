import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { ERol } from '../data/user.model';

@Injectable()
export class RoleProviderService implements NbRoleProvider {

  constructor(private authService: NbAuthService) { }

  /**
   * @name getRole
   * @description Implementacion NbRoleProvide, complemento para gestion de permisos
   * @returns Observable<string> Rol del usuario actual, por defecto invitado
   */
  getRole(): Observable<ERol> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            return <ERol>token.getPayload().role;
          }
        }),
      );
  }

  isAdmin(): Observable<boolean> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            return <ERol>token.getPayload().role === ERol.ADMIN;
          }
        }),
      );
  }
}

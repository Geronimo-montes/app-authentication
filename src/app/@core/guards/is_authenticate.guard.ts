import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class IsAuthenticateGuard implements CanActivate {

  constructor(
    private authService: NbAuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {

    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {

          if (!authenticated) {
            this.router.navigate(['auth/login']);
            return false;
          } else {
            return true;
          }
        }),
      );
  }
}

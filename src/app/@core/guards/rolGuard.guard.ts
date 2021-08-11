import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { RoleProviderService } from '../mock/rolProvider.service';

@Injectable()
export class RolGuard implements CanActivate {

  constructor(
    private rolService: RoleProviderService,
    private router: Router,
  ) { }

  canActivate() {
    return this.rolService.isDirector()
      .pipe(
        tap(isDirector => {
          if (!isDirector) {
            this.router.navigate(['pages/dashboard']);
          }
        }),
      );
  }
}

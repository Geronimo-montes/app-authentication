import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AuthModel } from '../../../@core/data/auth.model';
import { IUser } from '../../../@core/data/user.model';
import { LayoutService } from '../../../@core/utils';
import { MENU } from './menu_user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public user: IUser;
  public menu = MENU;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private authService: AuthModel,
  ) { }

  ngOnInit(): void {
    this.authService.getUser$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: IUser) => this.user = user)

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu'),
        map(({ item: { title } }) => title),
        takeUntil(this.destroy$),
      )
      .subscribe(title => {
        if (title === 'Cerrar Sesion') this.logOut();
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logOut() {
    this.authService.logOut$();
  }

}

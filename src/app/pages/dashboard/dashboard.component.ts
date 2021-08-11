import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Erol, UserModel } from '../../@core/data/userModel';
import { RoleProviderService } from '../../@core/mock/rolProvider.service';
import { CONTROLLS } from './dashboard-controlls';

export interface Icontrolls {
  objeto: string;
  nombre: string;
  icono: string;
  class: 'status-primary' | 'status-info' | 'status-warning' | 'status-success' | 'status-danger';
  link: string;
};

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="col-md-12">
      <h1>Bienvanido Username</h1>
    </div>

    <div class="row col-md-12 justify-content-start">
      <div *ngFor="let c of controlls">
        <nb-card *nbIsGranted="['control', c.objeto]" [class]="c.class"
          [routerLink]="c.link">
          <div class="row aling-items-center justify-content-around">
            <img [src]="c.icono" alt="">
            <h4>{{ c.nombre }}</h4>
          </div>
        </nb-card>
      </div>
    </div>`,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public controlls: Icontrolls[] = CONTROLLS;

  constructor(
    private rolService: RoleProviderService,
    private userService: UserModel,
  ) { }

  ngOnInit(): void {
    this.rolService.getRole()
      .pipe(take(1))
      .subscribe(rol => {
        if (rol === Erol.AUXILIAR || rol === Erol.JEFATURA) {
          this.userService.getUser$()
            .pipe(take(1))
            .subscribe(usuario => {
              this.controlls.map(o => {
                if (o.objeto === 'alumno') o.link += `/${usuario.idunidad}`;
              });
            });
        };
      });
  }


}

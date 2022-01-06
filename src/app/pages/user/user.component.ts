import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { UserModel } from '../../@core/data/user.model';
import { ToastService } from '../../@core/utils';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';

@Component({
  selector: 'app-user',
  template: `
  <div class="row col-md-12">
    <img  src="assets/usuarios.png" alt="Documentación">

    <div class="pointer ml-4" >
      <app-card-item-menu [title]="'Tabla de usuarios'" [type]="'primary'"
        [icon]="'assets/tabla.png'" [routerLink]="router.tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Registrar Usuario'" [type]="'success'"
        [icon]="'assets/add-user.png'" (click)="new_user()">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet></router-outlet>
`,
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();

  public router: any = {
    tabla: '/pages/users/tabla',
    registro: '/pages/users/registro',
  };

  constructor(
    private userService: UserModel,
    private dialogService: NbDialogService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  new_user(): void {
    this.dialogService
      .open(
        FormComponent,
        {
          context: {},
          closeOnEsc: false,
          closeOnBackdropClick: false,
        }
      )
  }

}

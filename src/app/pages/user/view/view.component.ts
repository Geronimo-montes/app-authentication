import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from '../../../@core/data/user.model';
import { UserCredentialsModel } from '../../../@core/data/userCredentials.model';
import { ToastService } from '../../../@core/utils';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @Input() _data: IUser;
  public loadingData: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  get data(): IUser {
    return this._data;
  }

  constructor(
    protected ref: NbDialogRef<ViewComponent>,
    private userCredentialsService: UserCredentialsModel,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close(false);
  }

  /**
   * TODO: FORMULARIO REACTIVO
   */
  testFaceId() {

  }

  /**
   * TODO: FORMULARIO REACTIVO
   */
  testUserCredentials() {
    this.loadingData = true;

    this.userCredentialsService.signIn$(this._data._id_credentials.email, '1234')
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (data) => {
          this.toastService.success(
            'Test de sesión',
            'Credenciales de Usario Validas',
          );
        },
        error: (err) => {
          console.log({ err })
          this.loadingData = false;
        },
        complete: () => {
          this.loadingData = false;
        },

      })
  }
}

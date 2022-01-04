
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NbDialogService } from '@nebular/theme';

import { Eaccion } from '../../../@theme/components';

import { FILTER } from './settings';
import { SETTINGS } from './settings';

import { ViewComponent } from '../view/view.component';
import { Eestatus, IUser, UserModel } from '../../../@core/data/user.model';
import { ToastService } from '../../../@core/utils';
import { EtypeMessage } from '../../../@core/utils/toast.service';


@Component({
  selector: 'app-tabla-documentacion',
  template: `
  <app-tabla [title]="title" [object]="object" [settings]="settings" 
    [loadingData]="loading | async"  [data]="data | async" 
    (rowSelected)="$rowSeleccionado($event)" [filter]="filter">
  </app-tabla>
  `,
})
export class TablaUserComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public title: string = 'Lista de Usuarios';
  public object: string = 'usuario';
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: IUser[] = [];
  public loadingData: boolean = false;

  constructor(
    private userService: UserModel,
    private dialogService: NbDialogService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get loading(): Observable<boolean> {
    return new Observable((obs) => obs.next(this.loadingData));
  }

  get data(): Observable<IUser[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  private async loadData() {
    this.loadingData = true;
    this.dataSource = await this.userService.all$().toPromise();
    this.loadingData = false;
  }

  $rowSeleccionado($event) {
    switch ($event.accion) {
      case Eaccion.UPDATE_DATA_LIST: this.loadData(); break;
      case Eaccion.EDIT: this.update($event.data); break;
      case Eaccion.DELETE: this.delete($event.data); break;
      case Eaccion.VIEW: this.view($event.data); break;
    }
  }

  private update({ _id }: IUser) {
    this.userService
      .updateOne$(_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => { });
  }

  private delete(data: IUser) {
    this.userService
      .altaBaja$(data._id, data.estatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        const
          title = 'Actualizacion de datos.',
          body = `El usuario ${data.name} ha sido actualizado.`,
          type = EtypeMessage.SUCCESS;
        this.toastService.show(title, body, type);
        this.loadData();
      });
  }

  private view(user: IUser) {
    this.userService
      .findOne$(user._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: IUser) => {
        this.dialogService
          .open(
            ViewComponent,
            {
              context: { _data: user },
              closeOnEsc: false,
              closeOnBackdropClick: false,
            }
          )
      });
  }
}

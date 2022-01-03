import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { IUser } from '../../../@core/data/user.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @Input() _data: IUser;
  public loadingData: boolean = false;


  get data(): IUser {
    return this._data;
  }

  constructor(
    protected ref: NbDialogRef<ViewComponent>,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close(false);
  }
}

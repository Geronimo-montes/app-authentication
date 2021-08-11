import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Idocumento, Ipackdocumentacion } from '../../../@core/data/documentoModel';

@Component({
  selector: 'app-view-pack',
  templateUrl: './view-pack.component.html',
  styleUrls: ['./view-pack.component.scss']
})
export class ViewPackComponent implements OnInit {

  @Input() data: Ipackdocumentacion;
  public loadingData: boolean = false;


  get docs(): Idocumento[] {
    return this.data.detalleDocumento;
  }

  constructor(
    protected ref: NbDialogRef<ViewPackComponent>,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close(false);
  }
}

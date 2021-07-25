import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { Idocumento, Ipackdocumentacion } from '../../../@core/data/documentoModel';

@Component({
  selector: 'app-view-pack',
  templateUrl: './view-pack.component.html',
  styleUrls: ['./view-pack.component.scss']
})
export class ViewPackComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
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

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }

  close() {
    this.ref.close(false);
  }
}

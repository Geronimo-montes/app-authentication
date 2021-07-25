import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ialumno } from '../../../@core/data/alumnoModel';
import { DocumentoModel, Ipackdocumentacion } from '../../../@core/data/documentoModel';

@Component({
  selector: 'app-view-alumno',
  templateUrl: './view-alumno.component.html',
  styleUrls: ['./view-alumno.component.scss']
})
export class ViewAlumnoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  @Input() data: Ialumno;
  public loadingData: boolean = false;
  public packs_documentos: Ipackdocumentacion[] = [];

  constructor(
    protected ref: NbDialogRef<ViewAlumnoComponent>,
    private documentoService: DocumentoModel,
  ) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.documentoService.getPacksDocumentos$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.packs_documentos = data;
        this.loadingData = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }

  public close() {
    this.ref.close(false);
  }
}

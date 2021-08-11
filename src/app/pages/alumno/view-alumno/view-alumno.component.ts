import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { Ialumno } from '../../../@core/data/alumnoModel';
import { DocumentoModel, Ipackdocumentacion } from '../../../@core/data/documentoModel';

@Component({
  selector: 'app-view-alumno',
  templateUrl: './view-alumno.component.html',
  styleUrls: ['./view-alumno.component.scss']
})
export class ViewAlumnoComponent implements OnInit {

  @Input() data: Ialumno; // alumno seleccionado desde la tabla de alumnos
  public loadingData: boolean = false;
  public packs_documentos: Ipackdocumentacion[] = []; // paquetes de documentos registrados

  constructor(
    protected ref: NbDialogRef<ViewAlumnoComponent>,
    private documentoService: DocumentoModel,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadingData = true;

    this.packs_documentos =
      await this.documentoService.getPaqueteDocumentos$().toPromise();

    console.log({ packs: this.packs_documentos });

    this.loadingData = false;
  }

  public close() {
    this.ref.close(false);
  }
}

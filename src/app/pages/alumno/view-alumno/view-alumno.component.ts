import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { Ialumno } from '../../../@core/data/alumnoModel';
import { DocumentoModel } from '../../../@core/data/documentoModel';
import { Ipackdocumentacion, PaqueteDocModel } from '../../../@core/data/paqueteDocumentoModel';

@Component({
  selector: 'app-view-alumno',
  templateUrl: './view-alumno.component.html',
  styleUrls: ['./view-alumno.component.scss']
})
export class ViewAlumnoComponent implements OnInit {

  /**
   * Alumno seleccionado.
   */
  @Input() data: Ialumno;

  public loadingData: boolean = false;
  public packs_documentos: Ipackdocumentacion[] = []; // paquetes de documentos registrados

  constructor(
    protected ref: NbDialogRef<ViewAlumnoComponent>,
    private paqueteDocService: PaqueteDocModel,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadingData = true;
    this.packs_documentos =
      await this.paqueteDocService.getAllPaquete$().toPromise();
    this.loadingData = false;
  }

  public close() {
    this.ref.close(false);
  }
}

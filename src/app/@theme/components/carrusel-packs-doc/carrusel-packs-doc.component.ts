import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlumnoModel, Ialumno, IdocumentoEntregado } from '../../../@core/data/alumnoModel';
import { Idocumento, Ipackdocumentacion } from '../../../@core/data/documentoModel';

@Component({
  selector: 'app-carrusel-packs-doc',
  templateUrl: './carrusel-packs-doc.component.html',
  styleUrls: ['./carrusel-packs-doc.component.scss']
})
export class CarruselPacksDocComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  @Input('packs_documentos') packs: Ipackdocumentacion[] = [];
  @Input('alumno') data_alumno: Ialumno;

  public view_datalle: boolean = false;
  public selected_pack: Ipackdocumentacion = null;
  public selected_pack_alumno: IdocumentoEntregado[];

  get docs(): Idocumento[] {
    return this.selected_pack.detalleDocumento;
  }

  get data(): Idocumento[] | Ipackdocumentacion[] {
    return (this.view_datalle) ? this.selected_pack.detalleDocumento : this.packs;
  }

  constructor(private alumnoService: AlumnoModel) { }

  ngOnInit(): void {
    this.selected_pack = this.packs[0];

    this.alumnoService.getDocumentacionEntregadaByAlumnoPack$(
      this.data_alumno.matricula,
      this.selected_pack.idpaquete,
    ).pipe(takeUntil(this.destroy$))
      .subscribe(data => this.selected_pack_alumno = data);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }

  detalle_paks_documentos(pack: Ipackdocumentacion) {
    this.selected_pack = pack;
    this.view_datalle = !this.view_datalle;

    this.alumnoService.getDocumentacionEntregadaByAlumnoPack$(
      this.data_alumno.matricula,
      this.selected_pack.idpaquete,
    ).pipe(takeUntil(this.destroy$))
      .subscribe(data => this.selected_pack_alumno = data);
  }

  public validarDocumento(
    iddocumento: number
  ): { text: string, status: NbComponentStatus } {
    const validacion = this.selected_pack_alumno.filter(d => d.iddocumento === iddocumento);

    if (validacion.length === 0) {
      return { text: 'Sin entrega', status: 'danger' };
    } else {
      return { text: 'Entregado', status: 'success' };
    }
  }
}

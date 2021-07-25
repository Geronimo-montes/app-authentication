import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Egenero, Ialumno } from '../../../@core/data/alumnoModel';
import { Eestatus } from '../../../@core/data/comonModel';
import { AlumnoProvierService } from '../../../@core/mock/AlumnoProvider.service';
import { ToastService } from '../../../@core/mock/Toast.service';
import { Eaccion, Iacciondata } from '../../../@theme/components';
import { ViewAlumnoComponent } from '../view-alumno/view-alumno.component';
import { FILTER, SETTINGS } from './alumno-settings';

@Component({
  selector: 'app-tabla-alumno',
  templateUrl: './tabla-alumno.component.html',
  styleUrls: ['./tabla-alumno.component.scss']
})
export class TablaAlumnoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public settings = SETTINGS;
  public filter = FILTER;
  public dataSource: Ialumno[] = [];
  public loadingData: boolean = false;

  private idunidad: number = 1;

  constructor(
    private toastService: ToastService,
    private dialogService: NbDialogService,
    private alumnoService: AlumnoProvierService,
  ) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.alumnoService.getAlumnosByUniidad$(this.idunidad)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dataSource = data;
        this.loadingData = false;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
    this.destroy$.next();
  }

  get loading(): Observable<boolean> {
    return new Observable((obs) => obs.next(this.loadingData));
  }

  get data(): Observable<Ialumno[]> {
    return new Observable((obs) => obs.next(this.dataSource));
  }

  /**
   * Recibe el row selecccionado de la tabla junto a la accion a realizar
   * @param $event {accion: Eaccion, data: any}
   */
  alumnoSeleccionado($event: Iacciondata) {
    switch ($event.accion) {
      case Eaccion.DATA_UPDATE:
        this.dataUpdate();
        break;
      case Eaccion.EDIT:
        this.editar($event.data);
        break;
      case Eaccion.DELETE:
        this.delete($event.data);
        break;
      case Eaccion.VIEW:
        this.view($event.data);
        break;
    }
  }

  private dataUpdate() {
    const DATA: Ialumno[] = [
      {
        matricula: 'matricula',
        idunidad: 1,
        perfil: 'perfil',
        nombre: 'nombre',
        ape_1: 'ape_1',
        ape_2: 'ape_2',
        genero: Egenero.MASCULINO,
        direccion: 'diraccion',
        telefono: 'telefono',
        email: 'email',
        estatus: Eestatus.ALTA,
      },
    ];

    this.dataSource = DATA;
    console.log(this.dataSource);
  }

  private editar(data: Ialumno) {
    //llamada a alumnoService -> updateAlumno
    if (true) {
      const msj = {
        title: 'Edición de elemento',
        body: `Información del alumno ${data.nombre} actaulizada.`
      };
      this.toastService.show(msj.title, msj.body);
    } else {
      const msj = {
        title: 'Edición de elemento',
        body: 'No es posible actualizar la información. Intente nuevamente.'
      };
      this.toastService.show(msj.title, msj.body, 'danger');
    }
  }

  private delete(data: Ialumno) {
    //llamada a alumnoService -> updateAlumno : estatus = b
    if (true) {
      const msj = {
        title: 'Baja de alumno',
        body: `${data.nombre} `
      };
      this.toastService.show(msj.title, msj.body);
    } else {
      const msj = {
        title: 'Baja de alumno',
        body: 'No es posible la baja del alumno. Intente nuevamente.'
      };
      this.toastService.show(msj.title, msj.body, 'danger');
    }
  }

  private view(data: Ialumno) {
    this.dialogService
      .open(ViewAlumnoComponent, {
        context: { data: data },
        closeOnEsc: false,
        closeOnBackdropClick: false,
      }).onClose.pipe(takeUntil(this.destroy$))
      .subscribe(() => { });
  }
}

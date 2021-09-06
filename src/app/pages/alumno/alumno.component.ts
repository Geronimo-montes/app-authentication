import { _isNumberValue } from '@angular/cdk/coercion';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-alumno',
  template: `
  <div class="row col-md-12">
    <img class="img" src="assets/alumnos.png" alt="Alumnos">

    <div class="pointer ml-4" *ngIf="show | async">
      <app-card-item-menu [title]="'Lista alumnos'" [type]="'primary'"
        [icon]="'assets/tabla-unidades.png'" [routerLink]="tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4" *nbIsGranted="['create', 'alumno']">
      <app-card-item-menu [title]="'Registrar alumno'" [type]="'success'"
        [icon]="'assets/add-alumno.png'" [routerLink]="registro">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet (activate)="onActivated($event);"></router-outlet>
`,
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  // 
  /**
   * Para el direcctor se muestras los alumnos por unidad academica, porlo que antes debe seleccionar una.
   * Con PARAMETRO: Se muestra el contorl para el listado, registro bloquea la seleccion de la unidad y establece el valor del parametro
   * Sin PARAMETRO: Se oculta el control del listado dado que no existe unidad seleccionada
   */
  public show_tabla: boolean = true;
  public tabla: string = '/pages/alumno/tabla-alumnos';
  public registro: string = '/pages/alumno/registro-alumno';

  get show(): Observable<boolean> {
    return new Observable(obs => obs.next(this.show_tabla));
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateEnlaces(this.router);
  }

  onActivated($event) {
    if ($event.router) this.updateEnlaces($event.router)
  }

  /**
   * Actualiza las rutas de la tabla y registro de alumno. Agrega el parametro seleccionado ó oculta los elementos
   * @param router 
   */
  private updateEnlaces(router) {
    const
      url = router.url,
      param = url.slice(url.lastIndexOf('/') + 1);

    if (_isNumberValue(param)) {
      this.tabla = `/pages/alumno/tabla-alumnos/${param}`;
      this.registro = `/pages/alumno/registro-alumno/${param}`;
      this.show_tabla = true;
    } else {
      this.show_tabla = false;
    }
  }
}

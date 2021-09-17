import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  template: `
  <div class="row col-md-12">
    <img src="assets/empleados.png" alt="Empleados">

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Lista de empleados'" [type]="'primary'"
        [icon]="'assets/tabla-empleado.png'" [routerLink]="tabla">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Registrar de empleado'" [type]="'success'"
        [icon]="'assets/add-empleado.png'" [routerLink]="registro">
      </app-card-item-menu>
    </div>

    <div class="pointer ml-4">
      <app-card-item-menu [title]="'Asignar auxiliar'" [type]="'warning'"
        [icon]="'assets/add-empleado.png'" [routerLink]="asignar">
      </app-card-item-menu>
    </div>
  </div>

  <router-outlet></router-outlet>
`,
  styleUrls: ['./empleado.component.scss']
})
export class EmpleadoComponent implements OnInit {

  public tabla: string = '/pages/empleado/tabla-empleado';
  public registro: string = '/pages/empleado/registro-empleado';
  public asignar: string = '/pages/empleado/asignar-empleado';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateEnlaces(this.router);
  }

  onActivated($event) {
    if ($event.router) this.updateEnlaces($event.router);
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
      this.tabla = `/pages/empleado/tabla-empleados/${param}`;
      this.registro = `/pages/empleado/registro-empleado/${param}`;
    }
  }

}

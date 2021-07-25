import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmpleadoModel } from "../data/empleadoModel";
import { Iauxiliar, Ijefatura } from "../data/userModel";
import { DATA } from "./DataEmpleado";

@Injectable()
export class EmpleadoProvierService extends EmpleadoModel {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  private get empleados(): Ijefatura[] | Iauxiliar[] {
    return <Ijefatura[] | Iauxiliar[]>DATA;
  };

  public getEmpleados$(): Observable<Ijefatura[] | Iauxiliar[]> {
    return new Observable(obs =>
      obs.next(
        this.empleados
      ));
  }
}
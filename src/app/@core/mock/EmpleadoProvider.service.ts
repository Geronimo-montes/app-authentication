import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EmpleadoModel } from "../data/empleadoModel";
import { ResponseData } from "../data/headerOptions";
import { Iusuario } from "../data/userModel";

@Injectable()
export class EmpleadoProvierService extends EmpleadoModel {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public getEmpleados$(): Observable<Iusuario[]> {
    return this.http.get<ResponseData>(
      `empleado/`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario[]>response.data));
  }

  public getEmpleadosByUnidad$(clave_unidad: string): Observable<Iusuario[]> {
    return this.http.get<ResponseData>(
      `empleado/all/${clave_unidad}`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario[]>response.data));
  }

  public getEmpleadoById$(idempleado: number): Observable<Iusuario> {
    return this.http.get<ResponseData>(
      `empleado/:idempleado`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario>response.data));
  }

  public updateEmpleado$(empleado: Iusuario): Observable<ResponseData> {
    const data = new FormData();
    data.append('idusuario', empleado.idusuario.toString());
    data.append('email', empleado.email);
    data.append('password', empleado.password);
    data.append('rol', empleado.rol);
    data.append('clave', empleado.clave);
    data.append('nombre', empleado.nombre);
    data.append('ape_1', empleado.ape_1);
    data.append('ape_2', empleado.ape_2);
    data.append('telefono', empleado.telefono);

    return this.http.put<ResponseData>(
      `empleado/${empleado.idusuario}`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public updateEstatusEmpleado$(idusuario: number, estatus: string): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `empleado/${idusuario}/${estatus}`,
      {},
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public newEmpleado$(empleado: Iusuario): Observable<ResponseData> {

    const data = new FormData();
    data.append('perfil', empleado.perfil);
    data.append('email', empleado.email);
    data.append('password', empleado.password);
    data.append('rol', empleado.rol);
    data.append('clave', empleado.clave);
    data.append('nombre', empleado.nombre);
    data.append('ape_1', empleado.ape_1);
    data.append('ape_2', empleado.ape_2);
    data.append('telefono', empleado.telefono);

    return this.http.post<ResponseData>(
      `empleado/new`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }
}
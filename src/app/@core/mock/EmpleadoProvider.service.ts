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
      `empleado/all`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario[]>response.data));
  }

  public getEmpleadosByUnidad$(idunidad: number): Observable<Iusuario[]> {
    return this.http.get<ResponseData>(
      `empleado/all/${idunidad}`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario[]>response.data));
  }

  public getEmpleadoById$(idempleado: number): Observable<Iusuario> {
    return this.http.get<ResponseData>(
      `empleado/:idempleado`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario>response.data));
  }

  public updateEmpleado$(data: Iusuario): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `empleado/update`,
      { data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public newEmpleado$(data: Iusuario): Observable<ResponseData> {
    return this.http.post<ResponseData>(
      `empleado/new`,
      { data },
      this.getOptions()
    ).pipe(map((response) => response));
  }
}
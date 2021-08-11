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
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  public getEmpleados$(): Observable<Iusuario[]> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}empleado/all`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario[]>response.data));
  }

  getEmpleadoById$(idempleado: number): Observable<Iusuario> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}empleado/:idempleado`,
      this.getOptions()
    ).pipe(map((response) => <Iusuario>response.data));
  }

  updateEmpleado$(data: Iusuario): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(
      `${this.baseURL}empleado/update`,
      { data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  newEmpleado$(data: Iusuario): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(
      `${this.baseURL}empleado/new`,
      { data },
      this.getOptions()
    ).pipe(map((response) => response));
  }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseData } from "../data/headerOptions";
import { Iunidadacademica, UnidadAcademicaModel } from "../data/unidadAcademicaModel";

@Injectable()
export class UnidadProvierService extends UnidadAcademicaModel {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  public getUnidadesAcademicas$(): Observable<Iunidadacademica[]> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}unidad-academica/all`,
      this.getOptions()
    ).pipe(map((response) => <Iunidadacademica[]>response.data));
  }

  getUnidadAcademicaById$(idunidad: number): Observable<Iunidadacademica> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}unidad-academica/${idunidad}`,
      this.getOptions()
    ).pipe(map((response) => <Iunidadacademica>response.data));
  }

  updateUnidadAcademica$(unidad_academica: Iunidadacademica): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(
      `${this.baseURL}unidad-academica/update`,
      { unidad_academica: unidad_academica },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  newUnidadAcademica(unidad_academica: Iunidadacademica): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(
      `${this.baseURL}unidad-academica/new`,
      { unidad_academica: unidad_academica },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  // uploadFile(file: FormData, idunidad: number): Observable<boolean> {
  //   //aqui me quede
  // }

}
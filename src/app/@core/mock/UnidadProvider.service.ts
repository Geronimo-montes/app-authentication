import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseData } from "../data/headerOptions";
import { Iunidadacademica, UnidadAcademicaModel } from "../data/unidadAcademicaModel";

@Injectable()
export class UnidadProvierService extends UnidadAcademicaModel {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public getUnidadesAcademicas$(): Observable<Iunidadacademica[]> {
    return this.http.get<ResponseData>(
      `unidad-academica/all`,
      this.getOptions()
    ).pipe(map((response) => <Iunidadacademica[]>response.data));
  }

  getUnidadAcademicaById$(idunidad: number): Observable<Iunidadacademica> {
    return this.http.get<ResponseData>(
      `unidad-academica/${idunidad}`,
      this.getOptions()
    ).pipe(map((response) => <Iunidadacademica>response.data));
  }

  updateUnidadAcademica$(unidad_academica: Iunidadacademica): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `unidad-academica/update`,
      unidad_academica,
      this.getOptions()
    ).pipe(map((response) => response));
  }

  newUnidadAcademica(unidad_academica: Iunidadacademica): Observable<ResponseData> {
    return this.http.post<ResponseData>(
      `unidad-academica/new`,
      unidad_academica,
      this.getOptions()
    ).pipe(map((response) => response));
  }

  // uploadFile(file: FormData, idunidad: number): Observable<boolean> {
  //   //aqui me quede
  // }

}
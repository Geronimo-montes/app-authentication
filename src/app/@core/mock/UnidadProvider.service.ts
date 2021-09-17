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

  getUnidadAcademicaById$(clave: string): Observable<Iunidadacademica> {
    return this.http.get<ResponseData>(
      `unidad-academica/${clave}`,
      this.getOptions()
    ).pipe(map((response) => <Iunidadacademica>response.data));
  }

  updateUnidadAcademica$(data: Iunidadacademica): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `unidad-academica/update`,
      data,
      this.getOptions()
    ).pipe(map((response) => response));
  }

  newUnidadAcademica(data: Iunidadacademica): Observable<ResponseData> {
    return this.http.post<ResponseData>(
      `unidad-academica/new`,
      data,
      this.getOptions()
    ).pipe(map((response) => response));
  }

  // uploadFile(file: FormData, idunidad: number): Observable<boolean> {
  //   //aqui me quede
  // }

}
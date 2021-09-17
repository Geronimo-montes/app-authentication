import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseData } from "../data/headerOptions";
import {
  AlumnoModel,
  Ialumno,
  IdocumentoEntregado
} from "../data/alumnoModel";

@Injectable()
export class AlumnoProvierService extends AlumnoModel {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public getAlumnosByUnidad$(clave: string): Observable<Ialumno[]> {
    return this.http.get<ResponseData>(
      `alumno/all/${clave}`,
      this.getOptions()
    ).pipe(map((response) => <Ialumno[]>response.data));
  }

  public getAlumnoByMatricula$(matricula: string): Observable<Ialumno> {
    return this.http.get<ResponseData>(
      `alumno/${matricula}`,
      this.getOptions()
    ).pipe(map((response) => <Ialumno>response.data));
  }

  public validarMatricula$(matricula: string): Observable<boolean> {
    return this.http.get<ResponseData>(
      `alumno/validar/${matricula}`,
      this.getOptions()
    ).pipe(map((response) => response.data));
  }

  public newAlumno$(data: FormData): Observable<ResponseData> {
    return this.http.post<ResponseData>(
      `alumno/new`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public updateAlumno$(data: FormData): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `alumno/update`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public getDocsEntregadosByMatriculaPack(matricula: string, idpack: number): Observable<IdocumentoEntregado[]> {
    return this.http.get<ResponseData>(
      `alumno/${matricula}/${idpack}`,
      this.getOptions()
    ).pipe(map((response) => <IdocumentoEntregado[]>response.data));
  }
}

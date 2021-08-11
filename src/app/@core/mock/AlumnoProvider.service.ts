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
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  public getAlumnosByUnidad$(idunidad: number): Observable<Ialumno[]> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}alumno/all/${idunidad}`,
      this.getOptions()
    ).pipe(map((response) => <Ialumno[]>response.data));
  }

  public getAlumnoByMatricula$(matricula: string): Observable<Ialumno> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}alumno/${matricula}`,
      this.getOptions()
    ).pipe(map((response) => <Ialumno>response.data));
  }

  public updateAlumno$(alumno_data: Ialumno): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(
      `${this.baseURL}alumno/update`,
      { data: alumno_data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public newAlumno$(alumno_data: Ialumno): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(
      `${this.baseURL}alumno/new`,
      { data: alumno_data },
      this.getOptions()
    ).pipe(map((response) => response));
  }


  public getDocsEntregadosByMatriculaPack(matricula: string, idpack: number): Observable<IdocumentoEntregado[]> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}alumno/${matricula}/${idpack}`,
      this.getOptions()
    ).pipe(map((response) => <IdocumentoEntregado[]>response.data));
  }
}
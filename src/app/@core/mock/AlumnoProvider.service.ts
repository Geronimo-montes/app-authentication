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

  public getAlumnosByUnidad$(idunidad: number): Observable<Ialumno[]> {
    return this.http.get<ResponseData>(
      `alumno/all/${idunidad}`,
      this.getOptions()
    ).pipe(map((response) => <Ialumno[]>response.data));
  }

  public getAlumnoByMatricula$(matricula: string): Observable<Ialumno> {
    return this.http.get<ResponseData>(
      `alumno/${matricula}`,
      this.getOptions()
    ).pipe(map((response) => <Ialumno>response.data));
  }

  public updateAlumno$(alumno_data: Ialumno): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `alumno/update`,
      { data: alumno_data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public validarMatricula$(matricula: string): Observable<boolean> {
    return this.http.get<ResponseData>(
      `alumno/validar/${matricula}`,
      this.getOptions()
    ).pipe(map((response) => response.data));
  }

  public newAlumno$(alumno_data: Ialumno): Observable<ResponseData> {
    return this.http.post<ResponseData>(
      `alumno/new`,
      { data: alumno_data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public getDocsEntregadosByMatriculaPack(matricula: string, idpack: number): Observable<IdocumentoEntregado[]> {
    return this.http.get<ResponseData>(
      `alumno/${matricula}/${idpack}`,
      this.getOptions()
    ).pipe(map((response) => <IdocumentoEntregado[]>response.data));
  }

  public uploadFile$(file: File, matricula: string): Observable<ResponseData> {
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.post<ResponseData>(
      `alumno/upload/${matricula}/${this.getRandomString()}`,
      data,
      this.getOptionsFile(),
    ).pipe(map((response) => response));
  }

  private getRandomString(): string {
    return (Math.random() + 1).toString(36).substring(0, 20).replace(/\./g, 'a')
  }
}
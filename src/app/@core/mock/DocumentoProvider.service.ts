import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IdocumentoEntregado } from "../data/alumnoModel";
import {
  DocumentoModel,
  Idocumento,
} from "../data/documentoModel";
import { ResponseData } from "../data/headerOptions";

@Injectable()
export class DocumentoProvierService extends DocumentoModel {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public getDocumentosByPaquete$(idpaquete: number): Observable<Idocumento[]> {
    return this.http.get<ResponseData>(
      `documento/${idpaquete}/all`,
      this.getOptions()
    ).pipe(map((response) => <Idocumento[]>response.data));
  }

  public getInfoDocumento$(idpaquete: number, iddocumento: number): Observable<Idocumento> {
    return this.http.get<ResponseData>(
      `documento/${idpaquete}/${iddocumento}`,
      this.getOptions()
    ).pipe(map((response) => <Idocumento>response.data));
  }

  public getEntregasByPaqueteMatricula$(idpaquete: number, matricula: string): Observable<IdocumentoEntregado[]> {
    return this.http.get<ResponseData>(
      `documento/entregas/${idpaquete}/${matricula}`,
      this.getOptions()
    ).pipe(map((response) => response.data));
  }

  public getDownloadDocumentosByPaquete$(idpaquete: number, matricula: string): Observable<any> {
    return this.http.get(
      `documento/download/${idpaquete}/${matricula}`,
      { responseType: 'blob', headers: this.getOptions().headers },
    ).pipe(map((response) => response));
  }

  public getDocumentoById$(idpaquete: number, iddocumento: number, matricula: string): Observable<any> {
    return this.http.get(
      `documento/${idpaquete}/${iddocumento}/${matricula}`,
      { responseType: 'blob', headers: this.getOptions().headers },
    ).pipe(map((response) => response));
  }

  public getDownloadDocumentoById$(idpaquete: number, iddocumento: number, matricula: string): Observable<any> {
    return this.http.get(
      `documento/download/${idpaquete}/${iddocumento}/${matricula}`,
      { responseType: 'blob', headers: this.getOptions().headers },
    ).pipe(map((response) => response));
  }

  public postUploadDocumento$(idpaquete: number, iddocumento: number, matricula: string, file: File): Observable<ResponseData> {

    const data = new FormData();
    data.append('file', file);

    return this.http.post<ResponseData>(
      `documento/${idpaquete}/${iddocumento}/${matricula}`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public putUploadDocumento$(idpaquete: number, iddocumento: number, matricula: string, file: File): Observable<ResponseData> {

    const data = new FormData();
    data.append('file', file);

    return this.http.post<ResponseData>(
      `documento/${idpaquete}/${iddocumento}/${matricula}`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

}

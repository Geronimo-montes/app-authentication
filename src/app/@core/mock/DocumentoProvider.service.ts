import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  DocumentoModel,
  Idocumento,
  Ipackdocumentacion,
} from "../data/documentoModel";
import { ResponseData } from "../data/headerOptions";

@Injectable()
export class DocumentoProvierService extends DocumentoModel {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }



  public getPaqueteDocumentos$(): Observable<Ipackdocumentacion[]> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}pack-documento/all`,
      this.getOptions()
    ).pipe(map((response) => <Ipackdocumentacion[]>response.data));
  }

  public getPaqueteDocumentosById$(idpaquetedocumentos: number): Observable<Ipackdocumentacion> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}pack-documento/${idpaquetedocumentos}`,
      this.getOptions()
    ).pipe(map((response) => <Ipackdocumentacion>response.data));
  }

  public getDetallePackDocumento$(idpaquete: number): Observable<Idocumento[]> {
    return this.httpClient.get<ResponseData>(
      `${this.baseURL}pack-documento/detalle-paquete/${idpaquete}`,
      this.getOptions()
    ).pipe(map((response) => <Idocumento[]>response.data));
  }

  public updatePaqueteDocumentos$(data: Ipackdocumentacion): Observable<ResponseData> {
    return this.httpClient.put<ResponseData>(
      `${this.baseURL}pack-documento/update`,
      { data: data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public newPaqueteDocumentos$(data: Ipackdocumentacion): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(
      `${this.baseURL}pack-documento/new`,
      { data: data },
      this.getOptions()
    ).pipe(map((response) => response));
  }
}

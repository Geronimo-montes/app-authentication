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
    protected http: HttpClient,
  ) {
    super(http);
  }

  public getPaqueteDocumentos$(): Observable<Ipackdocumentacion[]> {
    return this.http.get<ResponseData>(
      `pack-documento/all`,
      this.getOptions()
    ).pipe(map((response) => <Ipackdocumentacion[]>response.data));
  }

  public getPaqueteDocumentosById$(idpaquetedocumentos: number): Observable<Ipackdocumentacion> {
    return this.http.get<ResponseData>(
      `pack-documento/${idpaquetedocumentos}`,
      this.getOptions()
    ).pipe(map((response) => <Ipackdocumentacion>response.data));
  }

  public getDetallePackDocumento$(idpaquete: number): Observable<Idocumento[]> {
    return this.http.get<ResponseData>(
      `pack-documento/detalle-paquete/${idpaquete}`,
      this.getOptions()
    ).pipe(map((response) => <Idocumento[]>response.data));
  }

  public updatePaqueteDocumentos$(data: Ipackdocumentacion): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `pack-documento/update`,
      { data: data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public newPaqueteDocumentos$(data: Ipackdocumentacion): Observable<ResponseData> {
    return this.http.post<ResponseData>(
      `pack-documento/new`,
      { data: data },
      this.getOptions()
    ).pipe(map((response) => response));
  }

  public entregarDocumento$(file: File, matricula: string, name: string, idpaquete: number, iddocumento: number): Observable<ResponseData> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('matricula', matricula);
    data.append('idpaquete', idpaquete.toString());
    data.append('iddocumento', iddocumento.toString());

    return this.http.post<ResponseData>(
      `pack-documento/upload/${name}`,
      data,
      this.getOptionsFile(),
    ).pipe(map((response) => response));
  }
}

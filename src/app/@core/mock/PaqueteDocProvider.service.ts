import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseData } from "../data/headerOptions";
import { Ipackdocumentacion, PaqueteDocModel } from "../data/paqueteDocumentoModel";

@Injectable()
export class PaqueteDocProvierService extends PaqueteDocModel {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public getAllPaquete$(): Observable<Ipackdocumentacion[]> {
    return this.http.get<ResponseData>(
      `pack-documento/get/all`,
      this.getOptions()
    ).pipe(map((response) => <Ipackdocumentacion[]>response.data));
  }

  public getPaqueteById$(idpaquete: number): Observable<Ipackdocumentacion> {
    return this.http.get<ResponseData>(
      `pack-documento/${idpaquete}`,
      this.getOptions()
    ).pipe(map((response) => <Ipackdocumentacion>response.data));
  }

  public newPaquete$(paquete: Ipackdocumentacion): Observable<ResponseData> {

    const data = new FormData();
    data.append('files', paquete.ruta_imagen);
    data.append('nombre', paquete.nombre);
    data.append('descripcion', paquete.descripcion);
    data.append('numero_documentos', paquete.numero_documentos.toString());

    paquete.detalleDocumento.forEach((d) => {
      data.append('files', d.foto_ejemplo);
      data.append('detalle_nombre', d.nombre);
      data.append('detalle_formato', d.formato);
      data.append('detalle_peso_max', d.peso_max.toString());
      data.append('detalle_requerido', d.requerido);
    });

    return this.http.post<ResponseData>(
      `pack-documento/new`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public updatePaquete$(paquete: Ipackdocumentacion): Observable<ResponseData> {

    const data = new FormData();
    data.append('idpaquete', paquete.idpaquete.toString());
    data.append('nombre', paquete.nombre);
    data.append('descripcion', paquete.descripcion);

    return this.http.put<ResponseData>(
      `pack-documento/${paquete.idpaquete}`,
      data,
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public updateEstatusPaquete$(idpaquete: number, estatus: string): Observable<ResponseData> {
    return this.http.put<ResponseData>(
      `pack-documento/${idpaquete}/${estatus}`,
      {},
      this.getOptionsFile()
    ).pipe(map((response) => response));
  }

}

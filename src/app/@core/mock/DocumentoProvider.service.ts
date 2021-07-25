import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Eestatus } from "../data/comonModel";
import { DocumentoModel, Eformato, Erequerido, Idocumento, Ipackdocumentacion } from "../data/documentoModel";
import { DATA } from "./DataDocumento";

@Injectable()
export class DocumentoProvierService extends DocumentoModel {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  private get packs_documentos(): Ipackdocumentacion[] {
    return <Ipackdocumentacion[]>DATA
  }

  public getPacksDocumentos$(): Observable<Ipackdocumentacion[]> {
    return new Observable(obs => obs.next(this.packs_documentos));
  }

  public getDetallePackDocumento$(idpack): Observable<Idocumento[]> {
    return new Observable(
      obs =>
        obs.next(
          this.packs_documentos
            .find(pack => pack.idpaquete === idpack)
            .detalleDocumento
        ));
  }
}
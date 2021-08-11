import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FileModel } from "../data/fileModel";


@Injectable()
export class FileProvierService extends FileModel {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  public getPerfil$(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseURL}file/perfil`,
      this.getOptions()
    ).pipe(map((response) => response));
  }
}
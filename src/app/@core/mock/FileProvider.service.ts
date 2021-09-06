import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FileModel } from "../data/fileModel";
import { ResponseData } from "../data/headerOptions";


@Injectable()
export class FileProvierService extends FileModel {
  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  uploadFile$(file: File, matricula: string, name: string): Observable<ResponseData> {
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.post<ResponseData>(
      `${this.baseURL}file/upload/${matricula}/${name}`,
      data,
    ).pipe(map((response) => response));
  }
}
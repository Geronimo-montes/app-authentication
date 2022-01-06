import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ToastService } from "../utils";
import { FaceIdModel, IFaceId } from "../data/faceId.model";

@Injectable()
export class FaceIdService extends FaceIdModel {

  constructor(
    protected http: HttpClient,
    private toastService: ToastService,
    private router: Router,
  ) {
    super();
  }

  add$(_id: string, files: any[]): Observable<any> {
    const data: FormData = new FormData();
    files.forEach((f) => {
      data.append('files', f);
    })

    return this.http.post<IFaceId>(
      `sign-up/face-id?id=${_id}`,
      data,
    ).pipe(
      map((res: any) => {
        this.toastService
          .info('Face ID registradas en el sistema', res.msg)
        return <IFaceId>res.data
      })
    );
  }

  signIn$(files: any[]): Observable<any> {
    const data: FormData = new FormData();
    files.forEach((f) => {
      data.append('files', f);
    })

    return this.http.post<any>(
      `sign-in/face-id`,
      data,
    ).pipe(
      map((res: any) => {
        this.toastService
          .info(
            'Test Facce ID',
            res.msg
          );
      })
    );
  }
}
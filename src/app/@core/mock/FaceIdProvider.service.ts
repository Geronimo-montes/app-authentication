import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { map } from "rxjs/operators";
import { filter } from "rxjs/operators";
import { concatMap } from "rxjs/operators";
import { takeWhile } from "rxjs/operators";

import { NbAuthResult } from "@nebular/auth";
import { NbAuthService } from "@nebular/auth";
import { NbAuthJWTToken } from "@nebular/auth";

import { ERol } from "../data/user.model";
import { FaceIdModel } from "../data/faceId.model";

@Injectable()
export class FaceIdService extends FaceIdModel {

  constructor(
    protected http: HttpClient,
    private authService: NbAuthService,
    private router: Router,
  ) {
    super(http);
  }

  add$(_id: string, files: any): Observable<any> {
    throw new Error("Method not implemented.");
  }
}
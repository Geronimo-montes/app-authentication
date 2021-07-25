import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Eestatus } from "../data/comonModel";
import { Iunidadacademica, UnidadAcademicaModel } from "../data/unidadAcademicaModel";
import { DATA } from "./DataUnidad";

@Injectable()
export class UnidadProvierService extends UnidadAcademicaModel {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  private get unidades_academicas(): Iunidadacademica[] {
    return <Iunidadacademica[]>DATA;
  }

  public getUnidadesAcademicas$(): Observable<Iunidadacademica[]> {
    return new Observable(obs => obs.next(this.unidades_academicas))
  }
}
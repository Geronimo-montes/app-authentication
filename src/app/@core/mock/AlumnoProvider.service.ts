import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AlumnoModel, Ialumno, IdocumentoEntregado } from "../data/alumnoModel";
import { Idocumento } from "../data/documentoModel";
import { ResponseData } from "../data/headerOptions";
import { DATA, DATA_DOCS_ENTREGAODS } from "./DataAlumno";

@Injectable()
export class AlumnoProvierService extends AlumnoModel {

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  private get alumnos(): Ialumno[] {
    return <Ialumno[]>DATA;
  };

  private get docsentregados(): IdocumentoEntregado[] {
    return <IdocumentoEntregado[]>DATA_DOCS_ENTREGAODS;
  };

  /*******************************************************/

  public getAlumnosByUniidad$(id_unidad: number): Observable<Ialumno[]> {
    return new Observable(obs =>
      obs.next(this.alumnos.filter(a => a.idunidad === id_unidad)));
  }

  public getDocumentacionEntregadaByAlumnoPack$(
    matricula: string,
    idpack: number
  ): Observable<IdocumentoEntregado[]> {
    return new Observable(obs => obs.next(
      this.docsentregados
        .filter(d => d.matricula === matricula)
        .filter(d => d.idpaquete === idpack)
    ))
  }

  public registrarAlumno$($data: Ialumno): Observable<ResponseData> {
    return new Observable(obs => obs.next(
      {
        data: null,
        message: 'Registro de alumno exitoso',
        response: true
      }
    ))
  }

  public actualizarAlumno$($data: Ialumno): Observable<ResponseData> {
    throw new Error("Method not implemented.");
  }

}
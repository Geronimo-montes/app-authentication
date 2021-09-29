import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../data/headerOptions';
import { Iunidadacademica, UnidadAcademicaModel } from '../data/unidadAcademicaModel';

@Injectable()
export class UnidadProvierService extends UnidadAcademicaModel {

  constructor(
    protected http: HttpClient,
  ) {
    super(http);
  }

  public getUnidadesAcademicas$(): Observable<Iunidadacademica[]> {
    return this.http.get<ResponseData>(
      `unidad-academica/get/all`,
      this.getOptions()
    ).pipe(map((response) => <Iunidadacademica[]>response.data));
  }

  public getUnidadAcademicaById$(clave: string): Observable<Iunidadacademica> {
    return this.http.get<ResponseData>(
      `unidad-academica/${clave}`,
      this.getOptions()
    ).pipe(map((response) => <Iunidadacademica>response.data));
  }

  public postUnidadAcademica(unidad: Iunidadacademica): Observable<ResponseData> {
    const data = new FormData();
    data.append('perfil', unidad.perfil);
    data.append('clave', unidad.clave);
    data.append('nombre', unidad.nombre);
    data.append('direccion', unidad.direccion);
    data.append('correo', unidad.correo);
    data.append('telefono', unidad.telefono);

    return this.http.post<ResponseData>(`unidad-academica/${unidad.clave}`, data, this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public putUnidadAcademica$(unidad: Iunidadacademica): Observable<ResponseData> {
    const data = new FormData();
    data.append('clave', unidad.clave);
    data.append('nombre', unidad.nombre);
    data.append('direccion', unidad.direccion);
    data.append('correo', unidad.correo);
    data.append('telefono', unidad.telefono);

    return this.http.put<ResponseData>(`unidad-academica/${unidad.clave}`, data, this.getOptionsFile()
    ).pipe(map((response) => response));
  }

  public putEstatusUnidadAcademica(clave: string, estatus: string): Observable<ResponseData> {
    return this.http.put<ResponseData>(`unidad-academica/${clave}/${estatus}`, {}, this.getOptions()
    ).pipe(map((response) => response));
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';

export abstract class HeaderOption {

  constructor(httpClient: HttpClient) { }

  get token(): string {
    return JSON.parse(localStorage.getItem('auth_app_token')).value;
  }

  /**
   * Header para piticiones con cuerpo en formato Json
   * @returns {HttpHeaders} con el token de autenticación
   */
  protected getOptions() {
    console.log(`FROM HEARDER --> ${this.token}`)
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  protected getOptionsFile() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  /**
   * Headers para la subida de archivos al servidor
   * @returns {HttpHeaders} headers de tipo from-data
   */
  protected getOptionsFormData() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  protected http: HttpClient;
}

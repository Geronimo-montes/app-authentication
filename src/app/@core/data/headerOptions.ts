import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * @interface ResponseData: Objeto que representa la estructura de respuesta de la api control-documentacion. 
 * @var data: Objeto que varia en su tipo, representa la data que retorna la api-control-documentacion. Su valor puede ser null en algunos casos.
 * @var response: resultado de la consulta.
 * @var message: Mensaje de tipo string. Puede ser null.
 */
export interface ResponseData {
  data: any;
  response: boolean;
  message: string;
}

export abstract class HeaderOption {
  protected http: HttpClient;
  protected baseURL: string = environment.API_URL;

  constructor(httpClient: HttpClient) { }

  get token(): string {
    return JSON.parse(localStorage.getItem('auth_app_token')).value;
  }

  /**
   * 
   * @returns HeadersHTTP con el token de autenticación
   */
  protected getOptions() {
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
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }
}

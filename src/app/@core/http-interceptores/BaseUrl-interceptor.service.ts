import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Interceptor de peticciones http. Verifica que la peticion a realizar contenga la url base de la api.
 * Perimero verifica si el enlace de la peticion inicia con 'http' ó 'https' 
 * Si conhincide retrona la url tal y como esta
 * De lo contrario agrega la urlbase registrada en el archivo enviroments
 */
@Injectable()
export class BaseURLInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
			const url = `${environment.API_URL}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
			req = req.clone({ url });
		}
		return next.handle(req);
	}
}
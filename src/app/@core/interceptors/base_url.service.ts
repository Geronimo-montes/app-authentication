import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Interceptor que inyecta la URL base (enviroment.ts) para las peticiones a la API.
 * TODO: ADD Interceptors: *Bearer Token
 * 
 * @class BaseURLInterceptor
 * @implements HttpInterceptor
 */
@Injectable()
export class BaseURLInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler,) {
		if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
			const url = `${environment.API_URL}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
			req = req.clone({ url });
		}
		return next.handle(req);
	}
}
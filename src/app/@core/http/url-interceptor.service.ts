import { Observable } from 'rxjs';
// 
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
// 
import { environment } from '../../../environments/environment';

/**
 * Interceptor que inyecta la URL base (enviroment.ts) para las peticiones a la API.
 * 
 * @class BaseURLInterceptor
 * @implements HttpInterceptor
 */
@Injectable()
export class URLInterceptorService implements HttpInterceptor {

	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
			const url = `${environment.API_URL}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
			req = req.clone({ url });
		}
		return next.handle(req);
	}
}
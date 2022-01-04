import { Observable } from 'rxjs';
// 
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';

/**
 * Agrega la autenticacion Bearer token a las cabeceras HTTP
 * 
 * @class AuthInterceptorService
 * @implements HttpInterceptor
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
	constructor() { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		// Excluimos el metodo de inicio de sesion ya que no requiere autenticacion del tipo bearer
		if (req.url.indexOf('sign-in/user-credentials') > -1)
			return next.handle(req);

		const token: string = JSON.parse(localStorage.getItem('auth_app_token')).value


		req = req.clone({
			setHeaders: {
				authorization: `Bearer ${token}`
			}
		});


		return next.handle(req);
	}
}
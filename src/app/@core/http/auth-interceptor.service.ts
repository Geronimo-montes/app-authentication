import { Observable } from 'rxjs';
// 
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Rutas que no requieren autorizacion `Bearer Token`
 */
const AUTH_BEARER_REQUIRE = [
	'sign-up/admin',
	'sign-up/user-credentials',
	'sign-up/face-id',
	'user/all',
	'user'
]

/**
 * Rutas con archivos Content-Type: Multipart/form-data
 */
const BODY_FORM_DATA = [
	'sign-up/face-id',
	'sign-in/face-id',
]


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

		var URL = req.url.replace(environment.API_URL, '')

		if (URL.indexOf('?') > -1) {
			URL = URL.substring(0, URL.indexOf('?'))
		}

		console.log({ URL });

		// AUTORIZACION MEDIANTE BEARER TOKEN
		if (AUTH_BEARER_REQUIRE.includes(URL)) {
			const TOKEN: string = JSON
				.parse(localStorage.getItem('auth_app_token')).value

			if (TOKEN)
				req = req.clone({
					setHeaders: { Authorization: `Bearer ${TOKEN}` }
				});
		}

		// CONTENIDO DE LA PETICION PARA SUBIDA DE ARCHIVOS
		// if (BODY_FORM_DATA.includes(URL)) {
		// 	req = req.clone({
		// 		setHeaders: { 'Content-Type': 'multipart/form-data' }
		// 	})
		// }

		// CONTENIDO DE LA PETICION EN FORMATO JSON
		if (!req.headers.has('Content-Type') && !BODY_FORM_DATA.includes(URL)) {
			req = req.clone({
				setHeaders: { 'Content-Type': 'application/json' }
			})
		}


		// FORMATO DE RESPUESTA DE LA API
		req = req.clone({
			setHeaders: { 'Accept': 'application/json' }
		});

		return next.handle(req);
	}
}
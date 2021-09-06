import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ResponseData } from '../data/headerOptions';
import {
	HttpHandler,
	HttpRequest,
	HttpInterceptor
} from '@angular/common/http';
// import { catchError } from 'rxjs/internal/operators';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
	construct() { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			catchError((error: ResponseData) => {
				// falta tratar el error y mostrarlo en pantalla
				return throwError(`PETICION HTTP: ${error.message}`);
			})
		);
	}
}
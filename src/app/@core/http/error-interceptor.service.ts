import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// 
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { ToastService } from '../utils';
import { EtypeMessage } from '../utils/toast.service';

/**
 * Handdler Error de las peticiones a la api
 * 
 * @class ErrorInterceptorService
 * @implements HttpInterceptor
 */
@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

	constructor(
		private toastService: ToastService,
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.pipe(
				map((event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						console.log(`${event.statusText} ${event.status} ${event.url}`);
					}
					return event;
				}),
				catchError((error: HttpErrorResponse) => {
					this.toastService.show(
						`${error.error.name}: ${error.error.code}`,
						error.error.message,
						EtypeMessage.DANGER
					);

					return throwError(`PETICION HTTP: ${error.message}`)
				})
			);
	}
}
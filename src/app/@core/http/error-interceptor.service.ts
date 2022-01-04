import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// 
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
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
				catchError(
					(error: any) => {
						const
							TITLE = `${error.error.name}: ${error.error.code}`,
							BODY = error.error.message,
							TYPE = EtypeMessage.DANGER;

						this.toastService.show(TITLE, BODY, TYPE);
						return throwError(`PETICION HTTP: ${error.message}`)
					}
				)
			);
	}
}
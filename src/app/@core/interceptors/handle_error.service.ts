import { Host, Injectable, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
	HttpHandler,
	HttpRequest,
	HttpInterceptor
} from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
	construct() { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req)
			.pipe(
				catchError(
					(error: any) =>
						throwError(`PETICION HTTP: ${error.message}`)
				)
			);
	}
}
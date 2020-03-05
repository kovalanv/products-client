import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, timeout, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ReqResInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {               
                return event;
            }),
            catchError((err: any, caught) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status == 401 && authService.getStoredAuthToken()) {
                        authService.logout();
                        this.router.navigateByUrl('/login');
                    }
                    return throwError(err);
                }
            })
        );
    }
}

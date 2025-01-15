import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('token');
    
    // Add Authorization header only if the request is NOT for login or register
    if (!request.url.includes('/loanapp/login') && 
        !request.url.includes('/loanapp/register') && 
        localToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localToken)
      });
    }

    return next.handle(request);
  }
}

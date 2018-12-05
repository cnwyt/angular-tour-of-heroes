import { AuthService } from '../services/auth.service';
import { HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', "Bearer " + authToken)
    // });
    
    // The practice of cloning a request to set new headers is so common 
    // that there's a setHeaders shortcut for it:
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: "Bearer " + authToken } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
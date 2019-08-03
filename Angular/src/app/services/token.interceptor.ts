import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService, private router: Router, private auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.get();
        const expireDate = this.tokenService.getExpireDate();
        const d: Date = new Date();
        if (token !== null && +expireDate > +d.getTime()) {
            const cloned = request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token)
            });
            return next.handle(cloned);
        } else {
            if(expireDate !== null && +expireDate <= +d.getTime()) {
                console.log('Session expired');
                this.tokenService.remove();
                this.router.navigate(['/login']);
                this.auth.changeAuthStatus(false);
            }
            return next.handle(request);
        }
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | 
  Observable<boolean> | Promise<boolean> {
    // if it returns true, then it can be activated, otherwise it can't
    if(this.Token.loggedIn()) {
      return true;
    } else {
      this.Router.navigateByUrl('/login');
      return false;
    }
  }

  constructor(private Token: TokenService, private Router: Router) { }

}

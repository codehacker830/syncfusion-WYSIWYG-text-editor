import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://localhost:8000/api/login',
    // signup: 'http://localhost:8000/api/signup'
    // login: 'https://control.viacolventoexperience.it/api/login',
    refresh: 'https://control.viacolventoexperience.it/api/refresh',
    logout: 'https://control.viacolventoexperience.it/api/login'
  }

  constructor() { }

  handle(token) {
    this.set(token);
    // console.log(this.isValid());
  }

  set(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    const refreshDate = new Date().getTime() + (1000 * token.refresh_in);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('access_token_expire', expireDate.toString());
    localStorage.setItem('access_token_refresh', refreshDate.toString());
  }

  getRefreshDate() {
    return localStorage.getItem('access_token_refresh');
  }

  getExpireDate() {
    return localStorage.getItem('access_token_expire');
  }

  get() {
    return localStorage.getItem('access_token');
  }

  remove() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expire');
    localStorage.removeItem('access_token_refresh');
  }

  isValid() {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1;
      }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

}

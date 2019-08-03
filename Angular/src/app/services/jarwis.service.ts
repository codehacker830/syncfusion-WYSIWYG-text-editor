import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Subscriber } from 'src/app/Subscriber';
import { Observable } from 'rxjs';
import { Newsletter } from 'src/app/Newsletter';
import { Article } from '../Article';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  // private baseurl = 'http://localhost:8000/api';
  private baseurl = 'https://control.viacolventoexperience.it/api';

  constructor(private http: HttpClient, private Token: TokenService) { }

  // Basic APIs

  login(data) {
    return this.http.post(`${this.baseurl}/login`, data);
  }

  logout() {
    return this.http.post(`${this.baseurl}/logout`, null);
  }

  refresh() {
    const now = new Date().getTime().toString();
    if(now >= localStorage.getItem('access_token_refresh')) {
      return this.http.post(`${this.baseurl}/refresh`, null);
    }
  }

  /*
  signup(data) {
    return this.http.post(`${this.baseurl}/signup`, data);
  }
  */

  // Password reset APIs

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseurl}/sendpasswordresetlink`, data);
  }

  changePassword(data) {
    return this.http.post(`${this.baseurl}/resetpassword`, data);
  }

  // Subscribers APIs

  getSubscribers(): Observable<Subscriber[]> {
    return this.http.get<Subscriber[]>(`${this.baseurl}/subscribers`);
  }

  unsubscribe(data) {
    return this.http.post(`${this.baseurl}/unsubscribe`, data);
  }

  subscribe(data) {
    return this.http.post(`${this.baseurl}/subscribe`, data);
  }

  // Newsletters APIs

  getNewsletterDraft(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.baseurl}/getnewsletterdraft`);
  }

  saveNewsletterDraft(data) {
    return this.http.post(`${this.baseurl}/savenewsletterdraft`, data);
  }

  getNewsletters(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.baseurl}/getnewsletters`);
  }

  sendNewsletter(data) {
    return this.http.post(`${this.baseurl}/sendnewsletter`, data);
  }

  deleteDraft() {
    return this.http.get(`${this.baseurl}/deletedraft`);
  }

  // Blog articles APIs

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseurl}/getallarticles`);
  }

  getArticleDraft(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseurl}/getarticledraft`);
  }

  getArticle(id): Observable<Article> {
    return this.http.get<Article>(`${this.baseurl}/getarticle?id=` + id);
  }

  saveArticleDraft(data) {
    return this.http.post(`${this.baseurl}/savearticledraft`, data);
  }

  publishArticle(data) {
    return this.http.post(`${this.baseurl}/publisharticle`, data);
  }

  deleteArticleDraft() {
    return this.http.get(`${this.baseurl}/deletearticledraft`);
  }

  updateArticle(data) {
    return this.http.post(`${this.baseurl}/updatearticle`, data);
  }

  deleteArticle(data) {
    return this.http.post(`${this.baseurl}/deletearticle`, data);
  }

  // Stats

  getSubscribersStats() {
    return this.http.get(`${this.baseurl}/subscriberstats`);
  }

  getSubscribersStatsGroupBy() {
    return this.http.get(`${this.baseurl}/subscriberstatsgroupby`);
  }

}

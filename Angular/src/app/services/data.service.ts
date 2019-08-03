import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Newsletter } from '../Newsletter';
import { Article } from '../Article';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private router: Router
  constructor() { }

  private newsletter: Newsletter;
  private article: Article;

  setNewsletter(newsletter) {
    this.newsletter = newsletter;
  }

  getNewsletter() {
    const temp = this.newsletter;
    this.clearData();
    return temp;
  }

  setArticle(article) {
    this.article = article;
  }

  getArticle() {
    const temp = this.article;
    this.clearData();
    return temp;
  }

  clearData() {
    this.newsletter = undefined;
    this.article = undefined;
  }

}

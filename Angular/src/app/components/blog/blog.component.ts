import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/Article';
import { JarwisService } from 'src/app/services/jarwis.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public myArticles: Article[];

  constructor(private jarwis: JarwisService,
    private data: DataService,
    private router: Router) { }

  ngOnInit() {
    this.jarwis.refresh();
    this.jarwis.getAllArticles().subscribe(
      data => this.initArticles(data),
      error => console.log(error)
    );
  }

  initArticles(data) {
    this.myArticles = data;
  }

  editArticle(article) {
    this.data.setArticle(article);
    this.router.navigateByUrl('blog/edit');
  }

}

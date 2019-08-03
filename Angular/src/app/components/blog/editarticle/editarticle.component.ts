import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Article } from 'src/app/Article';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.css']
})
export class EditArticleComponent implements OnInit {

  public edited: boolean;

  public myArticle: Article;
  public Editor = ClassicEditor;
  public isDisabled: boolean;

  public title: string;
  public description: string;
  public date: string;

  public some_success: string;
  public some_error: string;

  public config = {
    url: '/springboot/upload',
    maxSize: "3M", 
    useCkfinder: false
  };

  constructor(
    private modalService: NgbModal,
    private data: DataService,
    private router: Router,
    private jarwis: JarwisService) { }

  ngOnInit() {
    this.jarwis.refresh();
    this.edited = false;
    this.myArticle = this.data.getArticle();
    this.title = this.myArticle.title;
    this.description = this.myArticle.description;
    this.date = this.myArticle.created_at;
  }

  openWindow(content) {
    this.modalService.open(content);
  }

  openModalIfEdited(content) {
    if(this.edited) {
      this.modalService.open(content);
    } else {
      this.router.navigateByUrl('/blog');
    }
  }

  hasBeenEdited( { editor }: ChangeEvent ) {
    this.edited = true;
    this.resetMessages();
    this.myArticle.content = editor.getData();
  }

  onFileUploadRequest(event) {
    console.log(event);
  }

  onFileUploadResponse(event) {
    console.log(event);
  }

  deleteArticle() {
    this.modalService.dismissAll();
    this.jarwis.deleteArticle(this.myArticle).subscribe(
      data => this.some_success = 'Articolo cancellato con successo',
      error => this.some_error = 'C\'è stato un problema durante la cancellazione dell\'articolo'
    );
    this.router.navigateByUrl('/blog');
  }

  resetMessages() {
    this.some_error = null;
  }

  updateThisArticle() {
    const temp = this.myArticle;
    temp.description = this.description;
    temp.title = this.title;
    temp.draft = false;
    this.modalService.dismissAll();
    this.resetMessages();
    this.jarwis.updateArticle(temp).subscribe(
      data => this.some_success = 'Articolo aggiornato con successo',
      error => this.some_error = 'C\'è stato un problema durante la pubblicazione dell\'articolo'
    );
    this.edited = false;
  }

}

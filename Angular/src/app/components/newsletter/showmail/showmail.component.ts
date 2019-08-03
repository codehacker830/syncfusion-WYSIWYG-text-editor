import { Component, OnInit, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DataService } from 'src/app/services/data.service';
import { Newsletter } from 'src/app/Newsletter';
import {JarwisService} from "../../../services/jarwis.service";

@Component({
  selector: 'app-showmail',
  templateUrl: './showmail.component.html',
  styleUrls: ['./showmail.component.css']
})
export class ShowMailComponent implements OnInit {

  constructor(private data: DataService, private jarwis: JarwisService) { }

  public sentNewsletter: Newsletter;
  public Editor = ClassicEditor;
  public isDisabled: boolean;
  public editorData: string;
  public object: string;
  public date: string;
  public some_error: string;

  ngOnInit() {
    this.jarwis.refresh();
    this.isDisabled = true;
    this.sentNewsletter = this.data.getNewsletter();
    if (this.sentNewsletter) {
      this.object = this.sentNewsletter.object;
      this.date = this.sentNewsletter.created_at;
      this.editorData = this.sentNewsletter.content;
    } else {
      this.some_error = 'Nessuna mail da visulaizzare, torna indietro';
      this.object = 'Undefined';
      this.date = 'Undefined';
    }
  }

}

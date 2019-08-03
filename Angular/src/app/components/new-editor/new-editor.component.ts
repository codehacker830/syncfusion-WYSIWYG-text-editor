import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { JarwisService } from "../../services/jarwis.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Article } from "../../Article";

@Component({
  selector: 'app-new-editor',
  templateUrl: './new-editor.component.html',
  styleUrls: ['./new-editor.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class NewEditorComponent implements OnInit {

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|',
      'CreateLink', 'Image', '|',
      'Print']
  };

  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };

  public insertImageSettings = {
    display: 'inline',
    allowedTypes: ['.jpeg', '.jpg', '.png'],
    path: null // Specifies the URL of save action that will receive the upload files and save in the server
  };

  constructor(private jarwis: JarwisService, private modalService: NgbModal) { }

  ngOnInit() {
    this.jarwis.refresh();
    this.jarwis.getArticle('10').subscribe(
      success => this.value = success[0].content,
      error => console.log(error)
    );
  }

  public value = "<p>Questo è il nuovo text editor</p>";
  public title: string;
  public description: string;
  /*
  public rteValue1: string = this.rteObj.value;
  public rteValue2: string = this.rteObj.getHtml();
  public rteValue3: string = this.rteObj.contentModule.getText();
  */

  public onChange() {
    console.log("Changed");
    console.log(this.value);
  }

  openWindow(content) {
    this.modalService.open(content);
  }

  public saveContent() {
    const temp = new Article();
    temp.content = this.value;
    temp.description = this.description;
    temp.title = this.title;
    temp.draft = false;
    this.jarwis.saveArticleDraft(temp).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

}

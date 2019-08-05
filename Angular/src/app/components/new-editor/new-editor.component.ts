import { Component, OnInit } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditor, NodeSelection } from '@syncfusion/ej2-angular-richtexteditor';
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
    saveUrl: 'http://localhost:8000/api/uploadEJSImage',
    path: 'http://localhost:8000/uploads/',
    // path: null // Specifies the URL of save action that will receive the upload files and save in the server

  };

  constructor(
    private jarwis: JarwisService, 
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.jarwis.refresh();
    this.jarwis.getArticle('10').subscribe(
      (success: any) => {
        if (success && success.length) this.value = success[0].content
      },
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

  // onToolbarClick(ev, rte: RichTextEditor) {
  //   // console.log(ev, rte)
  //   if (rte.imageModule.dialogObj) {
  //     let selection: NodeSelection = new NodeSelection();
  //     let range = selection.getRange(rte.contentModule.getDocument());
  //     let save: NodeSelection = selection.save(range, rte.contentModule.getDocument());
  //     let selectParent: Node[] = selection.getParentNodeCollection(range);
  //     rte.imageModule.uploadObj.success = function (e: any) {
  //       var url = rte.insertImageSettings.path + e.e.currentTarget.statusText;
  //       var altText = e.e.currentTarget.statusText;
  //       (rte.imageModule as any).uploadUrl = { url: url, selection: save, altText: altText, selectParent: selectParent };
  //     }
  //   }
  // }
  public saveContent() {
    // const editor: any = document.getElementById('defaultRTE');
    // console.log(editor);
    // editor.ej2_instances[0].uploading = function upload(args) { 
    //   // Added updating event on image uploader 
    //   args.currentRequest.setRequestHeader('Authorization', "Bearer ${token}"); // Setting additional headers
    // }
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

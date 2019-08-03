import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JarwisService } from 'src/app/services/jarwis.service';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Newsletter } from 'src/app/Newsletter';

@Component({
  selector: 'app-newmail',
  templateUrl: './newmail.component.html',
  styleUrls: ['./newmail.component.css']
})
export class NewMailComponent implements OnInit {

  public edited: boolean;

  public myNewsletters: Newsletter[];

  public editorData: string;

  public Editor = ClassicEditor;
  public savedDraft = null;
  public newsletterSent = null;
  public newsletterPending = null;
  public some_error = null;
  public isDraft: boolean;

  public subject: string;

  constructor(
    private jarwis: JarwisService,
    private modalService: NgbModal,
    private router: Router) { }

  initDataDraft(data) {
    this.myNewsletters = data;
    if (this.myNewsletters.length) {
      this.isDraft = true;
    } else {
      const temp = new Newsletter(undefined, undefined, undefined, true, '<p>Ciao chiunque tu sia!<br>Buona scrittura ;)</p>');
      this.myNewsletters[0] = temp;
      this.isDraft = false;
    }
  }

  initErrorDraft(error) {
    this.some_error = error;
    this.editorData = '<p>Ciao chiunque tu sia!<br>Buona scrittura ;)</p>';
    this.isDraft = false;
  }

  ngOnInit() {
    this.jarwis.refresh();
    this.jarwis.getNewsletterDraft().subscribe(
      data => this.initDataDraft(data),
      error => this.initErrorDraft(error)
    );
    this.subject = '[nessun oggetto]';
  }

  openWindow(content) {
    this.modalService.open(content);
  }

  resetMessages() {
    this.savedDraft = null;
    this.newsletterSent = null;
    this.some_error = null;
    this.newsletterPending = null;
  }

  hasBeenEdited( { editor }: ChangeEvent ) {
    this.edited = true;
    this.resetMessages();
    this.myNewsletters[0].content = editor.getData();
  }

  openModalIfEdited(content) {
    if (this.edited) {
      this.modalService.open(content);
    } else {
      this.router.navigateByUrl('/newsletter');
    }
  }

  openModalDeleteDraft(content) {
    if (this.isDraft) {
      this.modalService.open(content);
    }
  }

  handlingSendEmailSuccess(data) {
    this.resetMessages();
    this.newsletterSent = 'Newsletter spedita con successo';
  }

  handlingSendEmailError(error) {
    this.resetMessages();
    this.some_error = 'C\'è stato un problema durante l\'invio della newsletter';
  }

  sendAllEmails() {
    const temp = this.myNewsletters[0];
    temp.object = this.subject;
    temp.draft = false;
    this.modalService.dismissAll();
    this.resetMessages();
    this.newsletterPending = 'Invio in corso...';
    this.jarwis.sendNewsletter(temp).subscribe(
      data => this.handlingSendEmailSuccess(data),
      error => this.handlingSendEmailError(error)
    );
    this.edited = false;
  }

  handlingDraftSuccess(data) {
    this.savedDraft = 'Bozza salvata con successo';
  }

  handlingDraftError(error) {
    this.some_error = 'C\'è stato un problema durante il salvataggio della bozza';
  }

  saveDraft() {
    const temp = this.myNewsletters[0];
    this.jarwis.saveNewsletterDraft(temp).subscribe(
      data => this.handlingDraftSuccess(data),
      error => this.handlingDraftError(error)
    );
    this.resetMessages();
    this.edited = false;
    this.isDraft = true;
  }

  deleteDraftFromServer() {
    this.jarwis.deleteDraft().subscribe(
      data => this.savedDraft = 'Bozza eliminata con successo',
      error => this.some_error = 'C\'è stato un problema durante la cancellazione della bozza'
    );
    this.modalService.dismissAll();
    this.edited = false;
    this.router.navigateByUrl('/newsletter');
  }

}

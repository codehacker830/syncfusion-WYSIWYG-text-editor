import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
// import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-newsletter',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  public form = {
    name: null,
    email: null
  };

  public error = null;
  public success = null;

  constructor(private Jarwis: JarwisService /*, private Notify: SnotifyService */) { }

  ngOnInit() {}

  onSubmit() {
    // this.Notify.info('Wait...', {timeout: 2000});
    this.Jarwis.subscribe(this.form).subscribe(
      data => this.success = 'Iscrizione alla newsletter avvenuta con successo',
      error => this.error = 'C\'è stato un problema durante l\'iscrizione alla newsletter'
    );
  }

}

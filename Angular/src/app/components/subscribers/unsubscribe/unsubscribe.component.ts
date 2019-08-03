import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
// import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-newsletter',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  public form = {
    email: null
  };

  public error = null;
  public success = null;

  constructor(private Jarwis: JarwisService /*, private Notify: SnotifyService */) { }

  ngOnInit() {}

  onSubmit() {
    // this.Notify.info('Wait...', {timeout: 2000});
    this.Jarwis.unsubscribe(this.form).subscribe(
      data => this.success = 'Cancellazione dalla newsletter avvenuta con successo',
      error => this.error = 'C\'è stato un problema durante la cancellazione dalla newsletter'
    );
  }

}

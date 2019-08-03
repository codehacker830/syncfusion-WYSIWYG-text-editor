import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from '../../../services/jarwis.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error = [];

  public errors = null;
  public success = null;
  public pwderror = null;

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  constructor(
    private route: ActivatedRoute,
    private jarvis: JarwisService,
    private router: Router) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token'];
    });
  }

  handlingSuccess(success) {
    this.success = success.success;
  }

  handlingError(error) {
    if (error.error.error) {
      this.errors = error.error.error;
    } else {
      this.pwderror = 'I dati inseriti non sono validi';
    }
  }

  onSubmit() {
    this.jarvis.changePassword(this.form).subscribe(
      // perché mi da errore? quando faccio submit è giusto!
      data => this.handlingSuccess(data),
      error => this.handlingError(error)
    );
  }

  ngOnInit() {
  }

}

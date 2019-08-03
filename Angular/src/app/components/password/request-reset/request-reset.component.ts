import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../../services/jarwis.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  public error = null;
  public success = null;

  constructor(private Jarwis: JarwisService) { }

  ngOnInit() { }

  onSubmit() {
    this.Jarwis.sendPasswordResetLink(this.form).subscribe(
      data => this.handlingResponse(data),
      error => this.error = error.error.error
    );
  }

  handlingResponse(response) {
    this.success = response.success;
    this.form.email = null;
  }

}

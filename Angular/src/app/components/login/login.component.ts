import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;
  public success = null;

  constructor(
    private jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService) { }

  onSubmit() {
    this.jarwis.login(this.form).subscribe(
      data => this.handlingResponse(data),
      error => this.handlingError(error)
    );
  }

  setError(error) {
    this.error = error;
  }

  setSuccess(success) {
    this.success = success;
  }

  handlingResponse(data) {
    this.token.handle(data);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/blog');
    // window.location.reload();
  }

  handlingError(error) {
    this.error = error.error.error;
    // this.error = error.error;
  }

  ngOnInit() { }

}

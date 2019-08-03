import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  public error = [];

  constructor(private Jarwis: JarwisService,
    private Token: TokenService,
    private Router: Router,
    private Auth: AuthService) { }

  onSubmit() {
    return this.Jarwis.signup(this.form).subscribe(
      data => this.handlingResponse(data),
      error => this.handlingError(error)
    );
  }

  handlingResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.Router.navigateByUrl('/profile');
  }

  handlingError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;
  public navbarOpen = false;
  // public countdown: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private token: TokenService,
    private jarwis: JarwisService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn = value);
    // this.countdown = this.token.getExpireDate();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  removeToken() {
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.token.remove();
    this.navbarOpen = !this.navbarOpen;
  }

  logout(Event: MouseEvent) {
    event.preventDefault();
    this.jarwis.logout().subscribe(
      data => this.removeToken(),
      error => this.removeToken()
    );
  }

}

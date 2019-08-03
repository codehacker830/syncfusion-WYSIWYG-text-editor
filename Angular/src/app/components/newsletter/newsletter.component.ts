import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { DataService } from 'src/app/services/data.service';
import { Newsletter } from 'src/app/Newsletter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  public myNewsletters: Newsletter[];

  constructor(private jarwis: JarwisService,
    private data: DataService,
    private router: Router) { }

  ngOnInit() {
    this.jarwis.refresh();
    this.jarwis.getNewsletters().subscribe(
      data => this.initNewsletters(data),
      error => console.log(error)
    );
  }

  initNewsletters(data) {
    this.myNewsletters = data;
  }

  showMail(newsletter) {
    this.data.setNewsletter(newsletter);
    this.router.navigateByUrl('newsletter/show');
  }

}

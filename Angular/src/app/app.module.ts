import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // always from /common/

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './services/token.interceptor';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { NewArticleComponent } from './components/blog/newarticle/newarticle.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { BlogComponent } from './components/blog/blog.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { NewMailComponent } from './components/newsletter/newmail/newmail.component';
import { EditArticleComponent } from './components/blog/editarticle/editarticle.component';
import { UnsubscribeComponent } from './components/subscribers/unsubscribe/unsubscribe.component';
import { SubscribeComponent } from './components/subscribers/subscribe/subscribe.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ShowMailComponent } from './components/newsletter/showmail/showmail.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { ChartsModule } from 'ng2-charts';
import { NgPipesModule } from 'ngx-pipes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // for Bootstrap Angular

// Il prossimo da rimuovere
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NewEditorComponent } from './components/new-editor/new-editor.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    // SignupComponent,
    NewArticleComponent,
    RequestResetComponent,
    ResponseResetComponent,
    BlogComponent,
    SubscribersComponent,
    NewMailComponent,
    EditArticleComponent,
    UnsubscribeComponent,
    SubscribeComponent,
    NewsletterComponent,
    ShowMailComponent,
    NewEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    // for Bootstrap
    NgbModule,
    // for Font Awesome Icons
    AngularFontAwesomeModule,
    // text editor inside the dashboard
    CKEditorModule,
    // Chart.JS module for amazing charts
    // ChartsModule,
    // ng2-pipes for sanitification
    NgPipesModule,
    ReactiveFormsModule,
    RichTextEditorModule
  ],
  providers: [
    // in order to use JWT for API with auth restriction
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { NewArticleComponent } from './components/blog/newarticle/newarticle.component';
import { BlogComponent } from './components/blog/blog.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { NewMailComponent } from './components/newsletter/newmail/newmail.component';
import { EditArticleComponent } from './components/blog/editarticle/editarticle.component';
import { UnsubscribeComponent } from './components/subscribers/unsubscribe/unsubscribe.component';
import { SubscribeComponent } from './components/subscribers/subscribe/subscribe.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ShowMailComponent } from './components/newsletter/showmail/showmail.component';
import { NewEditorComponent } from './components/new-editor/new-editor.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  /*
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  */
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'blog/new',
    component: NewArticleComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'blog/edit',
    component: EditArticleComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'newsletter',
    component: NewsletterComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'newsletter/new',
    component: NewMailComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'newsletter/show',
    component: ShowMailComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'subscribers',
    component: SubscribersComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'subscribe',
    component: SubscribeComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'newsletter/show',
    component: ShowMailComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'neweditor',
    component: NewEditorComponent,
    canActivate: [AfterLoginService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  declarations: []
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS,HttpClientModule }    from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { HomeComponent } from './home/home.component';

import { NotfoundComponent } from './notfound/notfound.component';

import { ForumComponent } from './forum/forum.component';

import { ProfileComponent } from './profile/profile.component';

import { SettingsComponent } from './profile/settings/settings.component';
import { DeactivateComponent } from './profile/settings/deactivate/deactivate.component';
import { TopicViewComponent } from './forum/topicView/topicView.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './post/post.component';
import { TopicComponent } from './topic/topic.component';
import { ModalComponent } from './modal/modal.component';
import { TermsComponent } from './terms/terms.component';
import { AboutComponent } from './about/about.component';
import { ProfileSettingsComponent } from './profile/settings/profile-settings/profile-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForumComponent,
    ProfileComponent,
    SettingsComponent,
    NotfoundComponent,
    DeactivateComponent,
    TopicViewComponent,
    PostComponent,
    TopicComponent,
    ModalComponent,
    TermsComponent,
    AboutComponent,
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

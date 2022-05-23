import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { NavbarComponent } from './core/navbar/navbar/navbar.component';
import { SharedButtonComponent } from './shared/components/button/shared-button/shared-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{authInterceptorProviders} from './core/interceptors/auth-interceptor.service'
import {CommentService}from './core/services/comment.service';
import { AdminModule } from './modules/admin/admin.module';
import { CreatorModule } from './modules/creator/creator.module';
import {DropdownModule} from 'primeng/dropdown';
import { ContactUsComponent } from './modules/contact-us/contact-us.component';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SharedButtonComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AuthenticationModule,
    CampaignsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    RouterModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AdminModule,
    CreatorModule,
    DropdownModule,
    ToastModule

  
    

    
  ],
  exports:[
    NgxPaginationModule,


  ],

  providers: [
    authInterceptorProviders,
    CommentService,
  ],
  

  bootstrap: [AppComponent]
})
export class AppModule { }

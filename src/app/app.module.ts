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



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    SharedButtonComponent,
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

    
  ],
  exports:[
    NgxPaginationModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

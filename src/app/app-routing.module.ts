import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './modules/authentication/signin/signin.component';
import { SignupComponent } from './modules/authentication/signup/signup.component';
import { ListOfCampaignsComponent } from './modules/campaigns/list-of-campaigns/list-of-campaigns.component';
import { SingleCampaignPageComponent } from './modules/campaigns/single-campaign-page/single-campaign-page.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

const routes: Routes = [
  {path:'home',component:HomePageComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'allcampaigns', component:ListOfCampaignsComponent},
  {path:'campaign/:id',component:SingleCampaignPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

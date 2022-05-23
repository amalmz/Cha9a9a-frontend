import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBoardComponent } from './modules/admin/admin-board/admin-board.component';
import { CampaignListComponent } from './modules/admin/campaign-list/campaign-list.component';
import { CategoriesComponent } from './modules/admin/categories/categories.component';
import { UsersBoardComponent } from './modules/admin/users-board/users-board.component';
import { SigninComponent } from './modules/authentication/signin/signin.component';
import { SignupComponent } from './modules/authentication/signup/signup.component';
import { VerifyEmailComponent } from './modules/authentication/verify-email/verify-email.component';
import { ListOfCampaignsComponent } from './modules/campaigns/list-of-campaigns/list-of-campaigns.component';
import { SingleCampaignPageComponent } from './modules/campaigns/single-campaign-page/single-campaign-page.component';
import { ContactUsComponent } from './modules/contact-us/contact-us.component';
import { CreateCampaignComponent } from './modules/creator/create-campaign/create-campaign.component';
import { CreatorBoardComponent } from './modules/creator/creator-board/creator-board.component';
import { MyCampaignsComponent } from './modules/creator/my-campaigns/my-campaigns.component';
import { HomePageComponent } from './modules/home/home-page/home-page.component';

const routes: Routes = [
  {path:'home',component:HomePageComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'verify',component:VerifyEmailComponent},
  {path:'allcampaigns', component:ListOfCampaignsComponent},
  {path:'campaign/:id',component:SingleCampaignPageComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'admin',component:AdminBoardComponent,
   children:[{
     path:'users',
     component:UsersBoardComponent
   },
  {
    path:'campaigns',
    component:CampaignListComponent
  },
  {
    path:'category',
    component:CategoriesComponent
  }
]},
{path:'creator',component:CreatorBoardComponent,
  children:[{
    path:'MyCampaigns',
    component:MyCampaignsComponent
  },
  {
    path:'create',
    component:CreateCampaignComponent
  }
]},
{ path: '**', redirectTo: 'home' },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfCampaignsComponent } from './list-of-campaigns/list-of-campaigns.component';
import { SingleCampaignPageComponent } from './single-campaign-page/single-campaign-page.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ListOfCampaignsComponent,
    SingleCampaignPageComponent
  ],
  imports: [
    CommonModule,
    InputTextareaModule,
    NgxPaginationModule
  ]
})
export class CampaignsModule { }

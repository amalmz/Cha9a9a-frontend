import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CreatorBoardComponent } from './creator-board/creator-board.component';


@NgModule({
  declarations: [
    CreateCampaignComponent,
    SideBarComponent,
    CreatorBoardComponent
  ],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    PanelMenuModule
  ]
})
export class CreatorModule { }

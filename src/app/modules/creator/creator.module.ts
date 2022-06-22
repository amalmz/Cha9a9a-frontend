import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CreatorBoardComponent } from './creator-board/creator-board.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyCampaignsComponent } from './my-campaigns/my-campaigns.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {EditorModule} from 'primeng/editor';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateCampaignComponent,
    SideBarComponent,
    CreatorBoardComponent,
    MyCampaignsComponent,
    
  ],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    PanelMenuModule,
    NgxPaginationModule,
    InputNumberModule,
    EditorModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CreatorModule { }

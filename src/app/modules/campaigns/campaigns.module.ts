import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfCampaignsComponent } from './list-of-campaigns/list-of-campaigns.component';
import { SingleCampaignPageComponent } from './single-campaign-page/single-campaign-page.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { NgxPaginationModule } from 'ngx-pagination';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import {DropdownModule} from 'primeng/dropdown';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import {DividerModule} from 'primeng/divider';
import { HttpClientModule } from '@angular/common/http';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ListOfCampaignsComponent,
    SingleCampaignPageComponent,
    FilterPipe,

  ],
  imports: [
    CommonModule,
    InputTextareaModule,
    NgxPaginationModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    DividerModule,
    HttpClientModule,
    InputNumberModule
  ],
  exports:[
    ListOfCampaignsComponent,
    SingleCampaignPageComponent,
  ]
})
export class CampaignsModule { }

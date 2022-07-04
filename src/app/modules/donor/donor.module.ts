import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationComponent } from './participation/participation.component';
import { DonorBoardComponent } from './donor-board/donor-board.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { SideBarComponent } from './side-bar/side-bar.component';
import {TableModule} from 'primeng/table';
import { SendRequestComponent } from './send-request/send-request.component';
import {ToastModule} from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';



@NgModule({
  declarations: [
    ParticipationComponent,
    DonorBoardComponent,
    SideBarComponent,
    SendRequestComponent
    
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule
  ]
})
export class DonorModule { }

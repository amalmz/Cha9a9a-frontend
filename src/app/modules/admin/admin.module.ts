import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelMenuModule} from 'primeng/panelmenu';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UsersBoardComponent } from './users-board/users-board.component';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminBoardComponent,
    SideBarComponent,
    UsersBoardComponent,
    CampaignListComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PanelMenuModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule, 
    FormsModule,
    ReactiveFormsModule ],
    providers: 
    [ MessageService, ConfirmationService]

})

export class AdminModule { }

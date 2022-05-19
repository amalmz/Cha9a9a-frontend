import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Campaign } from 'src/app/core/models/campaign';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  Campaigns:Campaign[]=[] ;
  campaignDialog!: boolean;
  campaign!: Campaign;
  selectedCampaign!: Campaign[] | null;
  submitted!: boolean;
  page!: number;
  limit!: number ;
  constructor(private campaignService :CampaignService,
  private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCampaigns();
  }
  public getCampaigns(): void {
   this.campaignService.getCampaigns(this.page,this.limit).subscribe(
      (response: any) => {        
        this.Campaigns = response["data"];
        console.log('campaaigns',this.Campaigns)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )}

    openNew() {
      this.campaign;
      this.submitted = false;
      this.campaignDialog = true;
  }
  public onDeleteCampaign(id:string): void {
    this.campaignService.deleteCampaignId(id).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
deleteCampaign(campaign: Campaign,id:string) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + campaign.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.Campaigns = this.Campaigns.filter(val => val._id !== campaign._id);
          id!=campaign._id;
          this.onDeleteCampaign(id);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}

hideDialog() {
  this.campaignDialog = false;
  this.submitted = false;
}
findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.Campaigns.length; i++) {
      if (this.Campaigns[i]._id === id) {
          index = i;
          break;
      }
  }

  return index;
}
getEventValue($event:any) :string {
  return $event.target.value;
} 
}

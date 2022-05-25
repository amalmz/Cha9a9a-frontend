import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Campaign } from 'src/app/core/models/campaign';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
statu = "Waiting";
Campaigns:Campaign[]=[] ;
campaignDialog!: boolean;
campaign!: Campaign;
selectedCampaign!: Campaign[] | null;
submitted!: boolean;
status?:string;
  constructor(private campaignService :CampaignService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCampaigns();
  }
  public getCampaigns(): void {
    this.campaignService.getCampaignByStatus(this.statu).subscribe(
       (response: any) => {        
         this.Campaigns = response["data"];
         console.log('campaaigns',this.Campaigns)
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     )}
     openNew() {
      this.campaign={};
      this.submitted = false;
      this.campaignDialog = true;
  }
  public onUpdateCampaign(id:string,status:string): void {
    this.campaignService.updateCampaignEtat(id,status).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
AcceptCampaign(campaign: Campaign,id:string) {
  const accept = '{"status":"Accept"}'
  const status = JSON.parse(accept);
  this.confirmationService.confirm({
      message: 'Do you want to accept this campaign?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.Campaigns = this.Campaigns.filter(val => val._id !== campaign._id);
          campaign._id = id;
          console.log("status",status);
          console.log("campaign._id",campaign._id);
          this.onUpdateCampaign(campaign._id,status);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Campaign is Accepted', life: 3000});
      },
      reject: (type:any) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
    },
});
}
RejectCampaign(campaign: Campaign,id:string) {
  const reject = '{"status":"Reject"}'
  const status = JSON.parse(reject);
  this.confirmationService.confirm({
      message: 'Do you want to accept this campaign?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.Campaigns = this.Campaigns.filter(val => val._id !== campaign._id);
          campaign._id = id;
          console.log("status",status);
          console.log("campaign._id",campaign._id);
          this.onUpdateCampaign(campaign._id,status);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Campaign is rejected', life: 3000});
      },
      reject: (type:any) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
    },
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

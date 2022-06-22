import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Campaign } from 'src/app/core/models/campaign';
import { CommentService } from 'src/app/core/services/comment.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { PrimeNGConfig } from 'primeng/api';
import { DataStripeService } from 'src/app/core/services/data-stripe.service';
import { DonationService } from 'src/app/core/services/donation.service';
import { Donation } from 'src/app/core/models/donation';
@Component({
  selector: 'app-single-campaign-page',
  templateUrl: './single-campaign-page.component.html',
  styleUrls: ['./single-campaign-page.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class SingleCampaignPageComponent implements OnInit {
  url="http://localhost:5000/getfile/";
  image:string="";
  @Input() campaign!:Campaign;
  currentUser = false;
  users:any;
  idcreator:any;
  Comments:any[]=[];
  Allcomments:any;
  CommentForm!:FormGroup;
  CommentForm1!:FormGroup;
  donationForm!:FormGroup;
  page: number = 1;
  count: number = 0;
  Size: number = 3;
  Sizes: any = [3, 6, 9, 12];
  displayBasic!: boolean;
  toDisplay:any ={};
  display: boolean = false;
  public href: string = "";
  paymentHandler: any = null;
  success: boolean = false
  failure:boolean = false
  displayModal?: boolean;
  DonorId?:any;
  showForm = true ; 
  donations : any ;
  Donations: any;
  collected = 0 ;
  isReadMore = true

  constructor(private route:ActivatedRoute,private campaignService:CampaignService,private primengConfig: PrimeNGConfig,
   private commentService:CommentService, private token : TokenStorageService,private confirmationService: ConfirmationService,
   private messageService: MessageService, private formBuilder : FormBuilder,private router: Router , private checkout:DataStripeService,
   private donationService:DonationService) { 
     
   }

  ngOnInit(): void {
    this.href ="http://localhost:4200"+ this.router.url;
    let id =this.route.snapshot.params['id']//get the id as a string so we need to add a + to convert it to int
    this.getCampaign(id);
    this.idcreator = this.token.getUser().id;
    this.CommentForm = this.formBuilder.group({
      text: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(100)]),
     })
     this.CommentForm1 = this.formBuilder.group({
      text: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(100)]),
     })
     this.donationForm= this.formBuilder.group({
      donateamount: new FormControl('',[Validators.required])
     })
     this.invokeStripe();
   }
   getURL(){
    this.href ="http://localhost:4200"+ this.router.url;
    console.log(this.href)

   }
   getCampaign(id:string){
    this.campaignService.getCampaignById(id).subscribe((res:any) =>{
      this.campaign=res["data"];
      this.image= res["image"];
      console.log("this is the campaign",this.campaign);
      this.users =this.campaign.created_by;
      console.log("this is the user",this.users)
      this.Comments = this.campaign.comments!.reverse();
      console.log("this is the campaign comments",this.Comments);
      this.donations = this.campaign.donations; 
      console.log("this is the donations",this.donations);
       this.Donations = this.donations.filter((obj:any) => {
        if(obj.status === true){
          this.collected +=  obj.donateamount
        }
       return obj.status === true;
      });
       console.log("this is the donations if it's true",this.Donations);
       console.log("collected",this.collected);

    })
   }

   showText() {
      this.isReadMore = !this.isReadMore
   }

   addComment(){
     const {text}= this.CommentForm.value;
     const user_id = this.token.getUser().id;
     const campaign_id = this.route.snapshot.params['id']
     this.commentService.addComment(text,campaign_id,user_id).subscribe((res:any)=>{
     this.Comments.push();
     this.ngOnInit();

     })
   }
  showBasicDialog() {
    this.displayBasic = true;
}

 showDialog() {
  this.display = true;
 }

  public onDeleteComment(compaignId: string,commentId:string): void {
    this.commentService.deleteComment(compaignId,commentId).subscribe(
      (response: any) => {
        console.log(response);
        this.ngOnInit();
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
  confirm2(commentId:string) {
    const campaign_id = this.route.snapshot.params['id']
    this.confirmationService.confirm({
        message: 'Do you want to delete this comment?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.onDeleteComment(campaign_id,commentId);
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'comment deleted'});
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
        key:"Dialog"
    });
}
onDataChange(event: any) {
  this.page = event;
}
onSizeChange(event: any): void {
  this.Size = event.target.value;
  this.page = 1;
}

public onEdit(commentId:string){
  const {text}= this.CommentForm1.value;
  this.commentService.EditComment(commentId,text).subscribe((response: any) => {
    console.log(response);
  }), 
  (error: any) => {
    alert(error.message);
  }
}
   
toggleData() {
  this.toDisplay = !this.toDisplay;
}
clickCopy(input:any){
  input.select();
  document.execCommand('copy');
  input.setSelectionRange(0, 0);

}
showModalDialog() {
  this.displayModal = true;
}

Donation(){
  const {donateamount} = this.donationForm.value;
  const user_id = this.token.getUser().id;
  const campaign_id = this.route.snapshot.params['id'];
 this.donationService.addDonation(donateamount,campaign_id,user_id).subscribe((response: any) =>{
  console.log(response);
}), 
(error: any) => {
  alert(error.message);
}}


makePayment(amount: any) {
  const {donateamount} = this.donationForm.value;
  const user_id = this.token.getUser().id;
  const campaign_id = this.route.snapshot.params['id'];
 this.donationService.addDonation(donateamount,campaign_id,user_id).subscribe((response: any) =>{
  console.log(response);
  const id = response["data"]._id;
  this.DonorId = id ;
  console.log("l,rebregreg",id)
}), 
(error: any) => {
  alert(error.message);
}
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51KzNmnKxDkYllxSnY8T1eQ3VVZCQp8V7PhMi6XgVPVXXTSUWkMjh7wntkBXISJ6sJ3MrhlSpcnCAjj8F04MAqVgt00pJvQXjT3',
    locale: 'auto',
    token: function (stripeToken: any) {
      console.log(stripeToken);
      paymentstripe(stripeToken);
    },
  }
  );

  const paymentstripe = (stripeToken: any) => {
    this.checkout.makePayment(stripeToken).subscribe((data: any) => {
      console.log(data);
      if (data.data === "success") {
        this.success = true;
        this.donationService.donationStatus(this.DonorId).subscribe((res:any)=>{
            console.log(res);
            this.ngOnInit();
          },
          (error: any) => {
            alert(error.message);
          }        
        )
        this.messageService.add({key: 'myKey1', severity:'success', summary: 'The donation transferred successfully', detail: 'Detail Text'});
      }
      else {
        this.failure = true
        this.messageService.add({severity:'error', summary:'failed', detail:'failed to donate'});

      }
    });
  };

  paymentHandler.open({
    name: 'Donate here',
    description: 'This is a sample pdf file',
    amount: amount * 100,
  });
}

invokeStripe() {
  if (!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement('script');
    script.id = 'stripe-script';
    script.type = 'text/javascript';
    script.src = 'https://checkout.stripe.com/checkout.js'; // library of stripe 
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51KzNmnKxDkYllxSnY8T1eQ3VVZCQp8V7PhMi6XgVPVXXTSUWkMjh7wntkBXISJ6sJ3MrhlSpcnCAjj8F04MAqVgt00pJvQXjT3',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken);
        },
      });
    };

    window.document.body.appendChild(script);
  }
}

}

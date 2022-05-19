import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Campaign } from 'src/app/core/models/campaign';
import { CommentService } from 'src/app/core/services/comment.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {AnyForUntypedForms, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { PrimeNGConfig } from 'primeng/api';

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
  page: number = 1;
  count: number = 0;
  Size: number = 3;
  Sizes: any = [3, 6, 9, 12];
  displayBasic!: boolean;
  toDisplay:any ={};

  constructor(private route:ActivatedRoute,private campaignService:CampaignService,private primengConfig: PrimeNGConfig,
   private commentService:CommentService, private token : TokenStorageService,private confirmationService: ConfirmationService,
   private messageService: MessageService, private formBuilder : FormBuilder) { 
     
   }

  ngOnInit(): void {
    let id =this.route.snapshot.params['id']//get the id as a string so we need to add a + to convert it to int
    this.getCampaign(id);
    this.idcreator = this.token.getUser().id;
    this.CommentForm = this.formBuilder.group({
      text: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(100)]),
     })
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
    })
   }

   addComment(){
     const {text}= this.CommentForm.value;
     const user_id = this.token.getUser().id;
     const campaign_id = this.route.snapshot.params['id']
     this.commentService.addComment(text,campaign_id,user_id).subscribe((res:any)=>{
     this.Comments.push();
     this.ngOnInit();

     })

   
    //  
    //  console.warn(this.comments);
   }
  removeComment(id:number){

  }
  // public getUser(_id:string):void{
  //  this.userService.getUserById(_id).subscribe((res:any)=>{
  //    this.users= res["data"];
  //    console.log("this user is",this.users)

  //  })
  // }
  // public getComments(_id:string){
  //   this.campaignService.getCommentByCampain(_id).subscribe((res:any)=>{
  //   this.Comments=res["data"];
  //     console.log("list of comments",this.Comments)
  //   })

  // }
  // public getComments(_id:string){
  //  this.commentService.getComments(_id).subscribe((res:any)=>{
  //    this.comments = res["data"];
  //    console.log("comments:",this.comments)
  //  })
  // }
  showBasicDialog() {
    this.displayBasic = true;
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
  const {text}= this.CommentForm.value;
  this.commentService.EditComment(text,commentId).subscribe((response: any) => {
    this.Comments.push();
    console.log(response);
  }), 
  (error: any) => {
    alert(error.message);
  }
}
   
   
toggleData() {
  this.toDisplay = !this.toDisplay;
}

}

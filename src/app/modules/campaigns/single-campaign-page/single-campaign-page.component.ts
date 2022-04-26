import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Campaign } from 'src/app/core/models/campaign';
import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { User } from 'src/app/core/models/user';
import { Comment } from 'src/app/core/models/comment';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-single-campaign-page',
  templateUrl: './single-campaign-page.component.html',
  styleUrls: ['./single-campaign-page.component.css']
})
export class SingleCampaignPageComponent implements OnInit {
  url="http://localhost:5000/getfile/";
  image:string="";
  @Input() campaign!:Campaign;
  // comments:any[]=[];
  currentUser: any;
  users!:User;
  idcreator:string="";
  comments:Comment[]=[];
  constructor(private route:ActivatedRoute,private campaignService:CampaignService,private userService:UserService,
   private commentService:CommentService, private token : TokenStorageService) { }

  ngOnInit(): void {
    let id =this.route.snapshot.params['id']//get the id as a string so we need to add a + to convert it to int
    this.campaignService.getCampaignById(id).subscribe((res:any) =>{
      this.campaign=res["data"];
      this.image= res["image"];
      this.idcreator =this.campaign.created_by;
      this.getUser(this.idcreator);
      this.getComments(id);
    })
    // this.currentUser = this.token.getUser();  // to get the current authenticated user 
    // console.log("the user is",this.currentUser)
   }
  // addComment(item:string){
  //   this.comments.push({id:this.comments.length,text:item})
  //   console.warn(this.comments);
  // }
  removeComment(id:number){
    
  }
  public getUser(_id:string):void{
   this.userService.getUserById(_id).subscribe((res:any)=>{
     this.users= res["data"];
     console.log("this user is",this.users)

   })
  }
  public getComments(_id:string){
   this.commentService.getComments(_id).subscribe((res:any)=>{
     this.comments = res["data"];
     console.log("comments:",this.comments)
   })
  } 

}

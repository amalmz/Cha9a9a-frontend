import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { Campaign } from 'src/app/core/models/campaign';
@Component({
  selector: 'app-my-campaigns',
  templateUrl: './my-campaigns.component.html',
  styleUrls: ['./my-campaigns.component.css']
})
export class MyCampaignsComponent implements OnInit {
  user!: User;
  userId:any;
  url="http://localhost:5000/getfile/";
  statuses!: any[];
  state!:Campaign[];
  constructor(private userService:UserService,private token : TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.token.getUser().id;
    this.getUser(this.userId);
    console.log("the user is",this.getUser(this.userId));


  }
    public getUser(_id:string):void{
   this.userService.getUserById(_id).subscribe((res:any)=>{
     this.user= res["data"];
     console.log("this user is",this.user);
     this.state = this.user.campaign!

     console.log("status",this.state)

  }) 
}
}

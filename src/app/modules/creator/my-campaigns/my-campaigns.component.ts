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
  page: number = 1;
  count: number = 0;
  Size: number = 4;
  Sizes: any = [3, 6, 9, 12];

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
onDataChange(event: any) {
  this.page = event;
  this.getUser(this.userId);

}
onSizeChange(event: any): void {
  this.Size = event.target.value;
  this.page = 1;
  this.getUser(this.userId);


}
}

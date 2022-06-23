import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.css']
})
export class ParticipationComponent implements OnInit {
  users: any;
  donation : any ;
  Donations:any;
  constructor(private userService: UserService,private token : TokenStorageService) { }

  ngOnInit(): void {
    this.getUser();
  }
getUser(){
  const user_id = this.token.getUser().id;
  this.userService.getUserById(user_id).subscribe(
    (data:any) => 
    {this.users = data["data"] ;
     console.log(this.users)
     this.donation = this.users.donation;
     console.log("donation",this.donation)
     this.Donations = this.donation.filter((obj:any) => {
      if(obj.status === true){
      }
     return obj.status === true;
    });
  }
  );
}
}

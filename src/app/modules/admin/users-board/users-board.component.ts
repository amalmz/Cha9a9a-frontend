import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-users-board',
  templateUrl: './users-board.component.html',
  styleUrls: ['./users-board.component.css']
})

export class UsersBoardComponent implements OnInit {

    users: User[]=[];
    user!: User;
    first = 0;
    rows = 10;
    Roles:any[]=[];
    userDialog!: boolean;
    submitted!: boolean;

  constructor(private userService: UserService, private messageService: MessageService, 
  private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data:any) => 
      {this.users = data["data"] ;
       console.log(data)
    }
    );
  }
  openNew() {
    this.user;
    this.submitted = false;
    this.userDialog = true;
}
hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.users ? this.first === (this.users.length - this.rows): true;
    }

    isFirstPage(): boolean {
        return this.users ? this.first === 0 : true;
    }
    public onDeleteUser(id:string): void {
      this.userService.deleteUserById(id).subscribe(
        (response: any) => {
          console.log(response);
          this.ngOnInit();
        },
        (error: any) => {
          alert(error.message);
        }
      );
    }
    deleteUser(user: User,id:string) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + user.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.users = this.users.filter(val => val._id !== user._id);
              user._id = id; 
              this.onDeleteUser(user._id);
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
    }
    getEventValue($event:any) :string {
      return $event.target.value;
    } 

}

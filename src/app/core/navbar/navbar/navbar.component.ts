import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../core/services/token-storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  name?: string;
  showCreatorBoard = false;
  showAdminBoard = false;
  showDonorBoard= false ;
  constructor(private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.name=user.name ;
      this.roles = user.roles;
      console.log('role of user is',this.roles)
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCreatorBoard= this.roles.includes('ROLE_CREATOR');
      this.showDonorBoard = this.roles.includes('ROLE_DONOR')
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}

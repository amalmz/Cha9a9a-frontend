import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink:['users']
      },
      {
          label: 'My Campaigns',
          icon: 'pi pi-heart-fill',
          routerLink:['MyCampaigns']
      },
      {
          label: 'Create new Campaign ',
          icon: 'pi pi-box',
          routerLink:['create']
      },
      {
        label: 'Participation',
        icon: 'pi pi-list',
        routerLink:['category']

    },
  ];
  }

}

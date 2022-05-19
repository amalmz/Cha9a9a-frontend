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
          label: 'Users',
          icon: 'pi pi-user',
          routerLink:['users']
      },
      {
          label: 'Campaigns',
          icon: 'pi pi-heart-fill',
          routerLink:['campaigns']
      },
      {
          label: 'Requests',
          icon: 'pi pi-box',
      },
      {
        label: 'categories',
        icon: 'pi pi-list',
        routerLink:['category']

    },
  ];
  }

}

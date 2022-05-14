import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { CampaignService } from 'src/app/core/services/campaign.service';
import { Campaign } from 'src/app/core/models/campaign';
import { Category } from 'src/app/core/models/category';
@Component({
  selector: 'app-list-of-campaigns',
  templateUrl: './list-of-campaigns.component.html',
  styleUrls: ['./list-of-campaigns.component.css']
})
export class ListOfCampaignsComponent implements OnInit {
  label :string=""
  Campaign:Campaign[]=[] ;
  Category:any ;
  selected!:any;
  valueIconRight: any;
  searchkey:string="";
  searchTerm:string="";
  filteredCollect:any[]=[];
  image:string="";
  category:any;
  url="http://localhost:5000/getfile/";
  p: number =1 ;
  term: string="" ; 
  subscription!: Subscription ;
  selectedCampaign!: Campaign;
  page: number = 1;
  limit: number = 9;
  total: number = 0;
  constructor(private route :ActivatedRoute, private campaignService :CampaignService, private categoryService :CategoryService, private router:Router) { }

  functioncall(event: any) {
    console.log('functioncall', event);
  }

  ngOnInit(): void {
    this.getCampaigns();
    this.getCategories();
    this.campaignService.search.subscribe((val:any)=>
      this.searchkey=val)
  }
  public getCampaigns(): void {
    this.subscription = this.campaignService.getCampaigns(this.page,this.limit).subscribe(
      (response: any) => {        
        this.Campaign = response["data"];
        this.image= response["image"];
        this.total= response["total"];
        console.log("total",this.total);
        console.log("campaign",this.Campaign);
        
        this.route.queryParamMap.subscribe(params=>{
          this.category= params.get('category');
          console.log("category",this.category);
          this.filteredCollect = (this.category)? 
          this.filteredCollect.filter(p => p.category && p.category.name=== this.category) : this.Campaign ; //p.category so even if the category is null (bich maya3mach error)
          console.log("filteredCollect",this.filteredCollect);
        });
      //   this.route.queryParamMap.subscribe(params=>{
      //     this.category= params.get('category');
      //    console.log("category",this.category);
      //    this.filteredCollect = (this.category)? 
      //    this.Campaign.filter(p => p.category === this.category.name) : this.Campaign ; //p.category so even if the category is null (bich maya3mach error)
      //    console.log("filteredCollect",this.filteredCollect);
      //  });
      },
      
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); 
  }
  
getPage(event: any) {
  this.page = event;
  this.getCampaigns();
}

  onSelect(campaign:Campaign):void{
    this.selectedCampaign = campaign;
    console.log(campaign._id)
    this.router.navigate(['/campaign/'+ campaign._id]);
  }
  

  public getCategories():void{
    this.categoryService.getCategories().subscribe((response:any)=>{
    this.Category= response["data"];
    })    
  }

  ngOnDestroy() : void{
    this.subscription.unsubscribe(); // bich ki yfirtli mayni7ich il be9i  
  }
  search(event:any){
    this.searchTerm =(event.target as HTMLInputElement).value ; 
    console.log(this.searchTerm);
    this.campaignService.search.next(this.searchTerm);
  }
  //   filter(){
  //   this.filteredCollect = this.category?  this.filteredCollect.filter(p => p.category && p.category.name=== this.category) :  this.filteredCollect ;
  //   //p.category so even if the category is null (bich maya3mach error)
  //    console.log("filteredCollect",this.filteredCollect);
  // }
  
}

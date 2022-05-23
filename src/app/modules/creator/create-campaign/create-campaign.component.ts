import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category'; 
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { CampaignService } from 'src/app/core/services/campaign.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  text?: string;
  value1?:string;
  value2?:string;
  value3?:string;
  uploadedFiles: any[] = [];
  categories!: Category[];
  category!:Category ;
  CampaignForm!:FormGroup ;
  imageData!:string;

  constructor(private messageService: MessageService,private categoryService:CategoryService,
    private fb : FormBuilder,private campaignService:CampaignService,private token : TokenStorageService) { }

  ngOnInit(): void {
    this.getCategories();
    this.CampaignForm= this.fb.group({
       name: new FormControl('',Validators.required),
       objective:new FormControl('',Validators.required),
       category:new FormControl('',Validators.required),
       description:new FormControl('',Validators.required),
       image:new FormControl('',Validators.required),
    })
  }
  onFileSelect(event:any) {
//    const file = event.target.files[0];
//      this.CampaignForm.patchValue({ image: file });
//      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
//       if (file && allowedMimeTypes.includes(file.type)) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imageData = reader.result as string;
//       };
//     reader.readAsDataURL(file);
//  }
     const file = event.target.files[0];
     this.CampaignForm.get('image')?.setValue(file)
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
  createCampaign(){
    const name = this.CampaignForm.get('name')?.value;
    console.log("name",name)
    const objective = this.CampaignForm.get('objective')?.value;
    console.log("objective",objective)
    const category = (this.CampaignForm.get('category')?.value)['_id'];
    console.log("category",category)
    const description = this.CampaignForm.get('description')?.value.replace(/<[^>]+>/g, '');
    console.log("description",description)
    const image = this.CampaignForm.get('image')?.value;
    console.log("image",image)
    const user_id = this.token.getUser().id;
    console.log(user_id)
   this.campaignService.createCampaign(name,objective,category,description,image,user_id).subscribe(
        (response)=>{
            console.log(response);
             this.CampaignForm.reset();
           },
           (err)=>{
             console.log(err)
           }
   )
  }
  getCategories(){
    this.categoryService.getCategories().subscribe((response:any)=>{
      this.categories=response["data"];
      console.log(this.categories);
    })
  }

 

}

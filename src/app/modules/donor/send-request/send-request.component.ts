import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RequestService } from 'src/app/core/services/request.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.css']
})
export class SendRequestComponent implements OnInit {
  text?: string;
  value1?:string;
  value2?:string;
  value3?:string;
  uploadedFiles: any[] = [];
  RequestForm!:FormGroup ;
  imageData!:string;
  constructor(private messageService: MessageService,
    private fb : FormBuilder,private campaignService:RequestService,private token : TokenStorageService){}
  ngOnInit(): void {
    this.RequestForm= this.fb.group({
       subject: new FormControl('',Validators.required),
       description:new FormControl('',Validators.required),
       id_card:new FormControl('',Validators.required),
    })
  }
  onFileSelect(event:any) {
     const file = event.target.files[0];
     this.RequestForm.get('id_card')?.setValue(file)
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
  createCampaign(){
    const subject = this.RequestForm.get('subject')?.value;
    const description = this.RequestForm.get('description')?.value;
    console.log("description",description)
    const id_card = this.RequestForm.get('id_card')?.value;
    console.log("image",id_card)
    const user_id = this.token.getUser().id;
    console.log(user_id)
   this.campaignService.createCampaign(subject,description,id_card,user_id).subscribe(
        (response)=>{
            console.log(response);
             this.RequestForm.reset();
           },
           (err)=>{
             console.log(err)
           }
   )
  }

}

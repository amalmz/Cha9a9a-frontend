import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SendEmailService } from 'src/app/core/services/send-email.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [MessageService]

})
export class ContactUsComponent implements OnInit {
  formContact!:FormGroup
  email="duetodatasousse@gmail.com"
  constructor(private fb:FormBuilder,private sendEmailService:SendEmailService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.formContact=this.fb.group({
      nom: new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required,Validators.email]),
      subject:new FormControl('', [Validators.required]),
      message:new FormControl('', [Validators.required]),
    })
  }

  OnSubmit(){
    this.sendEmailService.envoyerEmail(this.formContact.value).subscribe(response  =>{
      console.log("the email has been sent " , response);
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Email has been sent', life: 3000});
    (err:any) =>{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: err});
    }
  }) 

  }
}

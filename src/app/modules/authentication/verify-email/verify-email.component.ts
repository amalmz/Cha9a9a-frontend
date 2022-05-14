import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})

export class VerifyEmailComponent implements OnInit {
  errorMessage!:string;
  isSuccessful = false;
  isSignUpFailed = false;
  verifyForm!:FormGroup ;
  obj:{}={}
  constructor(private formBuilder:FormBuilder,private authService :AuthService,
  private route : Router,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.Form();
    this.obj=window.sessionStorage.getItem('auth-user')||{}
  }
Form(){
  this.verifyForm = this.formBuilder.group({
    number1: new FormControl('', [Validators.required]),
    number2: new FormControl ('', [Validators.required]),
    number3: new FormControl ('', [Validators.required]),
    number4: new FormControl ('', [Validators.required]),
  });
}
verify(){
  const user= JSON.parse(this.obj.toString());
  console.log("hello user",user)
  const otp = this.verifyForm.get('number1')?.value + this.verifyForm.get('number2')?.value + this.verifyForm.get('number3')?.value + this.verifyForm.get('number4')?.value ;
  console.log("otp",otp)
  console.log("theeee",user.data._id)
  this.authService.verifyOtp(user.data._id,otp).subscribe(
    response  =>{
      console.log("this is user " , response);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      alert("account is successfuly verified")
      this.route.navigateByUrl("/signin")
      window.sessionStorage.clear();


    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;

    }
  )
}

}

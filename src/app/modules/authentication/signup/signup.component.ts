import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from '../../../core/services/auth.service';
import { MustMatch } from '../../../core/helpers/must-match.validator';
import {Router} from "@angular/router";
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  signUpForm!:FormGroup ;
  selected: string = "";
  show_button: Boolean = false;
  show_eye: Boolean = false;
  
  constructor( private formBuilder : FormBuilder, private router : Router , private authService :AuthService
    ,private tokenStorage:TokenStorageService) {}

  ngOnInit(): void {
    this.signUpForm= this.formBuilder.group({
      lastname:  new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      tel:new FormControl('',Validators.required),
      accept:new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('',[Validators.required]),
    },{
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  onSubmit(): void {
    console.log(this.signUpForm.value);
      const {name,lastname,tel, email, password } = this.signUpForm.value;

    this.authService.register(name,lastname,tel,email, password).subscribe(
      data => {
        this.tokenStorage.saveUser(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/verify']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
 


}

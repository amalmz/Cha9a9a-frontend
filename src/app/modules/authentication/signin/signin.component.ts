import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import {AuthService} from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  show_button: Boolean = false;
  show_eye: Boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userForm!:FormGroup ;
  constructor(private formBuilder:FormBuilder, private authService :AuthService, private tokenStorage:TokenStorageService, private route : Router) { }

  ngOnInit()
  {
    this.userForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl ('', [Validators.required,Validators.email]),
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
  
  onFormSubmit():void {
    const{email,password}= this.userForm.value ;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.route.navigateByUrl("/home").then(() => {
          window.location.reload();
        });
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}

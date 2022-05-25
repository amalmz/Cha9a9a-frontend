import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../services/token-storage.service';
 
const AUTH_API = 'http://localhost:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})

};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  roleAs!: string;

  constructor(private http:HttpClient, private tokenStorage:TokenStorageService) {}
  login(email:string,password:string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }
  register(name:string,lastname:string,tel:number,email:string,password:string): Observable<any>{
     return this.http.post(AUTH_API+'signup',{
      name,
      lastname,
      tel,
      email,
      password
     },httpOptions)
  }
  verifyOtp(userId:String,otp:String){
    return this.http.post(AUTH_API+'verifyOTP',{userId,otp},httpOptions)
  }
  getRole() {
    const user = this.tokenStorage.getUser();
    this.roleAs = user.roles;
    return this.roleAs;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  envoyerEmail(request:any){
    return this.http.post(this.apiServerUrl+"/contact/email", request);
  }
}

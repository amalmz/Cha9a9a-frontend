import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from '../models/request';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  public createCampaign(subject:string,description:string,id_card:string,user_id:string,):Observable<Request>{
    const formData = new FormData();
    formData.append('subject',subject);
    formData.append('description',description);
    formData.append('id_card',id_card);
    formData.append('user_id',user_id)
    console.log(formData)
    return this.http.post<Request>(`${this.apiServerUrl}/request/create`,formData)
  }
  public getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiServerUrl}/request/all`);
  }
}

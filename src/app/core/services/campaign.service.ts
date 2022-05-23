import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/campaign';

@Injectable({
  providedIn: 'root'
})

export class CampaignService {
private apiServerUrl = environment.apiBaseUrl;
public search = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) { }
  
public getCampaigns(page:number,limit:number): Observable<Campaign[]> {
  return this.http.get<Campaign[]>(`${this.apiServerUrl}/campaign/all?page=${page}&limit=${limit}`);
}
public createCampaign(name:string,objective:string,category:string,description:string,image:string,user_id:string,):Observable<Campaign>{
  const formData = new FormData();
  formData.append('name',name);
  formData.append('objective',objective);
  formData.append('category',category);
  formData.append('description',description);
  formData.append('image',image);
  formData.append('user_id',user_id)
  console.log(formData)
  return this.http.post<Campaign>(`${this.apiServerUrl}/campaign/create`,formData)
}
public getCampaignById(id: string): Observable<Campaign> {
  let API_URL = `${this.apiServerUrl}/campaign/${id}`;
  return this.http.get<Campaign>(API_URL);
}
public deleteCampaignId(campaign_id:string):Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/campaign/${campaign_id}`)
}

}

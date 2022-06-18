import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation';
@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public addDonation(donateamount:number,campaign_id:string,user_id:string): Observable<Donation> {
  return this.http.post<Donation>(`${this.apiServerUrl}/donate/${campaign_id}`,{donateamount,user_id});
  }
  public donationStatus(DonorId:string):Observable<Donation>{
    return this.http.put<Donation>(`${this.apiServerUrl}/donate/status`,{DonorId});
  }
}
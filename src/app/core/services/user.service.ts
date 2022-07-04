import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})

};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/users/api/test/admin`);
  }

  getCreatorBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/users/api/test/creator`);
  }

  getDonorBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/users/api/test/user`);
  }
  public UpgradeUser(id:string): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiServerUrl}/users/${id}/upgrade`,httpOptions);
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users/all`,httpOptions);
  }
  public getUserById(id:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/users/${id}`)
  } 
  public deleteUserById(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/users/${id}`)
  }
}

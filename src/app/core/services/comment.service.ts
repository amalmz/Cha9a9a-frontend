import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {AuthInterceptorService} from '../interceptors/auth-interceptor.service';
import { TokenStorageService } from '../services/token-storage.service';
import { HttpRequest } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
})

};
@Injectable({
  providedIn: 'root'
})


export class CommentService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public addComment(text:string,campaign_id:string,user_id:string): Observable<Comment> {
  return this.http.post<Comment>(`${this.apiServerUrl}/comment/${campaign_id}/create`,
  {text,user_id},httpOptions);
  }
  public deleteComment(campaign_id:string,id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/comment/${campaign_id}/${id}`)
  }
  public EditComment(text:string,id:string):Observable<Comment>{
    return this.http.put<Comment>(`${this.apiServerUrl}/comment/${id}`,text)
  }

}

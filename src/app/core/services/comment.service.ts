import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Comment} from '../models/comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getComments(id:string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiServerUrl}/comment/${id}`);
  }
  public addComment(id:string,comment:Comment): Observable<Comment> {
  return this.http.post<Comment>(`${this.apiServerUrl}/${id}/create`,comment);
  }

}

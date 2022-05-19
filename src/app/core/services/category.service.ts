import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiServerUrl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }
  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category`);
  }

  public getCategorie(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiServerUrl}/category/${categoryId}`);
  }

  public deleteCategorie(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/category/${categoryId}`);
  }
  public createCategorie(name:string):Observable<Category>{
    return this.http.post<Category>(`${this.apiServerUrl}/category`,name);
  }

}

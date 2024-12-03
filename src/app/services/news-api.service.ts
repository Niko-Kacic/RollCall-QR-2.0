import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private apiUrl = 'https://news-api-production-12c7.up.railway.app/news'; 

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

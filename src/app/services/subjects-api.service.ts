import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsApiService {

  private apiUrl = 'https://signature-api-production.up.railway.app/courses';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

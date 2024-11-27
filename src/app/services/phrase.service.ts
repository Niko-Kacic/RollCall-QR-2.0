import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Phrase {
  id: number;
  phrase: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhraseService {

  private apiUrl = 'https://phrases-api-production.up.railway.app/phrases'; 

  constructor(private http: HttpClient) { }

  getPhrase(): Observable<Phrase[]> {  
    return this.http.get<Phrase[]>(this.apiUrl);
  }
}

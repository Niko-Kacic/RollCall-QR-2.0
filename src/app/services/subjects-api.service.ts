import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsApiService {

  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateAssistance(subjectId: string, newAssistance: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${subjectId}/asistencias`, { asistencias: newAssistance });
  }

  updateAttendanceRate(subjectId: string, newAttendanceRate: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${subjectId}/attendanceRate`, { attendanceRate: newAttendanceRate });
  }

  updateBoth(subjectId: string, newAssistance: number, newAttendanceRate: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${subjectId}`, { asistencias: newAssistance, attendanceRate: newAttendanceRate });
  }
}

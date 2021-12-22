import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  urlApi = 'http://localhost:3000';
  public readonly schedules = [
    { id: "morning", name: "Buổi sáng (8h00 - 11h30)" },
    { id: "afternoon", name: "Buổi chiều (13h00 - 17h00)" },
    { id: "evening", name: "Buổi tối (18h00 - 20h00)" }
  ]
  constructor(private http: HttpClient) { }

  getService(): Observable<any>{
    return this.http.get<any>(`${this.urlApi}/api/services`);
  }

  sendContact(body): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/email-contact`, body)
  }

  getServiceDetail(id): Observable<any>{
    return this.http.get<any>(`${this.urlApi}/services`, {params: id})
  }
}

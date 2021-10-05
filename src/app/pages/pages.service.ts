import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  urlApi = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getService(): Observable<any>{
    return this.http.get<any>(`${this.urlApi}/services`);
  }
}

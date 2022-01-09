import { Services } from './../common/type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlApi } from '../common/const';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  constructor(private http: HttpClient) { }

  sendContact(body): Observable<any> {
    return this.http.post<any>(`${urlApi}/email-contact`, body)
  }

  createOrder(body):Observable<any> {
    return this.http.post<any>(`${urlApi}/api/orders/create`, body);
  }

}

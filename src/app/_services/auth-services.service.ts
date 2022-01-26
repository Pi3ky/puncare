import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { urlApi } from '../common/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public _USERKEY = 'user';
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(this._USERKEY)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public setCurrentUserValue(currentUser) {
    localStorage.setItem(this._USERKEY, JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }

  createSession(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/users/login`, body);
  }

  logout(body): Observable<any>{
    return this.http.post<any>(`${urlApi}/api/users/logout`, body);
  }

  createUser(body): Observable<any> {
    return this.http.post<any>(`${urlApi}/api/users/create`, body)
  }

  resetPassword(body, id): Observable<any> {
    return this.http.post<any>(`${urlApi}/api/users/${id}/reset-pw`, body)
  }

  forgotPassword(body): Observable<any> {
    return this.http.post<any>(`${urlApi}/api/users/forgot-pw`, body)
  }

  changePassword(body, id): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/users/${id}/change-password`, body)
  }

  updateUser(body, id): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/users/${id}/update-info`, body)
  }
}

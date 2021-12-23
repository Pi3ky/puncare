import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlApi } from '../common/const';
import { Services } from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public services: Services[] = [];
  constructor(private http: HttpClient) { }

  updateService(id, body): Observable<any>{
    return this.http.put<any>(`${urlApi}/api/services/${id}`, body);
  }

}

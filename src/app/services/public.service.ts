import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlApi } from '../common/const';
import { Services } from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public services: Services[] = [];
  constructor(private http: HttpClient) { }

  getServices(param): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/services`, {params: param});
  }

  getServiceDetail(id): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/services/${id}`)
  }

  getProducts(param): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/products`, {params: param});
  }

  getProductsDetail(id): Observable<any>{
    return this.http.get<any>(`${urlApi}/api/products/${id}`)
  }
}

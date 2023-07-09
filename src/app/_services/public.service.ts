import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { urlApi } from '../common/const';
import { District, Province, Services } from '../common/type';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  public services: Services[] = [];
  public dataProvinces: Province[] = [];
  private orderProductSbj: BehaviorSubject<any>;
  public orderProductsObj: Observable<any>;
  STORAGE_KEY = 'orders';
  public readonly schedules = [
    { id: "morning", name: "Buổi sáng (8h00 - 11h30)" },
    { id: "afternoon", name: "Buổi chiều (13h00 - 17h00)" },
    { id: "evening", name: "Buổi tối (18h00 - 20h30)" }
  ]
  constructor(private http: HttpClient) {
    this.orderProductSbj = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem(this.STORAGE_KEY)));
    this.orderProductsObj = this.orderProductSbj.asObservable();
  }

  public get orderProductValue(): any {
    return this.orderProductSbj.value;
  }

  public setOrderProductValue(order) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(order));
    this.orderProductSbj.next(order);
  }

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
    return this.http.get<any>(`${urlApi}/api/products/${id}`);
  }

  getTypeProduct(): Observable<any> {
    return this.http.get<any>(`${urlApi}/api/types`);
  }

  sendContact(body): Observable<any> {
    return this.http.post<any>(`${urlApi}/api/contacts/create`, body);
  }

  getProvinces(): Observable<any> {
    return this.http.get<any>("https://vapi.vnappmob.com/api/province");
  }

  getDistrict(provinceId): Observable<any> {
    return this.http.get<any>(`https://vapi.vnappmob.com/api/province/district/${provinceId}`)
  }

  getWard(districtId): Observable<any> {
    return this.http.get<any>(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
  }

  createQRBanking(body): Observable<any> {
    return this.http.post<any>(`https://api.vietqr.io/v2/generate`, body)
  }

  createOrder(body):Observable<any> {
    return this.http.post<any>(`${urlApi}/api/orders/create`, body);
  }
}

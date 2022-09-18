import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RenewalData } from './renewal-data';

@Injectable({
  providedIn: 'root'
})
export class RenewalService {

  constructor(private http:HttpClient) { }

  getData(){
    let params1 = new HttpParams().set('userId',"1")
    return this.http.get<RenewalData>("https://localhost:4200/renewal-home/api/vk1/policy-id",{params:params1})
  }
}

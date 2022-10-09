import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insurance } from '../insurance';

@Injectable({
  providedIn: 'root'
})
export class CreateInsuranceService {

  constructor(private http: HttpClient) { }
  // baseurl: any = "http://localhost:8080/insurance/api/vk1/life-policy";
<<<<<<< HEAD
   
  baseurl='http://localhost:8080/insurance/api/vk1/life-policy'
=======

  baseurl = 'http://localhost:8080/insurance/api/vk1/life-policy'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
  registerInsurance(insurance: any) {
    return this.http.post<Insurance>(this.baseurl, insurance)
  }
}

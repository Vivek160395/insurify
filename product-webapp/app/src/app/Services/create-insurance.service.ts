import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insurance } from '../insurance';

@Injectable({
  providedIn: 'root'
})
export class CreateInsuranceService {

  constructor(private http: HttpClient) { }
  // baseurl: any = "https://insurify.stackroute.io/insurance/api/vk1/life-policy";
   
  baseurl='https://insurify.stackroute.io/insurance/api/vk1/life-policy'
  registerInsurance(insurance: any) {
    return this.http.post<Insurance>(this.baseurl, insurance)
  }
}

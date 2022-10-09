import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insurance } from '../insurance';

@Injectable({
  providedIn: 'root'
})
export class EditInsuranceService {

  constructor(private http: HttpClient) { }
// baseurl: any = "https://insurify.stackroute.io/insurance/api/vk1/policy-id/";
   
baseurl='https://insurify.stackroute.io/insurance/api/vk1/policy-id/'
  editInsurance() {
    return this.http.get(this.baseurl+localStorage.getItem('editpolicyid'))
  }
}

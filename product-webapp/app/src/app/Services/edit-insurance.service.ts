import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Insurance } from '../insurance';

@Injectable({
  providedIn: 'root'
})
export class EditInsuranceService {

  constructor(private http: HttpClient) { }
<<<<<<< HEAD
<<<<<<< HEAD
// baseurl: any = "http://localhost:8080/insurance/api/vk1/policy-id/";
   
baseurl='http://localhost:8080/insurance/api/vk1/policy-id/'
=======
  // baseurl: any = "http://localhost:8080/insurance/api/vk1/policy-id/";

  baseurl = 'http://localhost:8080/insurance/api/vk1/policy-id/'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
=======
  // baseurl: any = "http://localhost:8080/insurance/api/vk1/policy-id/";

  baseurl = 'http://localhost:8080/insurance/api/vk1/policy-id/'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
  editInsurance() {
    return this.http.get(this.baseurl + localStorage.getItem('editpolicyid'))
  }
}

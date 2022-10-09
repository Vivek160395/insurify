import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {


  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",

    }), responseType: 'text' as 'json'
  };
  customerPolicyId1:string =localStorage.getItem('customerPolicyId')!
  // baseurl: any = "https://insurify.stackroute.io/purchase/api/";
   
    baseurl='https://insurify.stackroute.io/purchase/api/'
  getUserDetails(): Observable<any> {
    console.log(this.customerPolicyId1)
    console.log(localStorage.getItem('customerPolicyId')!)
    return this.http.get(this.baseurl + "get/"+localStorage.getItem('customerPolicyId'));
  }
  putUser = (user: any): Observable<any> => {
    console.log(user)
    return this.http.put(this.baseurl + "claim", user);
  }
  getPolicyDetails(): Observable<any> {
    return this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policy-id/"+localStorage.getItem('insurancePolicyId'))
    // return this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policy-id/"+localStorage.getItem('insurancePolicyId'))

  }

}

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
  customerPolicyId1: string = localStorage.getItem('customerPolicyId')!
  // baseurl: any = "http://localhost:8080/purchase/api/";
<<<<<<< HEAD
   
    baseurl='http://localhost:8080/purchase/api/'
=======

  baseurl = 'http://localhost:8080/purchase/api/'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
  getUserDetails(): Observable<any> {
    console.log(this.customerPolicyId1)
    console.log(localStorage.getItem('customerPolicyId')!)
    return this.http.get(this.baseurl + "get/" + localStorage.getItem('customerPolicyId'));
  }
  putUser = (user: any): Observable<any> => {
    console.log(user)
    return this.http.put(this.baseurl + "claim", user);
  }
  getPolicyDetails(): Observable<any> {
    return this.http.get("http://localhost:8080/insurance/api/vk1/policy-id/" + localStorage.getItem('insurancePolicyId'))
    // return this.http.get("http://localhost:8080/insurance/api/vk1/policy-id/"+localStorage.getItem('insurancePolicyId'))

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RenewalService {

  constructor(private http: HttpClient) { }
  // baseurl='http://localhost:8080/'
<<<<<<< HEAD
<<<<<<< HEAD
  baseurl='http://localhost:8080/'
=======
  baseurl = 'http://localhost:8080/'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
=======
  baseurl = 'http://localhost:8080/'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b

  userPolicyDetails(): Observable<any> {
    return this.http.get(this.baseurl + "purchase/api/get/" + localStorage.getItem('customerPolicyId'));
  }

  getPolicyDetails(): Observable<any> {
    return this.http.get(this.baseurl + "insurance/api/vk1/policy-id/" + localStorage.getItem('insurancePolicyId'));
  }

  updateData(data: any): Observable<any> {
    return this.http.put(this.baseurl + "purchase/api/renew", data);
  }



}

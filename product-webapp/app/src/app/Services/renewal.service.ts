import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RenewalService {

  constructor(private http:HttpClient) { }

  customerPolicyId = "30153117";
  email = "vijayy@gmail.com"

  userPolicyDetails():Observable<any>{
    return this.http.get("http://localhost:8084/api/get/"+this.customerPolicyId);
  }

  getPolicyDetails():Observable<any>{
    return this.http.get("http://localhost:8010/api/vk1/policy-id/189989");
  }

  updateData(data: any): Observable<any>{
    return this.http.put("http://localhost:8084/api/renew",data);
  }

  

}

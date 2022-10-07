import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PolicyAdvsior } from './policy-advsior';

@Injectable({
  providedIn: 'root'
})
export class PolicyAdvisorService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/advisor/"

  baseUrl1 = this.baseUrl + "api/v1/updateDetails/"

  baseUrl2 = this.baseUrl + "api/v1/"

  getUserDetails(): Observable<any> {
    return this.http.get(this.baseUrl2 + "policyAdvisors");
  }

  updateAdvisorDetails(policyAdvisor: PolicyAdvsior, emailId: string, profilePic: File): Observable<Object> {
    const formData = new FormData();
    console.log(policyAdvisor);

    formData.append("updateInfo", JSON.stringify(policyAdvisor));
    formData.append("imageFile", profilePic);
    //return this.http.put(`${this.baseUrl}`,policyAdvisor);
    return this.http.put(this.baseUrl1 + emailId, formData);
  }

  //  updateDetails(info:any):Observable<any>{
  //   return this.http.put(this.baseurl+"updateUserDetails/"+this.email1,info);
  //    }

  url = this.baseUrl + "api/v1/update/"

  updateAdvisorWithoutImage(policyAdvisor: PolicyAdvsior, emailId: string): Observable<Object> {
    console.log(policyAdvisor);
    console.log(emailId);
    return this.http.put(this.url + emailId, policyAdvisor);
  }
  registerNewPolicyAdvisor(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "api/v1/policyAdvisor", data);
  }
}

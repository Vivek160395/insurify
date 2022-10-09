import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {
  userType = localStorage.getItem('UserType');

  constructor(private http: HttpClient) { }
  // basicUrl = "https://insurify.stackroute.io/ /recommendation/Recommendation";
  // policyUrl = "https://insurify.stackroute.io/ /insurance/api/vk1/";
  basicUrl = 'https://insurify.stackroute.io/ /recommendation/Recommendation'
  policyUrl = 'https://insurify.stackroute.io/ /insurance/api/vk1/'
  basicurl = 'https://insurify.stackroute.io/ /'
  getAllInsurances(): Observable<any> {
    return this.http.get<any>(`${this.basicUrl}/Insurances`);
  }
  getInsuranceOnBasisOfType(type: string): Observable<any> {
    return this.http.get(`${this.basicUrl}/${type}/InsuranceByType`);
  }
  getrendingInsurances(): Observable<any> {
    return this.http.get(this.basicUrl + '/TrendingInsurances');
  }
  getAllPolicies(): Observable<any> {
    return this.http.get(this.policyUrl + "/policies/");
  }
  getuserPolicies(userEmail: any): Observable<any> {
    return this.http.get(this.policyUrl + `/policies/${userEmail}`);
  }
  // insurance-details ui code below
  getPolicyDetails(policyId: string): Observable<any> {
    return this.http.get(this.policyUrl + `policy-id/${policyId}`);
  }
  policyNo: any;
  userEmail = localStorage.getItem('logInEmailId');
  getCountOfUsersBoughtInsurance(id: any): Observable<any> {
    return this.http.get(this.basicurl + `purchase/api/get/count/${id}`);
  }
  redirectUrl: any = '';
}


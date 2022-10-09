import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {
  userType = localStorage.getItem('UserType');

  constructor(private http: HttpClient) { }
  // basicUrl = "http://localhost:8080/recommendation/Recommendation";
  // policyUrl = "http://localhost:8080/insurance/api/vk1/";
  basicUrl='http://localhost:8080/recommendation/Recommendation'
  policyUrl='http://localhost:8080/insurance/api/vk1/'
  basicurl='http://localhost:8080/'
  getAllInsurances(): Observable<any> {
    return this.http.get<any>(`${this.basicUrl}/Insurances`);
  }
  getInsuranceOnBasisOfType(type: string): Observable<any> {
    return this.http.get(`${this.basicUrl}/${type}/InsuranceByType`);
  }
  getrendingInsurances(): Observable<any> {
    return this.http.get(this.basicUrl+'/TrendingInsurances');
  }
  getAllPolicies(): Observable<any> {
    return this.http.get(this.basicurl+"insurance/api/vk1/policies/");
  }
  getuserPolicies(userEmail: any): Observable<any> {
    return this.http.get(this.basicurl+'insurance/api/vk1/policies/${userEmail}');
  }
  // insurance-details ui code below
  getPolicyDetails(policyId: string): Observable<any> {
    return this.http.get(this.policyUrl + `policy-id/${policyId}`);
  }
  policyNo: any;
  userEmail = localStorage.getItem('logInEmailId');
  getCountOfUsersBoughtInsurance(id: any): Observable<any> {
    return this.http.get(this.basicurl+`purchase/api/get/count/${id}`);
  }
  redirectUrl: any = '';
}


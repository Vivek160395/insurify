import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {

  constructor(private http: HttpClient) { }
  basicUrl = "http://localhost:9999/Recommendation";
  policyUrl = "http://localhost:8010/api/vk1/";
  getAllInsurances(): Observable<any> {
    return this.http.get<any>(`${this.basicUrl}/Insurances`);
  }
  getInsuranceOnBasisOfType(type: string): Observable<any> {
    return this.http.get(`${this.basicUrl}/${type}/InsuranceByType`);
  }
  getrendingInsurances(): Observable<any> {
    return this.http.get(`http://localhost:9999/Recommendation/TrendingInsurances`);
  }
  getAllPolicies(): Observable<any> {
    return this.http.get("http://localhost:8010/api/vk1/policies");
  }
  // insurance-details ui code below
  getPolicyDetails(policyId: string): Observable<any> {
    return this.http.get(this.policyUrl + `/policy-id/${policyId}`);
  }
  policyNo: any;
  userEmail: any = "gritvik97@gmail.com";
}

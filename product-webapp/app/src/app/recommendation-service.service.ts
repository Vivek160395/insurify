import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {

  constructor(private http:HttpClient) { }
  basicUrl = "http://localhost:9999/Recommendation";
  getAllInsurances():Observable<any>{
    return this.http.get<any>(`${this.basicUrl}/Insurances`);
  }
  getInsuranceOnBasisOfType(type:string):Observable<any>{
    return this.http.get(`${this.basicUrl}/${type}/InsuranceByType`);
  }
  getrendingInsurances():Observable<any>{
    return this.http.get(`http://localhost:9999/Recommendation/TrendingInsurances`);
  }
}

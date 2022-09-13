import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {

  constructor(private http:HttpClient) { }

  getAllInsurances():Observable<any>{
    return this.http.get<any>("http://localhost:9999/Recommendation/Insurances");
  }
}

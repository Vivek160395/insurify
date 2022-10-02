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

  baseUrl = "http://localhost:8087/api/v1/policyAdvisorRating/{emailId}"
  
  updateAdvisorDetails(policyAdvisor: PolicyAdvsior, profilePic:File): Observable<Object>{
    console.log(policyAdvisor);
    return this.http.put(`${this.baseUrl}`,policyAdvisor);
  }

    
}

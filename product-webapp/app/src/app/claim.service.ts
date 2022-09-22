import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  
  constructor(private http:HttpClient) { }
  policyId='P87878';
 
 baseurl:any="http://localhost:8080/api/v1/claim";

  getUserDetails():Observable<any>{
    return this.http.get(this.baseurl+"policyId");
  }
}

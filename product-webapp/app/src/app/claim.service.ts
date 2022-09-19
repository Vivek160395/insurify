import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  
  constructor(private http:HttpClient) { }
  basicUrl = "http://localhost:8080/claim";
  getUserData():Observable<any>{
    return this.http.get<any>(`${this.basicUrl}/policyId`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from './claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
      
    } ),responseType: 'text' as 'json'
  };

 

  customerPolicyId:string="555555"
  baseurl:any="http://localhost:8084/api/";
  getUserDetails():Observable<any>{
    return this.http.get(this.baseurl+"get/"+this.customerPolicyId);
  }
 
  putUser = (user: any): Observable<any> => {
    return this.http.put<any>(this.baseurl+"claim", user);
}
  
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RenewalService {

  constructor(private http:HttpClient) { }

  customerPolicyId = "5032101";
  email = "vivek@gmail.com"

  getData():Observable<any>{
    // let params1 = new HttpParams().set('userId',"1")
    return this.http.get("http://localhost:8084/api/retrieveall/customerinsurances");
  }

  getVehicleData():Observable<any>{
    console.log(this.customerPolicyId)
    return this.http.get("http://localhost:8084/api/retrieveall/customerinsurances");
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RenewalService {

  constructor(private http:HttpClient) { }

  customerPolicyId = "5032102";
  email = "vijayy@gmail.com"

  getData():Observable<any>{
    return this.http.get("http://localhost:8084/api/get/"+this.customerPolicyId);
  }

  getVehicleData():Observable<any>{
    console.log(this.customerPolicyId)
    return this.http.get("http://localhost:8084/api/get/"+this.customerPolicyId);
  }

  getTwoWheelerData(data:any):Observable<any>{
    console.log(this.customerPolicyId)
    return this.http.get("http://localhost:8084/api/get/"+this.customerPolicyId);
  }

  updateData(data: any): Observable<any>{
    return this.http.put("http://localhost:8084/api/renew",data);
  }

}

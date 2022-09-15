import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  email='';

  getUserDetails():Observable<any>{
    return this.http.get("http://localhost:8085/api/v1/users");
  }
  
 updateUserDetails():Observable<any>{
  return this.http.put("http://localhost:8085/api/v1/updateUser/"+this.email,'',);
 }

 


}

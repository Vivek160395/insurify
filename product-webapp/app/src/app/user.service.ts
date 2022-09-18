import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  email='s@gmail.com';
 baseurl:any="http://localhost:8085/api/v1/";

  getUserDetails():Observable<any>{
    return this.http.get(this.baseurl+"users");
  }
  
 updateUserDetails(user:User):Observable<any>{
  return this.http.put(this.baseurl+"updateUser/"+this.email,user);
 }

 


}

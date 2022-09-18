import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  email1='s@gmail.com';
 baseurl:any="http://localhost:8085/api/v1/";

  getUserDetails():Observable<any>{
    return this.http.get(this.baseurl+"users");
  }
  
 updateUserDetails(user:User):Observable<any>{
  return this.http.put(this.baseurl+"updateUser/"+this.email1,user);
 }

 


  baseUrl="http://localhost:8085/api/v1/user";

  // getUserDetails():Observable<any>{
  //   return this.http.get(`${this.baseUrl}`);
  // }
  // email ="gritvik9@gmail.com";


  registerUser(user: User): Observable<Object>{
    console.log(user);
    return this.http.post(`${this.baseUrl}`,user);
  }
}

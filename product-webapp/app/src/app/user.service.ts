import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  email1:string='m@gmail.com';
 
  baseurl:any="http://localhost:8085/api/v1/";
  getUserDetails():Observable<any>{
    return this.http.get(this.baseurl+"users");
  }
  
 updateUserDetails(file:File,info: string ):Observable<any>{
  const formData=new FormData();
  formData.append("userDetails",info);
  formData.append("imageFile",file);
  return this.http.put(this.baseurl+"updateUser/"+this.email1,formData);
 }

 updateDetails(info:any):Observable<any>{
return this.http.put(this.baseurl+"updateUserDetails/"+this.email1,info);
 }

 
  baseUrl="http://localhost:8085/api/v1/user";

  

  registerUser(user: User): Observable<Object>{
    console.log(user);
    return this.http.post(`${this.baseUrl}`,user);
  }

}

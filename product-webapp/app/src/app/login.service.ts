import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient: HttpClient) { }

  baseUrl="http://localhost:8080/";

  loginUser(user:User): Observable<any>{
  //getUserCredentials(user: User):Observable<any>{
   return this.httpClient.post(this.baseUrl+"/loginUser", user);
  }


  getUserDetails(emailId: string): Observable<any>{
  //loginUser(emailId: string): Observable<any>{
    return this.httpClient.get(this.baseUrl+ "/" +{emailId});
  }




}

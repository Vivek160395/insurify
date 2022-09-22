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

<<<<<<< HEAD

  // getUserCredentials(user: User):Observable<any>{
  //  return this.httpClient.get(this.baseUrl+"/loginUser", user);
  // }
=======
  loginUser(user:User): Observable<any>{
  //getUserCredentials(user: User):Observable<any>{
   return this.httpClient.post(this.baseUrl+"/loginUser", user);
  }
>>>>>>> 414e696654338e9048d90bd821f644871d2badf8


  getUserDetails(emailId: string): Observable<any>{
  //loginUser(emailId: string): Observable<any>{
    return this.httpClient.get(this.baseUrl+ "/" +{emailId});
  }




}

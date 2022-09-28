import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  emailId:any;
  password:any;
  constructor(private httpClient: HttpClient) { }

  baseUrl="http://localhost:8080/api/v1";


  getUserCredentials(data:any ):Observable<any>{
    console.log(data);
   return this.httpClient.post(this.baseUrl+"/loginUser",data);
  }

  loginUser(emailId:any): Observable<any>{
    return this.httpClient.get(this.baseUrl+ "/"+emailId);
  }




}

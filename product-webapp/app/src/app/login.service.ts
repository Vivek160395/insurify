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


  // getUserCredentials():Observable<any>{
  //   return this.httpClient.get(this.baseUrl+"/loginUser");
  // }



  loginUser(user:User): Observable<any>{

    
    return this.httpClient.get(this.baseUrl+ "/loginUser");
  }




}

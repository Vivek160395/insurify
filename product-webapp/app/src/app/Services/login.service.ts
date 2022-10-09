import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  emailId: any;
  password: any;
  constructor(private httpClient: HttpClient) { }

  // baseurl = "http://localhost:8080/authentication/api/v2";
<<<<<<< HEAD
  baseurl='http://localhost:8080/authentication/api/v2'
=======
  baseurl = 'http://localhost:8080/authentication/api/v2'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
  getUserCredentials(data: any): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.baseurl + "/loginUser", data);
  }
  loginUser(emailId: any): Observable<any> {
    return this.httpClient.get(this.baseurl + "/" + emailId);
  }
  addNewUser(data: any): Observable<any> {
    return this.httpClient.post(this.baseurl + "/user", data);
  }
  stauts: any = '';
}

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

  // baseurl = "https://insurify.stackroute.io/ /authentication/api/v2";
  baseurl = 'https://insurify.stackroute.io/ /authentication/api/v2'
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

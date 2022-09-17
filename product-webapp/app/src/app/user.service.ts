import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:8085/api/v1/user";

  getUserDetails():Observable<any>{
    return this.http.get(`${this.baseUrl}`);
  }
  email ="gritvik9@gmail.com";


  registerUser(user: User): Observable<Object>{
    console.log(user);
    return this.http.post(`${this.baseUrl}`,user);
  }
}

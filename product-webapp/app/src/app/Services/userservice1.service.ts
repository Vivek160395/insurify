import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Userservice1Service {


  constructor(private httpclient: HttpClient) { }

  //  baseurl="https://insurify.stackroute.io/"
  baseurl = 'https://insurify.stackroute.io/'
  getUser(): Observable<any> {
    return this.httpclient.get<any>(this.baseurl + "user/api/v1/users");
  }
  userEmail: string = "mufees786@gmail.com"
}

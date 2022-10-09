import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Userservice1Service {


  constructor(private httpclient: HttpClient) { }

<<<<<<< HEAD
//  baseurl="http://localhost:8080/"
 baseurl='http://localhost:8080/'
=======
  //  baseurl="http://localhost:8080/"
  baseurl = 'http://localhost:8080/'
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
  getUser(): Observable<any> {
    return this.httpclient.get<any>(this.baseurl + "user/api/v1/users");
  }
  userEmail: string = "mufees786@gmail.com"
}

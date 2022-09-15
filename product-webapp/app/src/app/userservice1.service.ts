import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Userservice1Service {


  constructor(private httpclient:HttpClient) { }

  getUser():Observable<any>{
    return this.httpclient.get<any>("http://localhost:8085/api/v1/users");
    }
    userEmail:string="gritvik97@gmail.com"
}

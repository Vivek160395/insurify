import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  email1 = localStorage.getItem('logInEmailId')?.toString();

  baseurl: any = "http://localhost:8080/user/api/v1/";
  getUserDetails(): Observable<any> {
    return this.http.get(this.baseurl + "users");
  }

  updateUserDetails(file: File, info: string): Observable<any> {
    const formData = new FormData();
    formData.append("userDetails", info);
    formData.append("imageFile", file);
    return this.http.put(this.baseurl + "updateUser/" + this.email1, formData);
  }

  updateDetails(info: any): Observable<any> {
    return this.http.put(this.baseurl + "updateUserDetails/" + this.email1, info);
  }


  baseUrl = "http://localhost:8080/user/api/v1/user";
  baseUrl1 = "http://localhost:8080/user/api/v1";



  registerUser(user: User): Observable<Object> {
    console.log(user);
    return this.http.post("http://localhost:8080/user/api/v1/user", user);
  }

  postUserId(s1: string): Observable<any> {
    return this.http.post("http://localhost:8080/chat/api/userId", s1);

  }

  postAdvisorId(s1: string): Observable<any> {
    return this.http.post("http://localhost:8080/chat/api/advisorId", s1);
  }

  getMsgs(chatRoom: string): Observable<any> {
    return this.http.get("http://localhost:8080/chat/api/msg/" + chatRoom);
  }

  registerChatRoom(msg: any): Observable<any> {
    return this.http.post("http://localhost:8080/chat/api/register/chatroom", msg)
  }

  updateMsgList(chatMsg: any, chatRoom: string): Observable<any> {
    return this.http.put("http://localhost:8080/chat/api/update/msg/" + chatRoom, chatMsg)
  }

  getNames(id: any): Observable<any> {
    return this.http.get("http://localhost:8080/chat/api/names/" + id)
  }

}

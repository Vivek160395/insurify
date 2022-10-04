import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, Router } from '@angular/router';
import {ChatComponent} from '../chat/chat.component';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-policy-advisor',
  templateUrl: './policy-advisor.component.html',
  styleUrls: ['./policy-advisor.component.css']
})
export class PolicyAdvisorComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  policyAdvisors: any;
  isActive = true
  service!: UserService;

  

  ngOnInit(): void {
    let response = this.http.get("http://localhost:8080/advisor/policyAdvisors");
    response.subscribe((data) => {

      console.log(data);
      this.policyAdvisors = data;
      console.log(this.policyAdvisors.yearsOfExperience);
      })
  }

 clickMe(id:any){
  let mychat=new ChatComponent(this.http,this.service);
   mychat.connect(id);
 }

}

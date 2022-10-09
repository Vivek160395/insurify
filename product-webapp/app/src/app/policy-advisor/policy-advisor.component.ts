import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-policy-advisor',
  templateUrl: './policy-advisor.component.html',
  styleUrls: ['./policy-advisor.component.css']
})
export class PolicyAdvisorComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private service: UserService) { }
  policyAdvisors: any;
  isActive = true



  ngOnInit(): void {
<<<<<<< HEAD
<<<<<<< HEAD
  let response = this.http.get("http://localhost:8080/advisor/api/v1/policyAdvisors");
=======
    let response = this.http.get("http://localhost:8080/advisor/api/v1/policyAdvisors");
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
=======
    let response = this.http.get("http://localhost:8080/advisor/api/v1/policyAdvisors");
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
    // let response = this.http.get("http://localhost:8080/advisor/api/v1/policyAdvisors");
    response.subscribe((data) => {

      console.log(data);
      this.policyAdvisors = data;
      console.log(this.policyAdvisors[0].emailId);
    })
  }



  clickMe(id: any) {
    let mychat = new ChatComponent(this.http, this.service);
    mychat.connect(id);
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-advisor',
  templateUrl: './policy-advisor.component.html',
  styleUrls: ['./policy-advisor.component.css']
})
export class PolicyAdvisorComponent implements OnInit {

  isActive = true;
  policyAdvisors:any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let response = this.http.get("http://localhost:8087/api/v1/policyAdvisors");
    response.subscribe((data)=>{

      console.log(data);
      this.policyAdvisors=data;
      console.log(this.policyAdvisors.yearsOfExperience);
      
      
    })
  }

}

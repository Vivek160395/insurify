<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
>>>>>>> 0c9a20832b700c04158dea28c3deb71ad5a06f3c
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-advisor',
  templateUrl: './policy-advisor.component.html',
  styleUrls: ['./policy-advisor.component.css']
})
export class PolicyAdvisorComponent implements OnInit {

<<<<<<< HEAD
  isActive = true;
  policyAdvisors:any;
  constructor(private http: HttpClient, private router: Router) { }
=======
  constructor(private http: HttpClient,private router:Router) { }
  policyAdvisors:any;
  isActive=true
>>>>>>> 0c9a20832b700c04158dea28c3deb71ad5a06f3c

  ngOnInit(): void {
    let response = this.http.get("http://localhost:8087/api/v1/policyAdvisors");
    response.subscribe((data)=>{

      console.log(data);
      this.policyAdvisors=data;
      console.log(this.policyAdvisors.yearsOfExperience);
      
      
    })
  }

}

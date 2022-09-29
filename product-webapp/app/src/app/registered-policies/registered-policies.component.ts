import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-policies',
  templateUrl: './registered-policies.component.html',
  styleUrls: ['./registered-policies.component.css']
})
export class RegisteredPoliciesComponent implements OnInit {

  registeredPolicies:any;

  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let response= this.http.get("http://localhost:8010/api/vk1/policies/ajay123@gmail.com");
    response.subscribe((data)=>{
      
      console.log(data);
      this.registeredPolicies=data;
      console.log(this.registeredPolicies);
  })

}


openDialog(policy: any, i:any) {
  console.log(policy);
  this.router.navigateByUrl('/policyBuyers');
  localStorage.setItem('insurancePolicyId',policy.policyId)

}
}

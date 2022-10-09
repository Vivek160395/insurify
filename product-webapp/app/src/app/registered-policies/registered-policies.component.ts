import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-policies',
  templateUrl: './registered-policies.component.html',
  styleUrls: ['./registered-policies.component.css']
})
export class RegisteredPoliciesComponent implements OnInit {

  registeredPolicies: any;
  searchedKeyword: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let response = this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policies/" + localStorage.getItem('logInEmailId')?.toString());
    // let response= this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policies/"+localStorage.getItem('logInEmailId')?.toString());
    response.subscribe((data) => {

      console.log(data);
      this.registeredPolicies = data;
      console.log(this.registeredPolicies);
    })

  }


  openDialog(policy: any, i: any) {
    console.log(policy);
    this.router.navigateByUrl('/home/policyBuyers');
    localStorage.setItem('insurancePolicyId', policy.policyId);
    localStorage.setItem('typeOfInsurance', policy.insuranceType);
    localStorage.setItem('typeOfPolicy', policy.policyName)

  }
}

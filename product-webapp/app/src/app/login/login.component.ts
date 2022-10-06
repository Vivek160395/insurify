import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationToken: any = "";
  msg = '';


  registerForm: any;
  constructor(private loginservice: LoginService, public router: Router) { }

  ngOnInit(): void {

  }
  logInForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  value = this.logInForm.value;
  logIn(): void {
    console.log("Entering method");

    this.loginservice.emailId = this.logInForm.value.emailId;
    this.loginservice.password = this.logInForm.value.password;
    if (this.logInForm.valid) {
      this.loginservice.getUserCredentials(this.logInForm.value).subscribe((response) => {
        console.log("Log in successfull", response);
        localStorage.setItem("logInEmailId", this.loginservice.emailId);

      }, error => {
        console.log("Log in failed", error);
        this.msg = "Please enter valid credentials";
        this.logInForm.reset();
      }
      )


    }

    console.log("Just before checking for usertype");

    this.loginservice.loginUser(this.logInForm.value.emailId).subscribe((response) => {
      this.loginservice.stauts = true;
      console.log(response);
      localStorage.setItem('emailid1', response.emailId);
      if (response.userType == "As Insured") {
        console.log(response.userType);
        localStorage.setItem("UserType", "customer")
        this.router.navigate(["/home/home-page"]);
      }
      else if (response.userType == "As Policy Advisor") {
        console.log(response.userType);
        localStorage.setItem("UserType", "policyadvisor")
        this.router.navigate(["/home/home-page"]);
      }
      else {
        console.log(response.userType);
        localStorage.setItem("UserType", "insuranceprovider")
        this.router.navigate(["/home/insurance-provider"]);
      }
    }
    );
  }





  get emailId() {
    return this.logInForm.controls['emailId'];
  }

  get password() {
    return this.logInForm.controls['password'];
  }


}

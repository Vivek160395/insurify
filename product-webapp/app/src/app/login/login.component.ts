import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logInForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
   });
  
   logIn(){
    console.log("Log in successfull");
    }



  get emailId(): FormControl{
    return this.logInForm.get('emailId') as FormControl;
  }

  get password(): FormControl{
    return this.logInForm.get('password') as FormControl;
  }
  

}

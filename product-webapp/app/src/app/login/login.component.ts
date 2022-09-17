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

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
   });
  
   registerSubmitted(){
    console.log("Submitted");
    }



  get email(): FormControl{
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl{
    return this.registerForm.get('password') as FormControl;
  }
  

}

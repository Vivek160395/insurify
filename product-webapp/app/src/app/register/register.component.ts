import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPassword: string = "none";

    
constructor() {}

ngOnInit():void{}

registerForm = new FormGroup({
  Role: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(15),
    Validators.pattern("[a-zA-Z0-9%*#].*")
  ]),
  confirmPassword: new FormControl(''),
 });

registerSubmitted(){
  if(this.password.value == this.confirmPassword.value){
  console.log("Submitted");
  } else{
    this.repeatPassword = "inline;"
  }
}
get Role(): FormControl{
  return this.registerForm.get('Role') as FormControl;
}

get email(): FormControl{
  return this.registerForm.get('email') as FormControl;
}

get password(): FormControl{
  return this.registerForm.get('password') as FormControl;
}

get confirmPassword(): FormControl{
  return this.registerForm.get('confirmPassword') as FormControl;
}
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: string = '';
 user: User = new User();
constructor(private userService: UserService,private route:Router) {}

ngOnInit():void{}


registerForm = new FormGroup({
  userType: new FormControl('', [Validators.required]),
  emailId: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('',[
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(15),
    Validators.pattern("[a-zA-Z0-9%*#].*")
  ]),
  confirmPassword: new FormControl('',[Validators.required]),
 },
 );

registerSubmitted(data:any){
  this.user.emailId = data.value.emailId;
  this.user.password = data.value.password;
  this.user.userType = data.value.userType;

  if (this.password.value == this.confirmPassword.value) {
    console.log(this.user);
    this.userService.registerUser(this.user).subscribe((response)=>{
      console.log("Registered data", response);
      this.route.navigateByUrl("/nav/login")
    });
  }
  else{
    this.error = "Password and Confirm Password Should Match";
  }

  //console.table(this.registerForm.value);
 // alert("Your password confirm password should match");
}


get userType(): FormControl{
  return this.registerForm.get('userType') as FormControl;
}

get emailId(): FormControl{
  return this.registerForm.get('emailId') as FormControl;
}

get password(): FormControl{
  return this.registerForm.get('password') as FormControl;
}

get confirmPassword(): FormControl{
  return this.registerForm.get('confirmPassword') as FormControl;
}


OnRegister() {
  console.table(this.registerForm.value);
  if (this.password.value != this.confirmPassword.value) {
    alert("Your password confirm password should match");
  }
}



}

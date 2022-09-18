// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { User } from '../user';
// import { UserService } from '../user.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//  // repeatPassword: string = "none";

// //  user: User = new User();
// constructor(private userService: UserService) {}

// ngOnInit():void{}

// registerForm = new FormGroup({
//   Role: new FormControl('', [Validators.required]),
//   email: new FormControl('', [Validators.required, Validators.email]),
//   password: new FormControl('',[
//     Validators.required,
//     Validators.minLength(6),
//     Validators.maxLength(15),
//     Validators.pattern("[a-zA-Z0-9%*#].*")
//   ]),
//   confirmPassword: new FormControl('',[Validators.required]),
//  },
//  );

// registerSubmitted(data:any){
//   this.user.emailId = data.value.email;
//   this.user.password = data.value.password;
//   this.user.userType = data.value.Role;

//   console.log(this.user);
//   this.userService.registerUser(this.user).subscribe((response)=>{
//     console.log("Registered data", response);
//   });



// }
// get Role(): FormControl{
//   return this.registerForm.get('Role') as FormControl;
// }

// get email(): FormControl{
//   return this.registerForm.get('email') as FormControl;
// }

// get password(): FormControl{
//   return this.registerForm.get('password') as FormControl;
// }

// get confirmPassword(): FormControl{
//   return this.registerForm.get('confirmPassword') as FormControl;
// }

// }

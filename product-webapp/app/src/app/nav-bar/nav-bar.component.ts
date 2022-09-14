import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RecommendationServiceService } from '../recommendation-service.service';
import { Userservice1Service } from '../userservice1.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit  {

 
  avatarUrl:any;
  imgurl = "";
  imgurlType = "";
  motors: string[] = [
    'Motor Insurance',
    'Bike Insurance',
    'Car Insurance',
    ];

    healths: string[] = [
      'Health Insurance',
      'Health Booster',
      'Personal Protect',
      ];

      renewals: string[] = [
        'Car Policy',
        'Bike Policy',
        'Health Policy',
        ];

        claims: string[] = [
          'Health Claims',
          'Motor Claims'
          ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XLarge)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private service:Userservice1Service) { }
  ngOnInit(): void {
     this.getAllUsers();
  }

  registerForm=new FormGroup({
    emailId: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password:new FormControl('',[Validators.required,Validators.minLength(4)]),
    userType:new FormControl('',[Validators.required,Validators.minLength(4)]),
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    gender:new FormControl('',[Validators.required,Validators.minLength(4)]),
    age:new FormControl('',[Validators.required,Validators.minLength(1)]),
    dateOfBirth:new FormControl('',[Validators.required,Validators.minLength(4)]),
    mobileNo:new FormControl('',[Validators.required,Validators.minLength(4)]),
    // address:new FormControl('',[Validators.required,Validators.minLength(4)]),
    aadharNo:new FormControl('',[Validators.required,Validators.minLength(4)]),
    panNo:new FormControl('',[Validators.required,Validators.minLength(4)])

  })

    get emailId()
    {
      return this.registerForm.get('emailId');
    }

    get password()
    {
      return this.registerForm.get('password');
    }

    get userType()
    {
      return this.registerForm.get('userType');
    }

    get name()
    {
      return this.registerForm.get('name');
    }

    get gender()
    {
      return this.registerForm.get('gender');
    }

    get age()
    {
      return this.registerForm.get('age');
    }

    get dateOfBirth()
    {
      return this.registerForm.get('dateOfBirth');
    }

    get mobileNo()
    {
      return this.registerForm.get('mobileNo');
    }

    get aadharNo()
    {
      return this.registerForm.get('aadharNo');
    }

    get panNo()
    {
      return this.registerForm.get('panNo');
    }


  getAllUsers():void{
    // this.service.getUser().subscribe((data)=>{
    //   for(var i=0;i<data.length;i++){
    //     if(this.service.userEmail === data[i].emailId){
    //       this.image = data.profilePic;
    //     }
    //     if(this.image===null || this.image==="")
    //     {
    //       this.image="../../assets/img/blank-profile-picture-973460_1280.webp";
    //     }
    //   }
    // })
         this.email=localStorage.getItem("emailId")
         this.service.getUser(this.email).subscribe(response=>{
           console.log(response);
           this.userlist=response;
         })

  }
  profilepic!:any
  email:any
  userlist:any



}

import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Claim } from '../claim';
import { ClaimService } from '../claim.service';
import { DetailsComponent } from '../details/details.component';


 
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})

export class ClaimComponent implements OnInit {
   today: number = Date.now();
   selectedFile=null;
   Imgurl=null;
  //  insuranceType: string | null;
  showMsg: boolean = false;

  
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,public dialog: MatDialog,private router: Router,private service:ClaimService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      // this.insuranceType= localStorage.getItem('insuranceType');
  }
  ngOnInit(): void {
    
  }
  
  
  openDialog() {
    
    this.router.navigateByUrl('/details');
  }

  
  

    data ={
  customerPolicyId: "P0123457",
  policyId:  "P0123457",
  insuredName: "george",
  insuredEmail:  "george@gmail.com",
  startDate:  "27/07/2022",
  purchaseDate : "25/07/2022",
    endDate:  "25/07/2023",
    duration:  "3 years",
    insuranceType:"lifeInsurance",
    }
    
  
  onImgSelected(e:any){
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
      this.Imgurl=event.target.result;
   }}}
  claimForm = new FormGroup({
    document : new FormControl("", [Validators.required]),
    describeEventauto : new FormControl("", [Validators.required]),
    describeEventhealth : new FormControl("", [Validators.required]),
    describeEventlife : new FormControl("", [Validators.required]),
    claimType : new FormControl("", [Validators.required]),
    claimAuto : new FormControl("", [Validators.required]),
    claimLoss : new FormControl("", [Validators.required]),
    claimHealth : new FormControl("", [Validators.required]),
    claimLife : new FormControl("", [Validators.required]),

    intimationDate : new FormControl("", [Validators.required]),
    eventDate : new FormControl("", [Validators.required]),
  })
// contactForm = new FormGroup({
//   firstname: new FormControl(),
//   lastname: new FormControl(),
//   email: new FormControl(),
//   gender: new FormControl(),
//   isMarried: new FormControl(),
//   country: new FormControl()
// })
getDetails(){
  this.service.getUserDetails().subscribe(info=>{
    for(var i=0;i<info.length;i++){
      if(info[i].policyId=== this.service.policyId){
      this.data.customerPolicyId=info[i].customerPolicyId;
      this.data.insuredName=info[i].insuredName;
      this.data.insuredEmail=info[i].insuredEmail;
      this.data.startDate=info[i].startDate;
      this.data. purchaseDate=info[i]. purchaseDate;
      this.data.endDate=info[i].endDate;
      this.data.duration=info[i].duration;
      this.data.insuranceType=info[i].insuranceType;
      
      }
    }
  })
}


onSubmit() {
  console.log(this.claimForm.value);
  console.log(this.data.customerPolicyId);
  console.log(this.data.policyId);
  console.log(this.data.insuredEmail);
  this. claimForm.reset();
  this.showMsg= true;
}
get insurancex(){
  return this.data.insuranceType;
}

}



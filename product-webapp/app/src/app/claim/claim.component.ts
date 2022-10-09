import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ClaimService } from '../Services/claim.service';





@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css'],
  providers: [DatePipe],
})

export class ClaimComponent implements OnInit {
  today: number = Date.now();
  selectedFile = null;
  Imgurl = null;
  claimError = '';
  today1 = new Date();
  claimLife: string = "";
  claimAmount = "";

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public dialog: MatDialog, private router: Router, private service: ClaimService, public http: HttpClient, private datePipe: DatePipe) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    // this.insuranceType= localStorage.getItem('insuranceType');
  }
  ngOnInit(): void {
    this.getDetails()
    this.getpolicy()
<<<<<<< HEAD
<<<<<<< HEAD
    setTimeout(()=>{this.getDetails();this.getpolicy()},1000)
=======
    setTimeout(() => { this.getDetails(); this.getpolicy() }, 1000)
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
=======
    setTimeout(() => { this.getDetails(); this.getpolicy() }, 1000)
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
  }


  data: any = {
    customerPolicyId: "",
    insurancePolicyId: "",
    insuredName: "",
    insuredEmail: "",
    startDate: "",
    purchaseDate: "",
    endDate: "",
    duration: "",
    premium: "",
    sumInsured: "",
    nomineeName: "",
    nomineeDOB: "",
    vehicleRegistrationNumber: "",
    category: "",
    engineNumber: "",
    chassisNumber: "",
    insuranceType: '',
    kids: "",
    adults: "",
    relation: "",
    name: "",

    maritalStatus: "",
    annualIncome: "",
    organisationType: "",
    occupation: ""



  }

  public onFileChanged(event: any) {
    console.log(event)
    //Select File
    if (event.target.files.length > 0) {
      const file1 = event.target.files[0];
      this.claimForm.patchValue({
        document: file1

      });
    }
  }
  getpolicy() {
    this.service.getPolicyDetails().subscribe(
      info => {
        console.log(info);
        this.data.insuranceType = info.insuranceType;
        console.log(this.data.insuranceType)

      });
  }
  claimForm = new FormGroup({
    document: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    claimType: new FormControl("",),
    claimAmount: new FormControl("",),
    claimDate: new FormControl("", [Validators.required]),
    claimSubmissionDate: new FormControl(new Date(), [Validators.required]),
    customerPolicyId: new FormControl(localStorage.getItem('customerPolicyId'),),
    insurancePolicyId: new FormControl(localStorage.getItem('insurancePolicyId'),),
    email: new FormControl(localStorage.getItem('logInEmailId'),),

  })

  getDetails() {
    this.service.getUserDetails().subscribe(
      (info: any) => {
        console.log(info);
        this.data.insurancePolicyId = info.insurancePolicyId;
        this.data.customerPolicyId = info.customerPolicyId;
        this.data.insuredName = info.name;
        this.data.insuredEmail = localStorage.getItem('logInEmailId');
        this.data.startDate = info.startDate;
        this.data.purchaseDate = info.startDate[0];
        this.data.endDate = info.endDate;
        this.data.duration = info.duration;
        this.data.sumInsured = info.sumInsured;
        this.data.premium = info.premium;
        this.data.nomineeName = info.nameOfNominee;
        this.data.nomineeDOB = info.nomineeDOB;
        localStorage.setItem('policyid1', info.insurancePolicyId);
        localStorage.setItem('customerpolicyid1', info.customerPolicyId);
        localStorage.setItem('emailid1', info.email);

        if (this.data.insuranceType === 'AutoMobileInsurance') {
          console.log("Entering Auto mobile function");
          console.log(info.automobileInsurance.engineNumber);
          this.data.category = info.automobileInsurance.category;
          this.data.vehicleRegistrationNumber = info.automobileInsurance.
            vehicleRegistrationNumber;
          this.data.engineNumber = info.automobileInsurance.engineNumber;
          this.data.chassisNumber = info.automobileInsurance.chassisNumber;
        }
        else if (this.data.insuranceType === 'HealthInsurance') {
          console.log("Entering Health function");
          this.data.kids = info.healthInsurance.kids;
          this.data.adults = info.healthInsurance.adults;
          this.data.name = info.healthInsurance.insuredInfo[0].name;
          this.data.relation = info.healthInsurance.insuredInfo[0].relation;
        }
        else if (this.data.insuranceType === 'LifeInsurance') {
          console.log("Entering Life function");
          this.data.maritalStatus = info.lifeInsurance.maritalStatus;
          this.data.occupation = info.lifeInsurance.occupation;
          this.data.organisationType = info.lifeInsurance.organisationType;
          this.data.annualIncome = info.lifeInsurance.annualIncome;
          console.log(this.data.maritalStatus);

          this.claimAmount = info.sumInsured.toString();
          this.claimForm.patchValue({
            claimAmount: this.claimAmount,
            claimType: "Death Claim"
          });
        }

      });





  }







  flag = true

  onSubmit() {
    this.flag = false
    const formData: FormData = new FormData();

    formData.append("imageFile", this.claimForm.controls['document'].value!);
    formData.append("policyId", this.data.customerPolicyId.toString())
    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    this.service.putUser(this.claimForm.value).subscribe((
      info) => {
      this.claimForm.reset();
    },
      (err) => {
        this.claimError = err.error.text;
<<<<<<< HEAD
<<<<<<< HEAD
        if(err.error.text!="Previous Claims are still pending.Please wait for the older claims to settle in order to raise new claim " && err.error.text!="No active Policy to claim" && err.error.text!="Insured amount has been Exhausted.Purchase a new Policy to avail Benefits")
        {
          this.http.put("http://localhost:8080/purchase/api/upload/documents/" + this.data.customerPolicyId, formData, { observe: 'response' })
        // this.http.put("http://localhost:8080/purchase/api/upload/documents/" + this.data.customerPolicyId, formData, { observe: 'response' })
          .subscribe((data: any) => { console.log(data) });
      }
=======
=======
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
        if (err.error.text != "Previous Claims are still pending.Please wait for the older claims to settle in order to raise new claim " && err.error.text != "No active Policy to claim" && err.error.text != "Insured amount has been Exhausted.Purchase a new Policy to avail Benefits") {
          this.http.put("http://localhost:8080/purchase/api/upload/documents/" + this.data.customerPolicyId, formData, { observe: 'response' })
            // this.http.put("http://localhost:8080/purchase/api/upload/documents/" + this.data.customerPolicyId, formData, { observe: 'response' })
            .subscribe((data: any) => { console.log(data) });
        }
<<<<<<< HEAD
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
=======
>>>>>>> 0e564c3d9f7d0f2ebfc13cd801be91711926476b
        console.log(err.error.text)
        console.log(this.claimForm.value);
      });
    setTimeout(() => { this.router.navigateByUrl('/home/policies') }, 3000)

  }
  get insurancex() {
    return this.data.insuranceType;
  }

}
export class CustomerClaim {
  constructor(public customerPolicyId: string,
    public insurancePolicyId: string,
    public email: any,
    public claimAmount: any,
    public claimDate: any,
    public claimSubmissionDate: any,
    public description: any,
    public claimType: any,
    public file: any) { }
}



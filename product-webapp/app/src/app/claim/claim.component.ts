import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Claim } from '../claim';
import { ClaimService } from '../Services/claim.service';
import { DetailsComponent } from '../details/details.component';



@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})

export class ClaimComponent implements OnInit {
  today: number = Date.now();
  selectedFile = null;
  Imgurl = null;
  claimError = '';
  today1 = new Date();
  claimLife: string = "";


  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public dialog: MatDialog, private router: Router, private service: ClaimService, public http: HttpClient) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    // this.insuranceType= localStorage.getItem('insuranceType');
  }
  ngOnInit(): void {
    this.getDetails()
    this.getpolicy()

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



  claimForm = new FormGroup({
    document: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    claimType: new FormControl("", [Validators.required]),
    claimAmount: new FormControl("", [Validators.required]),
    claimDate: new FormControl("", [Validators.required]),
    claimSubmissionDate: new FormControl("", [Validators.required]),
    customerPolicyId: new FormControl(localStorage.getItem('customerPolicyId'), [Validators.required]),
    insurancePolicyId: new FormControl(localStorage.getItem('policyId'), [Validators.required]),
    email: new FormControl(localStorage.getItem('email'), [Validators.required]),

  })


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









  getDetails() {
    this.service.getUserDetails().subscribe(
      info => {
        console.log(info);

        this.data.insurancePolicyId = info.insurancePolicyId;
        this.data.customerPolicyId = info.customerPolicyId;
        this.data.insuredName = info.name;
        this.data.insuredEmail = info.email;
        this.data.startDate = info.startDate;
        this.data.purchaseDate = info.purchaseDate;
        this.data.endDate = info.endDate;
        this.data.duration = info.duration;
        this.data.sumInsured = info.sumInsured;
        this.data.premium = info.premium;
        this.data.nomineeName = info.nameOfNominee;
        this.data.nomineeDOB = info.nomineeDOB;
        localStorage.setItem('policyId', info.insurancePolicyId);
        localStorage.setItem('customerPolicyId', info.customerPolicyId);
        localStorage.setItem('email', info.email);

        if (this.data.insuranceType === 'AutoMobileInsurance') {
          this.data.category = info.automobileInsurance.category;
          this.data.vehicleRegistrationNumber = info.automobileInsurance.
            vehicleRegistrationNumber;
          this.data.engineNumber = info.automobileInsurance.engineNumber;
          this.data.chassisNumber = info.automobileInsurance.chassisNumber;
        }
        else if (this.data.insuranceType === 'HealthInsurance') {

          this.data.kids = info.healthInsurance.kids;
          this.data.adults = info.healthInsurance.adults;
          this.data.name = info.healthInsurance.insuredInfo[0].name;
          this.data.relation = info.healthInsurance.insuredInfo[0].relation;
        }
        this.data.maritalStatus = info.lifeInsurance.maritalStatus;
        this.data.occupation = info.lifeInsurance.occupation;
        this.data.organisationType = info.lifeInsurance.organisationType;
        this.data.annualIncome = info.lifeInsurance.annualIncome;




















      });





  }
  getpolicy() {
    this.service.getPolicyDetails().subscribe(
      info => {


        console.log(info);
        this.data.insuranceType = info.insuranceType;


      });


  }




  onSubmit() {
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
        this.http.put("http://localhost:8084/api/upload/documents/" + this.data.customerPolicyId, formData, { observe: 'response' })
          .subscribe((data: any) => { console.log(data) });
        console.log(err.error.text)
        console.log(this.claimForm.value);
      });
  }
  get insurancex() {
    return this.data.insuranceType;
  }

}



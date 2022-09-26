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
import { ClaimService } from '../claim.service';
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
  insuranceType: string = "";
  claimError='';


  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public dialog: MatDialog, private router: Router, private service: ClaimService,public http:HttpClient) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    // this.insuranceType= localStorage.getItem('insuranceType');
  }
  ngOnInit(): void {
    this.getDetails()

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
  }


 
  claimForm = new FormGroup({
    document: new FormControl("",),
    description: new FormControl("",),
    claimType: new FormControl("",),
    claimAmount: new FormControl("",),
    claimDate: new FormControl("",),
    claimSubmissionDate: new FormControl("",),
    customerPolicyId: new FormControl(localStorage.getItem('customerPolicyId')),
    insurancePolicyId: new FormControl(localStorage.getItem('policyId')),
    email:new FormControl(localStorage.getItem('email'))
    
  })


  public onFileChanged(event:any) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.claimForm.patchValue({
        document: file
      });
    }
  }
 
  
 
  
  
  


  getDetails() {
    this.service.getUserDetails().subscribe(
      info => {


        console.log(info);


        // if (info.email === this.service.emailId) {
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
          this.data.category = info.automobileInsurance.category;
          this.data.vehicleRegistrationNumber = info.automobileInsurance.
          vehicleRegistrationNumber;
          this.data.engineNumber = info.automobileInsurance.engineNumber;
          this.data.chassisNumber = info.automobileInsurance.chassisNumber;
          


          localStorage.setItem('policyId', info.insurancePolicyId);
          localStorage.setItem('customerPolicyId', info.customerPolicyId);
          localStorage.setItem('email', info.email);
         


        
      });
   



  }



  onSubmit() {
    const formData=new FormData;
    formData.append("documentFile",this.claimForm.controls['document'].value!);
    console.log(this.claimForm.value);
    this.service.putUser(this.claimForm.value).subscribe((
      info) => {
    console.log(this.claimForm.value);
    this.http.put("http://localhost:8084/api/upload/documents/{policyId}"+info.insurancePolicyId,formData, { observe: 'response' })
              .subscribe((data:any)=>{console.log(data)});
    this.claimForm.reset();
    

  },
  (err) => {
    this.claimError=err.error.text;
    console.log(err.error.text)});
}
  get insurancex() {
    return "automobileInsurance";
  }

}



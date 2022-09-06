import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-insurance-policy',
  templateUrl: './add-insurance-policy.component.html',
  styleUrls: ['./add-insurance-policy.component.css']
})
export class AddInsurancePolicyComponent implements OnInit {
  insuranceForms = new FormGroup({
    name: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    insuranceType: new FormControl("", [Validators.required]),
    policyId: new FormControl("", [Validators.required]),
    policyName: new FormControl("", [Validators.required]),
    policyDescription: new FormControl("", [Validators.required]),
    policyDetails: new FormArray([
      new FormGroup({
        premiums: new FormControl("", [Validators.required]),
        durations: new FormControl("", [Validators.required]),
        sumInsure: new FormControl("", [Validators.required]),
        adults   :new FormControl(""),
        kids     :new FormControl(""),
        minSalary:new FormControl(""),
        maxSalary:new FormControl(""),
      }
      )
    ]),
    
    policyBenefits: new FormArray([
      new FormGroup({
        brief: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required])
      }
      )
    ]),
    addOnDetails: new FormArray([
      new FormGroup({
        addOn: new FormControl("", [Validators.required]),
        addOnPremiums: new FormControl("", [Validators.required])
      }
      )
    ]),
     
    policyDocuments: new FormControl("", [Validators.required]),
    fileSource: new FormControl("", [Validators.required])
  });


  public onFileChanged(event:any) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.insuranceForms.patchValue({
        fileSource: file
      });
    }
  }
  display(){
    console.log(this.insuranceForms.value)
  }
  addDetails() {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    control.push(new FormGroup({
      premiums: new FormControl("", [Validators.required]),
      durations: new FormControl("", [Validators.required]),
      sumInsure: new FormControl("", [Validators.required])
    }
    ));
  }
  removeDetails(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    control.removeAt(index);
  }
  addDetails1() {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];
    control.push(new FormGroup({
      brief: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    }
    ));
  }
  removeDetails1(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];
    control.removeAt(index);
  }
  addDetails2() {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    control.push(new FormGroup({
      addOn: new FormControl("", [Validators.required]),
      addOnPremiums: new FormControl("", [Validators.required])
    }
    ));
  }
  removeDetails2(index: any) {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    control.removeAt(index);
  }
  
 
  

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {

  }

  get policyDetailsx() {
    return (this.insuranceForms.get('policyDetails') as FormArray).controls;
  }
  get policyBenefitsx() {
    return (this.insuranceForms.get('policyBenefits') as FormArray).controls;
  }
  get policyAddOnsx(){
    return (this.insuranceForms.get('addOnDetails') as FormArray).controls;
  }


}

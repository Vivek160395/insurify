import { AnimationStyleMetadata } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Insurance } from '../insurance';
export interface Fruit {
  insuredSum: number;
}
export interface Duration {
  years: number;
}
@Component({
  selector: 'app-add-insurance-policy',
  templateUrl: './add-insurance-policy.component.html',
  styleUrls: ['./add-insurance-policy.component.css']
})
export class AddInsurancePolicyComponent implements OnInit {
  
  
  insuranceForms = new FormGroup({
    insuranceType    : new FormControl("", [Validators.required]),
    policyId         : new FormControl("", [Validators.required]),
    policyName       : new FormControl("", [Validators.required]),
    policyDescription: new FormControl("", [Validators.required]),
    policyDetails    : new FormArray([new FormGroup({
      premiums : new FormControl("", [Validators.required]),
      durations: new FormControl("", [Validators.required]),
      sumInsure: new FormControl("", [Validators.required]),
      adults   :new FormControl(""),
      kids     :new FormControl(""),
      minSalary:new FormControl(""),
      maxSalary:new FormControl(""),
    })]),
    policyBenefits: new FormArray([
      new FormGroup({
        brief      : new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required])
      })]),
    addOnDetails: new FormArray([
      new FormGroup({
        addOn        : new FormControl("", [Validators.required]),
        addOnPremiums: new FormControl("", [Validators.required])
      })
    ]),   
    policyDocuments: new FormControl("", [Validators.required]),
    fileSource     : new FormControl("", [Validators.required])
  });
  
  
  constructor(private fb: FormBuilder,private http:HttpClient) { }
 
 
  ngOnInit(): void {
  this.insuranceForms.get('policyId')?.setValue(this.id.toString())
  this.insuranceForms.get('policyId')!.disable()
  }
  

  id=Math.floor(Math.random()*1000000+100000); 
  
  obj:Insurance={
    insuranceType:'',
    policyId         :'',
    policyName       :'',
    policyDescription:'',
    policyDetails    :[],
    policyBenefits   :[],
    addOnDetails     :[],
    policyDocuments  :'',
    fileSource       :'',
  } ;
  
  

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
    console.log(this.id);  
    console.log(this.insuranceForms.value);
    this.insuranceForms.get('policyId')!.enable();
    this.obj.insuranceType=this.insuranceForms.controls['insuranceType'].value!;
    this.obj.policyId=this.insuranceForms.controls['policyId'].value!;
    this.obj.policyName=this.insuranceForms.controls['policyName'].value!;
    this.obj.policyDescription=this.insuranceForms.controls['policyDescription'].value!;
    this.obj.policyDetails=this.insuranceForms.controls['policyDetails'].value;
    this.obj.policyBenefits=this.insuranceForms.controls['policyBenefits'].value;
    this.obj.addOnDetails=this.insuranceForms.controls['addOnDetails'].value;
    this.obj.fileSource=this.insuranceForms.controls['fileSource'].value;

    const formData=new FormData;
    formData.append("insuranceType",this.obj.insuranceType);
    formData.append("policyId",this.obj.policyId);
    formData.append("policyName",this.obj.policyName);
    formData.append("policyDescription",this.obj.policyDescription);
    for(let x of this.obj.policyDetails)
    {
      formData.append("policyDetails",x as Blob);
    }
    for(let x of this.obj.policyBenefits)
    {
      formData.append("policyBenefits",x as Blob);
    }
    for(let x of this.obj.addOnDetails)
    {
      formData.append("addOnDetails",x as Blob);
    }
    formData.append("fileSource",this.obj.fileSource);
    
    this.http.post("http://localhost:9000/apis/insurances",formData, { observe: 'response' }).subscribe((data:any)=>{console.log(data)}); 
    console.log(this.obj)
    this.insuranceForms.get('policyId')!.disable()
  }


  addDetails(i:any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    control.push(control.controls[i]);
  }
  addDetailsE() {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
   
    control.push(new FormGroup({
      premiums: new FormControl("", [Validators.required]),
      durations: new FormControl("", [Validators.required]),
      sumInsure: new FormControl("", [Validators.required]),
      adults   :new FormControl(""),
      kids     :new FormControl(""),
      minSalary:new FormControl(""),
      maxSalary:new FormControl("")
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
  
 
  

  
  get insurancex(){
    return this.insuranceForms.get('insuranceType')?.value!
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
//=========================================================================================================
//Methods for chips component
addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{insuredSum: 100000}, {insuredSum: 1000000},{insuredSum: 2500000}, {insuredSum: 5000000}];
  duration: Duration[] = [{years: 1}, {years: 5}, {years: 10}];
  add(event: MatChipInputEvent): void {
    // const value = (event.value || '').trim();
    const value = +event.value ;
    // Add our fruit
    if (value) {
      this.fruits.push({insuredSum: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  addduration(event: MatChipInputEvent): void {
    
    const value = +event.value ;
    
    if (value) {
      this.duration.push({years: value});
    }
    event.chipInput!.clear();
  }

  removeduration(x: Duration): void {
    const index = this.duration.indexOf(x);

    if (index >= 0) {
      this.duration.splice(index, 1);
    }
  }

}

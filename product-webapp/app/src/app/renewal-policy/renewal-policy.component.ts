import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-renewal-policy',
  templateUrl: './renewal-policy.component.html',
  styleUrls: ['./renewal-policy.component.css']
})
export class RenewalPolicyComponent implements OnInit {

  constructor() { }

  setCheckBox1 = true;
  myModel = 0;

  ngOnInit(): void {
  }

  update1(event:any){
    console.log(event.checked)
    event.checked = this.setCheckBox1;
  }

  submit(){
    alert("Your Policy has been renewed successfully")
  }

  category:string = "two-wheeler";
  insuranceType:string = "AutomobileInsurance";

  renewalPolicyForm = new FormGroup({
    category: new FormControl("",Validators.required),
    insuranceType: new FormControl("",Validators.required)
  })

  getCategory(){
    return this.renewalPolicyForm.get('category')?.value!
  }

  getInsuranceType(){
    return this.renewalPolicyForm.get('insuranceType')?.value!
  }

  onSubmit(){
    console.log(this.insuranceType)
    return this.insuranceType
  }
  
}

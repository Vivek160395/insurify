import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-renewal-policy',
  templateUrl: './renewal-policy.component.html',
  styleUrls: ['./renewal-policy.component.css']
})
export class RenewalPolicyComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  myModel = 0;

  // toggle1(){
  //   this.isHidden1 = !this.isHidden1;
  //   console.log(this.isHidden1);
  // }

  // toggle2(){
  //   this.isHidden2 = !this.isHidden2;
  //   console.log(this.isHidden2);
  // }

  // toggle3(){
  //   this.isHidden3 = !this.isHidden3;
  //   console.log(this.isHidden3)
  // }


  // premiumCheckBoxList = this.formBuilder.group({
  //   Premium3: false,
  //   Premium4: false,
  //   Premium5: false,
  // });

  category:string | undefined;
  insuranceType:string | undefined;

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

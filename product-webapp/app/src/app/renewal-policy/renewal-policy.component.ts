import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-renewal-policy',
  templateUrl: './renewal-policy.component.html',
  styleUrls: ['./renewal-policy.component.css']
})
export class RenewalPolicyComponent implements OnInit {

  constructor() {
    this.myModel = 0;
   }

  setCheckBox1 = false;
  setCheckBox2 = false;
  setCheckBox3 = false;
  setCheckBox4 = false;
  myModel: any;

  update(){
  if (this.myModel === 2 || this.myModel === 3) {
    this.setCheckBox1 = false;
    this.setCheckBox2 = false;
    this.setCheckBox3 = false;
    this.setCheckBox4 = false;
  }
}

  ngOnInit(): void {
  }

  checkBox1(event:any){this.setCheckBox1 = event.checked;}
  checkBox2(event:any){this.setCheckBox2 = event.checked;}
  checkBox3(event:any){this.setCheckBox3 = event.checked;}
  checkBox4(event:any){this.setCheckBox4 = event.checked;}

  submit(){alert("Your Policy has been renewed successfully")}

  category:string = "";
  insuranceType:string = "LifeInsurance";

  renewalPolicyForm = new FormGroup({
    category: new FormControl("",Validators.required),
    insuranceType: new FormControl("",Validators.required)
  })

  getCategory(){return this.renewalPolicyForm.get('category')?.value!}

  getInsuranceType(){return this.renewalPolicyForm.get('insuranceType')?.value!}

}

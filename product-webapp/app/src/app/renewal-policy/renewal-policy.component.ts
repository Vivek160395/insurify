import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RenewalService } from '../renewal.service';

@Component({
  selector: 'app-renewal-policy',
  templateUrl: './renewal-policy.component.html',
  styleUrls: ['./renewal-policy.component.css']
})
export class RenewalPolicyComponent implements OnInit {

  addOnName: string[] = [];
  addOnPrice : number[] = [];
  policyDescription: string = "";
  policyTitle: string = "";
  policyType: string = "";
  policySubType: string = "";

  totalPremium: number = 0;
  premium: number[] = [];
  duration: number[] = [];

  setCheckBox: boolean[] = [];
  myModel: any;
  
  constructor(private renewalService: RenewalService) {
    this.myModel = 0;
   }

   today = new Date();
   pipe = new DatePipe("en-US");
   date = this.pipe.transform(this.today,'yyyy-MM-dd')

  ngOnInit(): void {
    // localStorage.getItem("insuranceId",);
    this.renewalService.getPolicyDetails().subscribe((data:any)=> 
    {
      this.policyDescription = data.policyDescription;
      this.policyTitle = data.policyName;
      this.policyType = data.insuranceType;

      if(this.policyType == "AutoMobileInsurance"){
        this.policySubType = data.category;
      }
      for(let i=0;i<data.policyDetails.length;i++){
        this.premium.push(data.policyDetails[i].premiums);
        this.duration.push(data.policyDetails[i].durations);
      }
      for(let i=0;i<data.addOnDetails.length;i++){
        this.addOnName.push(data.addOnDetails[i].addOnName);
        this.addOnPrice.push(data.addOnDetails[i].addOnPremiums);

        // this.totalPremium = this.addOnPrice.reduce(function(a,b)
        // {
        //   return a+b;
        // },0)
        console.log(this.totalPremium);
        this.setCheckBox.push(false);
      }
    })
  }

  data: any = {
    "customerPolicyId": null,
    "duration": null,
    "premium": null,
    "addOnName": [],
    "date": null
  }

  checkBox(event:any,i:any){
    this.setCheckBox[i] = event.checked;
    console.log(this.setCheckBox[i]);
    if(this.setCheckBox[i] == event.checked && this.setCheckBox[i+1] == event.checked){
      this.data.addOnName[0] = this.addOnName[0];
      this.data.addOnName[1] = this.addOnName[1];
      this.totalPremium = this.addOnPrice[0] + this.addOnPrice[1] + this.premium[0];
    }

    if(this.setCheckBox[0] == false){
        this.totalPremium = this.premium[0];
    }
  }

  onSubmit(){
    this.data.customerPolicyId = this.renewalService.customerPolicyId;

    for(let i=0; i<this.duration.length; i++){
      if(this.myModel == 0){
        this.data.duration = this.duration[0];
      }
      else if(this.myModel == 1){
        this.data.duration = this.duration[1];
      }
      else if(this.myModel == 2){
        this.data.duration = this.duration[2];
      }
    }

    // for(let i=0; i<this.setCheckBox.length; i++){
    //   if(this.setCheckBox[i] == true && this.myModel == 0){
    //     this.data.addOnName[0] = this.addOnName[0];
    //     this.data.addOnName[1] = this.addOnName[1];
    //     this.data.addOnName[2] = this.addOnName[2];
    //     this.data.addOnName[3] = this.addOnName[3];
    //       this.totalPremium = this.addOnPrice.reduce(function(a,b)
    //       {
    //         return a+b;
    //       },4000)
    //   }
    //   else if(this.setCheckBox[i] == false && this.myModel == 0){
    //     this.totalPremium = this.premium[0];
    //   }
    //   else if(this.setCheckBox[i] == true && this.myModel == 1){
    //     this.data.addOnName[0] = this.addOnName[0];
    //     this.data.addOnName[1] = this.addOnName[1];
    //     this.data.addOnName[2] = this.addOnName[2];
    //     this.data.addOnName[3] = this.addOnName[3];
    //     this.totalPremium = this.addOnPrice.reduce(function(a,b)
    //     {
    //       return a+b;
    //     },3000)
    //   }
    //   else if(this.setCheckBox[i] == false && this.myModel == 1){
    //     this.totalPremium = this.premium[1];
    //   }
    //   else if(this.setCheckBox[i] == true && this.myModel == 2){
    //     this.data.addOnName[0] = this.addOnName[0];
    //     this.data.addOnName[1] = this.addOnName[1];
    //     this.data.addOnName[2] = this.addOnName[2];
    //     this.data.addOnName[3] = this.addOnName[3];
    //     this.totalPremium = this.addOnPrice.reduce(function(a,b)
    //     {
    //       return a+b;
    //     },1500)
    //   }
    //   else if(this.setCheckBox[i] == false && this.myModel == 2){
    //     this.totalPremium = this.premium[2];
    //   }
    //   else if(this.setCheckBox[0] == true && this.myModel == 0){
    //     this.data.addOnName[0] = this.addOnName[0];
    //     console.log(this.addOnName[0])
    //     this.totalPremium = this.addOnPrice[0] + this.premium[0];
    //     console.log(this.addOnPrice[0]);
    //   }
    //     console.log(this.totalPremium);
    // }
    this.data.date = this.date;

    this.renewalService.updateData(this.data).subscribe(res => 
      {
        console.log(res);
      })
   }
}

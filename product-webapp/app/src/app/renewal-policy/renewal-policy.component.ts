import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Insurance } from '../insurance';
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
  selectedItems: any[] = []
  
  
  constructor(private renewalService: RenewalService,private http : HttpClient) {
    this.myModel = 0;
   }

   today = new Date();
   pipe = new DatePipe("en-US");
   date = this.pipe.transform(this.today,'yyyy-MM-dd')

  ngOnInit(): void {
    // localStorage.getItem(customerPolicyId);
    this.myModel=0
    this.http.get('http://localhost:8010/api/vk1/policy-id/11223344').subscribe((x:any)=>{
     
      
      
    this.http.put<Insurance>("http://localhost:8084/api/testing/30153115",x).subscribe((data:any)=> 
    {
      console.log("Inside retrived insurance success");
      console.log(data.policyDescription);
      console.log(data.policyDetails.length);
      console.log(data.addOnDetails.length);
      this.policyDescription = data.policyDescription;
      this.policyTitle = data.policyName;
      this.policyType = data.insuranceType;
      console.log(this.policyType);

      if(this.policyType == "AutoMobileInsurance"){
        this.policySubType = data.category;
      }
      if(this.policyType == "HealthInsurance"){
        
      }
      for(let i=0;i<data.policyDetails.length;i++){
        this.premium.push(data.policyDetails[i].premiums);
        this.duration.push(data.policyDetails[i].durations);
      }
      for(let i=0;i<data.addOnDetails.length;i++){
        this.addOnName.push(data.addOnDetails[i].addOnName);
        this.addOnPrice.push(data.addOnDetails[i].addOnPremiums);
        this.setCheckBox.push(false);
      }
    }
    )})//closing first subscribe
  }

  data: any = {
    "customerPolicyId": null,
    "duration": null,
    "premium": null,
    "addOnName": [],
    "date": null
  }

  checkBox(event:any, i:any){
    this.setCheckBox[i] = event.checked;
    console.log(i);
    if(event.checked){
      console.log("checked");
      this.selectedItems.push(i);
    }
    else{
      console.log("unchecked");
      this.selectedItems = this.selectedItems.filter(m => m!=i)
      
    }
    console.log(this.selectedItems);
    // console.log(this.setCheckBox)
  }
  calculate_premium()
  {
    console.log(this.myModel);
    console.log(this.addOnPrice);
    console.log(this.selectedItems);
    this.totalPremium=0;
   for(let i=0;i<this.selectedItems.length;i++)
   {
    console.log(this.addOnPrice[this.selectedItems[i]]);
    
      this.totalPremium=this.totalPremium + this.addOnPrice[this.selectedItems[i]];
   } 
   console.log('Premium : '+this.premium[+this.myModel]);
   
   this.totalPremium=this.totalPremium + this.premium[+this.myModel]
    return this.totalPremium;
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

    
    this.data.date = this.date;

    this.renewalService.updateData(this.data).subscribe(res => 
      {
        console.log(res);
      })
   }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RenewalService } from '../renewal.service';

@Component({
  selector: 'app-renewal-policy',
  templateUrl: './renewal-policy.component.html',
  styleUrls: ['./renewal-policy.component.css']
})
export class RenewalPolicyComponent implements OnInit {

  setCheckBox1 = false;
  setCheckBox2 = false;
  setCheckBox3 = false;
  setCheckBox4 = false;
  myModel: any;
  
  constructor(private renewalService: RenewalService, private router: ActivatedRoute) {
    this.myModel = 0;
   }

  ngOnInit(): void {
    console.log(this.router.snapshot.params['id']);
    this.getTwoWheelerDetails()
  }

  checkBox1(event:any){this.setCheckBox1 = event.checked;}
  checkBox2(event:any){this.setCheckBox2 = event.checked;}
  checkBox3(event:any){this.setCheckBox3 = event.checked;}
  checkBox4(event:any){this.setCheckBox4 = event.checked;}

  submit(){
  }

  category:string = "two-wheeler";
  insuranceType:string = "AutomobileInsurance";

   today = new Date();
   pipe = new DatePipe("en-US");
   date = this.pipe.transform(this.today,'yyyy-MM-dd')

  twoWheelerSummary:any = {
    customerPolicyId: this.renewalService.customerPolicyId,
    date: this.date,
    premium: "",
    duration: "",
    tax: 150,
    roadSideAssistance: "",
    personalProtectCover: "",
    engineProtect: "",
    consumablesCover: "",
    totalPremium: ""
   }

  fourWheelerSummary:any = {
    customerPolicyId: this.renewalService.customerPolicyId,
    date: this.date,
    premium: "",
    duration: "",
    tax: 150,
    roadSideAssistance: "",
    personalProtectCover: "",
    engineProtect: "",
    consumablesCover: "",
    totalPremium: ""
  }

  healthSummary:any = {
    customerPolicyId: this.renewalService.customerPolicyId,
    date: this.date,
    premium: "",
    duration: "",
    tax: 150,
    hospitalCashCover: "",
    personalAccidentCover: "",
    maternityCover: "",
    AyushCover: "",
    totalPremium: ""
  }

  lifeSummary:any = {
    customerPolicyId: this.renewalService.customerPolicyId,
    date: this.date,
    premium: "",
    duration: "",
    tax: 150,
    hospiCareBenefit: "",
    coverAgainstCriticalIllness: "",
    coverAgainstCriticalDisability: "",
    accidentalDeathBenefit: "",
    totalPremium: ""
  }

  getTwoWheelerDetails(){
    this.renewalService.getTwoWheelerData(this.twoWheelerSummary).subscribe
    (
      data => {
        console.log(data);
        if(data.policyType === "Automobile Insurance" && data.automobileInsurance.category === "car"){
          if(this.myModel == 0){
            this.fourWheelerSummary.premium = data.premium[0];
            console.log(data.premium[0]);
            this.fourWheelerSummary.duration = data.duration[0];
            console.log(data.duration[0]);
          }
          else if(this.myModel == 2){
            this.twoWheelerSummary.premium = data.premium[1];
            console.log(data.premium[1]);
            this.fourWheelerSummary.duration = data.duration[1];
            console.log(data.duration[1]);
          }
          else if(this.myModel == 3){
            this.twoWheelerSummary.premium = data.premium[2];
            console.log(data.premium[2]);
            this.fourWheelerSummary.duration = data.duration[2];
            console.log(data.duration[2]);
          }
          this.fourWheelerSummary.roadSideAssistance = data.addOnName[1][0];
          console.log(data.addOnName[1][0]);
          this.fourWheelerSummary.personalProtectCover = data.addOnName[1][1];
          console.log(data.addOnName[1][1]);
          this.fourWheelerSummary.engineProtect = data.addOnName[1][2];
          console.log(data.addOnName[1][2]);
          this.fourWheelerSummary.consumablesCover = data.addOnName[1][3];
          console.log(data.addOnName[1][3]);
        }
        else if(data.policyType === "Automobile Insurance" && data.automobileInsurance.category === "bike"){
          if(this.myModel == 0){
            this.fourWheelerSummary.premium = data.premium[0];
            console.log(data.premium[0]);
            this.fourWheelerSummary.duration = data.duration[0];
            console.log(data.duration[0]);
          }
          else if(this.myModel == 2){
            this.twoWheelerSummary.premium = data.premium[1];
            console.log(data.premium[1]);
            this.fourWheelerSummary.duration = data.duration[1];
            console.log(data.duration[1]);
          }
          else if(this.myModel == 3){
            this.twoWheelerSummary.premium = data.premium[2];
            console.log(data.premium[2]);
            this.fourWheelerSummary.duration = data.duration[2];
            console.log(data.duration[2]);
          }
          this.twoWheelerSummary.roadSideAssistance = data.addOnName[0][0];
          console.log(data.addOnName[0][0]);
          this.twoWheelerSummary.personalProtectCover = data.addOnName[0][1];
          console.log(data.addOnName[0][1]);
          this.twoWheelerSummary.engineProtect = data.addOnName[0][2];
          console.log(data.addOnName[0][2]);
          this.twoWheelerSummary.consumablesCover = data.addOnName[0][3]
          console.log(data.addOnName[0][3]);
        }
        else if(data.policyType === "Health Insurance"){
          if(this.myModel == 0){
            this.fourWheelerSummary.premium = data.premium[3];
            console.log(data.premium[0]);
            this.fourWheelerSummary.duration = data.duration[3];
            console.log(data.duration[3]);
          }
          else if(this.myModel == 2){
            this.twoWheelerSummary.premium = data.premium[4];
            console.log(data.premium[1]);
            this.fourWheelerSummary.duration = data.duration[4];
            console.log(data.duration[4]);
          }
          else if(this.myModel == 3){
            this.twoWheelerSummary.premium = data.premium[5];
            console.log(data.premium[2]);
            this.fourWheelerSummary.duration = data.duration[5];
            console.log(data.duration[5]);
          }
          this.twoWheelerSummary.premium = data.premium[2];
          console.log(data.premium[2]);
          this.twoWheelerSummary.hospitalCashCover = data.addOnName[2][0];
          console.log(data.addOnName[2][0]);
          this.twoWheelerSummary.personalAccidentCover = data.addOnName[2][1];
          console.log(data.addOnName[2][1]);
          this.twoWheelerSummary.engineProtect = data.addOnName[2][2];
          console.log(data.addOnName[2][2]);
          this.twoWheelerSummary.consumablesCover = data.addOnName[2][3];
          console.log(data.addOnName[2][3]);
        }
        else if(data.policyType === "Life Insurance"){
          if(this.myModel == 0){
            this.fourWheelerSummary.premium = data.premium[3];
            console.log(data.premium[0]);
            this.fourWheelerSummary.duration = data.duration[3];
            console.log(data.duration[3]);
          }
          else if(this.myModel == 2){
            this.twoWheelerSummary.premium = data.premium[4];
            console.log(data.premium[1]);
            this.fourWheelerSummary.duration = data.duration[4];
            console.log(data.duration[4]);
          }
          else if(this.myModel == 3){
            this.twoWheelerSummary.premium = data.premium[5];
            console.log(data.premium[2]);
            this.fourWheelerSummary.duration = data.duration[5];
            console.log(data.duration[5]);
          }
          this.twoWheelerSummary.premium = data.premium[3];
          console.log(data.premium[3])
          this.twoWheelerSummary.roadSideAssistance = data.addOnName[3][0];
          console.log(data.addOnName[3][0]);
          this.twoWheelerSummary.personalProtectCover = data.addOnName[3][1];
          console.log(data.addOnName[3][1]);
          this.twoWheelerSummary.engineProtect = data.addOnName[3][2];
          console.log(data.addOnName[3][2]);
          this.twoWheelerSummary.consumablesCover = data.addOnName[3][3]
          console.log(data.addOnName[3][3]);
        }
      }
    )
  }

}

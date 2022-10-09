import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Insurance } from '../insurance';
import { RenewCompletionComponent } from '../renew-completion/renew-completion.component';
import { RenewalService } from '../Services/renewal.service';

@Component({
  selector: 'app-renewal-policy',
  templateUrl: './renewal-policy.component.html',
  styleUrls: ['./renewal-policy.component.css']
})
export class RenewalPolicyComponent implements OnInit {

  addOnName: string[] = [];
  addOnPrice: number[] = [];
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


  constructor(public snackBar: MatSnackBar,private renewalService: RenewalService, private http: HttpClient, private dialog: MatDialog,private router:Router) {
    this.myModel = 0;
  }

  today = new Date();
  pipe = new DatePipe("en-US");
  date = this.pipe.transform(this.today, 'yyyy-MM-dd')

  ngOnInit(): void {
    this.myModel = 0
    console.log(localStorage.getItem('insurancePolicyId'));
    console.log(localStorage.getItem('customerPolicyId'))
    this.http.get('http://localhost:8080/insurance/api/vk1/policy-id/'+localStorage.getItem('insurancePolicyId')).subscribe((x: any) => {
    // this.http.get('http://localhost:8080/insurance/api/vk1/policy-id/'+localStorage.getItem('insurancePolicyId')).subscribe((x: any) => {
      console.log(x)
      this.http.put<Insurance>("http://localhost:8080/purchase/api/testing/"+localStorage.getItem('customerPolicyId'), x).subscribe((data: any) => {
      // this.http.put<Insurance>("http://localhost:8080/purchase/api/testing/"+localStorage.getItem('customerPolicyId'), x).subscribe((data: any) => {
     
        this.policyDescription = data.policyDescription;
        this.policyTitle = data.policyName;
        this.policyType = data.insuranceType;


        if (this.policyType == "AutoMobileInsurance") {
          this.policySubType = data.category;
        }
        for (let i = 0; i < data.policyDetails.length; i++) {
          this.premium.push(data.policyDetails[i].premiums);
          this.duration.push(data.policyDetails[i].durations);
        }
        for (let i = 0; i < data.addOnDetails.length; i++) {
          this.addOnName.push(data.addOnDetails[i].addOnName);
          this.addOnPrice.push(data.addOnDetails[i].addOnPremiums);
          this.setCheckBox.push(false);
        }
      }
      )
    })
  }

  data: any = {
    "customerPolicyId": null,
    "duration": null,
    "premium": null,
    "addOnName": [],
    "date": null
  }

  checkBox(event: any, i: any) {
    this.setCheckBox[i] = event.checked;

    if (event.checked) {
      this.selectedItems.push(i);
    }
    else {
      this.selectedItems = this.selectedItems.filter(m => m != i)

    }
  }
  calculate_premium() {
    this.totalPremium = 0;

    for (let i = 0; i < this.selectedItems.length; i++) {
      this.totalPremium = this.totalPremium + this.addOnPrice[this.selectedItems[i]];
    }
    this.totalPremium = this.totalPremium + this.premium[+this.myModel]
    return this.totalPremium;
  }
  onSubmit() {
    this.data.customerPolicyId = localStorage.getItem('customerPolicyId');
    this.data.date = this.date;
    this.data.premium = this.totalPremium;
    this.data.duration = this.duration[this.myModel];

    for(let i=0;i<this.selectedItems.length;i++){
      this.data.addOnName[i] = this.addOnName[this.selectedItems[i]];
    }

    this.renewalService.updateData(this.data).subscribe(res => {
      res = this.data;
      console.log(res);
      this.openSnackBar('Your policy has been renewed')
      this.router.navigateByUrl('/home/policies')
    })
  }
  openSnackBar(message: string) {

    this.snackBar.open(message, 'Ok', { duration: 3000 });
  }
}

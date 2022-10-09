import { D } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Insurance } from '../insurance';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css'],
  providers: [DatePipe]
})
export class PoliciesComponent {

  constructor(public dialog: MatDialog, private router: Router, private http: HttpClient, private datePipe: DatePipe, private snackbar: MatSnackBar) {
    this.currentDate = this.datePipe.transform(this.sysDate, 'yyyy-MM-dd');
    console.log(this.sysDate);
    console.log(this.currentDate);
  }

  purchasedPolicies: any;

  sysDate = new Date();
  currentDate: any;
  description: string[] = [];
  policyTitle: string[] = [];
  insuranceTitle: string[] = [];


  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  ngOnInit(): void {
    let response = this.http.get("https://insurify.stackroute.io/purchase/api/get/insurances/" + localStorage.getItem('logInEmailId'));
    // let response = this.http.get("https://insurify.stackroute.io/purchase/api/get/insurances/" + localStorage.getItem('logInEmailId'));
    response.subscribe((data) => {

      console.log(data);
      this.purchasedPolicies = data;
      for (let i = 0; i < this.purchasedPolicies.length; i++) {
        if (this.purchasedPolicies[i].automobileInsurance.engineNumber != 0) {
          this.insuranceTitle.push('Automobile Insurance');
        }
        else if (this.purchasedPolicies[i].healthInsurance.adults > 0) {
          this.insuranceTitle.push('Health Insurance');
        }
        else if (this.purchasedPolicies[i].lifeInsurance.height > 0) {
          this.insuranceTitle.push('Life Insurance');
        }
        else {
          this.insuranceTitle.push('NA');
        }
        this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policy-id/" + this.purchasedPolicies[i].insurancePolicyId).subscribe((x: any) => {
          // this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policy-id/" + this.purchasedPolicies[i].insurancePolicyId).subscribe((x: any) => {
          this.description.push(x.policyDescription);
          this.policyTitle.push(x.policyName)
          // this.policyTitle.push(x.insuranceType);
        })
      }

      console.log(this.purchasedPolicies[0].endDate);

      // console.log(this.purchasedPolicies[0].policyType);
      var dateDiff = this.currentDate - (this.purchasedPolicies[0].endDate[0] + 30);
      console.log(dateDiff);


    });
  }

  title = 'policies-details';
  searchedKeyword!: string;
  str: string = "";

  policies = [
    // {
    //   name: 'Automobile Insurance',
    //   policyNo: '013298',
    //   purchaseDate: '28-01-2022',
    //   endDate: '27-01-2023',
    //   sumInsured: '$3000',
    //   status: 'claimed'
    // },
    // {
    //   name: 'Health Insurance',
    //   policyNo: '0169182',
    //   purchaseDate: '28-01-2022',
    //   endDate: '27-01-2027',
    //   sumInsured: '$5000',
    //   status: "active"
    // },
    // {
    //   name: 'Life Insurance',
    //   policyNo: '2132951',
    //   purchaseDate: '21-11-2022',
    //   endDate: '20-11-2042',
    //   sumInsured: '$10000',
    //   status: "active"
    // },
    // {
    //   name: 'Crop Insurance',
    //   policyNo: '5132911',
    //   purchaseDate: '28-01-2022',
    //   endDate: '27-01-2023',
    //   sumInsured: '$2000',
    //   status: "active"
    // },
    // {
    //   name: 'ABC Insurance',
    //   policyNo: '011291',
    //   purchaseDate: '28-01-2022',
    //   endDate: '27-01-2023',
    //   sumInsured: '$3000',
    //   status: "active"
    // },
    // {
    //   name: 'XYZ Insurance',
    //   policyNo: '7132981',
    //   purchaseDate: '28-01-2022',
    //   endDate: '27-01-2023',
    //   sumInsured: '$3000',
    //   status: "active"
    // },
    // {
    //   name: 'Motor Insurance',
    //   policyNo: '013298',
    //   purchaseDate: '28-01-2022',
    //   endDate: '27-01-2023',
    //   sumInsured: '$3000',
    //   status: "active"
    // }
  ]

  openDialog(policy: any, i: any) {
    console.log(policy);
    this.router.navigateByUrl('/home/details');
    localStorage.setItem('policyName1', this.policyTitle[i]);
    localStorage.setItem('insuranceType1', this.insuranceTitle[i]);
    // localStorage.setItem('insuranceType','Automobile Insurance');
    localStorage.setItem('customerPolicyId', policy.customerPolicyId)
    console.log(localStorage.getItem('insuranceType1'));
    console.log(localStorage.getItem('customerPolicyId'));
    console.log(policy.endDate[0]);
    let endDateInDateFormat = this.datePipe.transform(new Date(policy.endDate[0]), 'yyyy-MM-dd');
    // this.datePipe.transform(this.sysDate, 'yyyy-MM-dd')
    console.log(endDateInDateFormat);

    let diff = this.currentDate - policy.endDate[0];
    console.log(diff);

    // console.log(this.currentDate-endDateInDateFormat);

    // const dialogRef = this.dialog.open(DetailsComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  renewPolicy(i: any) {
    localStorage.setItem("customerPolicyId", this.purchasedPolicies[i].customerPolicyId);
    localStorage.setItem("insurancePolicyId", this.purchasedPolicies[i].insurancePolicyId);
    setTimeout(() => { this.router.navigateByUrl("/home/renewal-home"); }, 2000)
    // this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policy-id/" + this.purchasedPolicies[i].insurancePolicyId).subscribe((data: any) => {
    //   // this.http.get("https://insurify.stackroute.io/insurance/api/vk1/policy-id/" + this.purchasedPolicies[i].insurancePolicyId).subscribe((data: any) => {
    //     console.log("hello from renew button");
    //     console.log(data)
    //     // this.description.push(x.policyDescription);
    //     // this.policyTitle.push(x.policyName))
    //     this.http.put<Insurance>("https://insurify.stackroute.io/purchase/api/getstatus/" + this.purchasedPolicies[i].customerPolicyId, data).subscribe((x: any) => {
    //     // this.http.put<Insurance>("https://insurify.stackroute.io/purchase/api/getstatus/" + this.purchasedPolicies[i].customerPolicyId, data).subscribe((x: any) => {
    //       this.str = x;
    //       console.log(x);

    //       if (this.str == null) {
    //         localStorage.setItem("customerPolicyId", this.purchasedPolicies[i].customerPolicyId);
    //         localStorage.setItem("insurancePolicyId", this.purchasedPolicies[i].insurancePolicyId);
    //         this.router.navigateByUrl("/home/renewal-home");
    //       }
    //       else {
    //         console.log(this.str);

    //         this.openSnackBar(x.toString());
    //       }
    //   },
    //     (error: any) => {
    //       console.log(error.error.text)
    //       this.openSnackBar((error.error.text).toString());
    //     })


    // })
  }
  claimPolicy(i: any) {
    console.log(i)
    localStorage.setItem("customerPolicyId", this.purchasedPolicies[i].customerPolicyId);
    localStorage.setItem("insurancePolicyId", this.purchasedPolicies[i].insurancePolicyId);
    this.router.navigateByUrl("/home/claim");
  }

  openSnackBar(message: string) {

    this.snackbar.open(message, 'Ok', { duration: 6000 });
  }

}

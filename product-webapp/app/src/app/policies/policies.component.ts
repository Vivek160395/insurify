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
    let response= this.http.get("http://localhost:8080/purchase/api/retrieveall/customerinsurances");
    response.subscribe((data)=>{
      
      console.log(data);
      this.purchasedPolicies = data;
      for (let i = 0; i < this.purchasedPolicies.length; i++) {
        if (this.purchasedPolicies[i].healthInsurance == null && this.purchasedPolicies[i].lifeInsurance == null) {
          this.insuranceTitle.push('Automobile Insurance');
        }
        else if (this.purchasedPolicies[i].healthInsurance == null && this.purchasedPolicies[i].automobileInsurance == null) {
          this.insuranceTitle.push('Life Insurance');
        }
        else if (this.purchasedPolicies[i].automobileInsurance == null && this.purchasedPolicies[i].lifeInsurance == null) {
          this.insuranceTitle.push('Health Insurance');
        }
        else {
          this.insuranceTitle.push('NA');
        }

        this.http.get("http://localhost:8080/insurance/api/vk1/policy-id/"+this.purchasedPolicies[i].insurancePolicyId).subscribe((x:any)=>{
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
    {
      name: 'Automobile Insurance',
      policyNo: '013298',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured: '$3000',
      status: 'claimed'
    },
    {
      name: 'Health Insurance',
      policyNo: '0169182',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2027',
      sumInsured: '$5000',
      status: "active"
    },
    {
      name: 'Life Insurance',
      policyNo: '2132951',
      purchaseDate: '21-11-2022',
      endDate: '20-11-2042',
      sumInsured: '$10000',
      status: "active"
    },
    {
      name: 'Crop Insurance',
      policyNo: '5132911',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured: '$2000',
      status: "active"
    },
    {
      name: 'ABC Insurance',
      policyNo: '011291',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured: '$3000',
      status: "active"
    },
    {
      name: 'XYZ Insurance',
      policyNo: '7132981',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured: '$3000',
      status: "active"
    },
    {
      name: 'Motor Insurance',
      policyNo: '013298',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured: '$3000',
      status: "active"
    }
  ]

  openDialog(policy: any, i: any) {
    console.log(policy);
    this.router.navigateByUrl('/home/details');
    localStorage.setItem('policyName', this.policyTitle[i]);
    localStorage.setItem('insuranceType', this.insuranceTitle[i]);
    // localStorage.setItem('insuranceType','Automobile Insurance');
    localStorage.setItem('customerPolicyId', policy.customerPolicyId)
    console.log(localStorage.getItem('insuranceType'));
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

  renewPolicy(policy: any) {

    this.http.get("http://localhost:8080/insurance/api/vk1/policy-id/"+policy.insurancePolicyId).subscribe((data:any)=>{
    console.log("hello from renew button");
      
    // this.description.push(x.policyDescription);
      // this.policyTitle.push(x.policyName))
      this.http.put("http://localhost:8080/purchase/api/getstatus/"+policy.customerPolicyId, data).subscribe((x:any)=>{
        this.str=x;
        console.log(x);
        
        if(this.str==null){
          this.router.navigateByUrl("/home/renewal-home");
        }
        else {
          this.openSnackBar(x);
        }
      })


    })
  }

  openSnackBar(message: string) {

    this.snackbar.open(message, 'Ok', { duration: 6000 });
  }

}

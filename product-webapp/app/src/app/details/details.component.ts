import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  insuranceType: string | null;
  policyId:any;
  policies:any;
  healthInsuredInfo:any;
  claims:any;
  renewals:any;
  claimDatesArray:any;
  claimSumArray:any;
  claimStatusArray:any;

 
  constructor(private http:HttpClient) {
     this.insuranceType= localStorage.getItem('insuranceType');
     this.policyId= localStorage.getItem('customerPolicyId');
  }

  ngOnInit(): void {
    let response= this.http.get("http://localhost:8084/api/retrieveall/customerinsurances");
    response.subscribe((data)=>{
      console.log(data);
      this.policies=data;
      // for(var i=0;i<this.policies.length;i++){
      //   if(this.policies[i].customerPolicyId==this.policyId){
      //     this.policies[i].startDate.length = this.renewals;
      //     this.policies[i].claimStatus.length = this.claims;
      //     for(var j=0;j<i;j++){
      //       this.claimDatesArray[j]=this.policies[i].claimDate[j];
      //       console.log(this.claimDatesArray);
            
      //     }
      //   }
        
         
      // console.log(this.policies[0].policyType);
      // For="let details of data"
      // this.healthInsuredInfo=data.healthInsurance.insuredInfo;
      // }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { RenewalService } from '../renewal.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-renewal-policy-home',
  templateUrl: './renewal-policy-home.component.html',
  styleUrls: ['./renewal-policy-home.component.css']
})
export class RenewalPolicyHomeComponent implements OnInit {

  constructor(private renewalService: RenewalService, private router: ActivatedRoute) {}

  category:string = "";
  insuranceType:string = "";

  ngOnInit():void {
    this.getPolicyDetails()

    console.warn(this.router.snapshot.params['customerPolicyId'])
    
  }

  vehicle :any = {
    registrddNo: "",
    category: "",
    engineNumber: "",
    chasisNumber: ""
  }


  data:any = {
    customerPolicyId: "",
    policyId : "",
    insuredName : "",
    pinCode : "",
    insurancePeriod : "",
    policyIssuenceDate : "",
    ownerNumber : "",
    ownerEmail : ""
  }

  getPolicyDetails(){
    this.renewalService.userPolicyDetails().subscribe
    (
      data1 => {
        if(data1.policyType === "Automobile Insurance" && data1.automobileInsurance.category === "car"){
          console.log(data1);
          this.data.customerPolicyId = data1.customerPolicyId;
          this.data.policyId = data1.insurancePolicyId;
          this.data.insuredName = data1.nameOfNominee;
          this.data.pinCode = data1.pincode;
          this.data.insurancePeriod = data1.duration;
          this.data.policyIssuenceDate = data1.startDate;
          this.data.ownerNumber = data1.mobile;
          this.data.ownerEmail = data1.email;
          this.vehicle.registrddNo = data1.automobileInsurance.vehicleRegistrationNumber;
          console.log(data1.automobileInsurance.vehicleRegistrationNumber)
          this.vehicle.category = data1.automobileInsurance.category;
          this.vehicle.engineNumber = data1.automobileInsurance.engineNumber;
          this.vehicle.chasisNumber = data1.automobileInsurance.chassisNumber;
          }
          else if(data1.policyType === "Automobile Insurance" && data1.automobileInsurance.category === "bike"){
            console.log(data1);
            this.data.customerPolicyId = data1.customerPolicyId;
            this.data.policyId = data1.insurancePolicyId;
            this.data.insuredName = data1.nameOfNominee;
            this.data.pinCode = data1.pincode;
            this.data.insurancePeriod = data1.duration;
            this.data.policyIssuenceDate = data1.startDate;
            this.data.ownerNumber = data1.mobile;
            this.data.ownerEmail = data1.email;
            this.vehicle.registrddNo = data1.automobileInsurance.vehicleRegistrationNumber;
            console.log(data1.automobileInsurance.vehicleRegistrationNumber)
            this.vehicle.category = data1.automobileInsurance.category;
            this.vehicle.engineNumber = data1.automobileInsurance.engineNumber;
            this.vehicle.chasisNumber = data1.automobileInsurance.chassisNumber;
          }
          else if(data1.policyType === "Health Insurance"){
            console.log(data1);
            this.data.customerPolicyId = data1.customerPolicyId;
            this.data.policyId = data1.insurancePolicyId;
            this.data.insuredName = data1.nameOfNominee;
            this.data.pinCode = data1.pincode;
            this.data.insurancePeriod = data1.duration;
            this.data.policyIssuenceDate = data1.startDate;
            this.data.ownerNumber = data1.mobile;
            this.data.ownerEmail = data1.email;
          }
          else if(data1.policyType === "Life Insurance"){
            console.log(data1);
            this.data.customerPolicyId = data1.customerPolicyId;
            this.data.policyId = data1.insurancePolicyId;
            this.data.insuredName = data1.nameOfNominee;
            this.data.pinCode = data1.pincode;
            this.data.insurancePeriod = data1.duration;
            this.data.policyIssuenceDate = data1.startDate;
            this.data.ownerNumber = data1.mobile;
            this.data.ownerEmail = data1.email;
          }
        }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RenewalService } from '../Services/renewal.service';

@Component({
  selector: 'app-renewal-policy-home',
  templateUrl: './renewal-policy-home.component.html',
  styleUrls: ['./renewal-policy-home.component.css']
})
export class RenewalPolicyHomeComponent implements OnInit {

  constructor(private renewalService: RenewalService,public router:Router) { }

  category: string = "";
  insuranceType: string = "";

  ngOnInit(): void {
    this.getPolicyDetails()
   setInterval( ()=>{this.getPolicyDetails()},1000)
    // this.router.navigateByUrl('/home/renewal-update')
    
  }

  vehicle: any = {
    registrddNo: "",
    category: "",
    engineNumber: "",
    chasisNumber: ""
  }


  data: any = {
    customerPolicyId: "",
    policyId: "",
    insuredName: "",
    pinCode: "",
    insuranceEndDate: "",
    policyIssuenceDate: "",
    ownerNumber: "",
    ownerEmail: ""
  }

  getPolicyDetails() {
    this.renewalService.getPolicyDetails().subscribe(
      (res:any) => {
        this.insuranceType = res.insuranceType;
        this.category = res.category;
        this.data.policyId = res.policyId;
        // console.log(this.data.policyId);
        // // console.log(this.category);
        // // console.log(this.insuranceType);
      }
    )
    this.renewalService.userPolicyDetails().subscribe
      (
        (data1:any) => {
          // console.log(data1)
          if (this.insuranceType === "AutomobileInsurance" && this.category === "car") {
            this.data.customerPolicyId = data1.customerPolicyId;
            this.data.policyId = data1.insurancePolicyId;
            this.data.insuredName = data1.nameOfNominee;
            this.data.pinCode = data1.pincode;
            this.data.insuranceEndDate = data1.endDate;
            this.data.policyIssuenceDate = data1.startDate;
            this.data.ownerNumber = data1.mobile;
            this.data.ownerEmail = data1.email;
            this.vehicle.registrddNo = data1.automobileInsurance.vehicleRegistrationNumber;
            this.vehicle.category = data1.automobileInsurance.category;
            this.vehicle.engineNumber = data1.automobileInsurance.engineNumber;
            this.vehicle.chasisNumber = data1.automobileInsurance.chassisNumber;
          }
          else if (this.insuranceType === "AutomobileInsurance" && this.category === "bike") {
            this.data.customerPolicyId = data1.customerPolicyId;
            this.data.policyId = data1.insurancePolicyId;
            this.data.insuredName = data1.name;
            this.data.pinCode = data1.pincode;
            this.data.insuranceEndDate = data1.endDate;
            this.data.policyIssuenceDate = data1.startDate;
            this.data.ownerNumber = data1.mobile;
            this.data.ownerEmail = data1.email;
            this.vehicle.registrddNo = data1.automobileInsurance.vehicleRegistrationNumber;
            this.vehicle.category = data1.automobileInsurance.category;
            this.vehicle.engineNumber = data1.automobileInsurance.engineNumber;
            this.vehicle.chasisNumber = data1.automobileInsurance.chassisNumber;
          }
          else if (this.insuranceType === "HealthInsurance") {
            // console.log(data1);
            this.data.customerPolicyId = data1.customerPolicyId;
            this.data.policyId = data1.insurancePolicyId;
            this.data.insuredName = data1.name;
            this.data.pinCode = data1.pincode;
            this.data.insuranceEndDate = data1.endDate;
            this.data.policyIssuenceDate = data1.startDate[0];
            this.data.ownerNumber = data1.mobile;
            this.data.ownerEmail = data1.email;
          }
          else if (this.insuranceType === "LifeInsurance") {
            this.data.customerPolicyId = data1.customerPolicyId;
            this.data.policyId = data1.insurancePolicyId;
            this.data.insuredName = data1.name;
            this.data.pinCode = data1.pincode;
            this.data.insuranceEndDate = data1.endDate;
            this.data.policyIssuenceDate = data1.startDate[0];
            this.data.ownerNumber = data1.mobile;
            this.data.ownerEmail = data1.email;
          }
        }
      )
  }
}

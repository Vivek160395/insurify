import { Component, OnInit } from '@angular/core';
import { RenewalService } from '../renewal.service';

@Component({
  selector: 'app-renewal-policy-home',
  templateUrl: './renewal-policy-home.component.html',
  styleUrls: ['./renewal-policy-home.component.css']
})
export class RenewalPolicyHomeComponent implements OnInit {

  constructor(private renewalService: RenewalService) {}

  category:string | undefined;
  insuranceType:string = "";

  ngOnInit():void {
    this.getDetails()
    this.getPolicyDetails()
    
  }

  vehicle :any = {
    registrddNo: "",
    category: "",
    engineNumber: "",
    chasisNumber: ""
  }


  data:any = {
    policyId : "",
    insuredName : "",
    pinCode : "",
    insurancePeriod : "",
    policyIssuenceDate : "",
    ownerNumber : "",
    ownerEmail : ""
  }


  getDetails(){
    this.renewalService.getVehicleData().subscribe
    (
      data1 => {
        console.log(data1);

        for(let i=0; i<data1.length;i++){
          console.log("inside")
          if(data1[i].email === this.renewalService.email){
            console.log("if condition")
            this.vehicle.registrddNo = data1[i].vehicleRegistrationNumber;
            console.log(data1[i].vehicleRegistrationNumber)
          this.vehicle.category = data1[i].category;
          this.vehicle.engineNumber = data1[i].engineNumber;
          this.vehicle.chasisNumber = data1[i].chassisNumber;
          }
        }
      });
  }
  getPolicyDetails(){
    this.renewalService.getData().subscribe
    (
      data1 => {
        for(var i=0; i<data1.length; i++){
          if(data1[i].email === this.renewalService.email){
            console.log(data1);
          this.data.policyId = data1[i].insurancePolicyId;
          this.data.insuredName = data1[i].nameOfNominee;
          this.data.pinCode = data1[i].pincode;
          this.data.insurancePeriod = data1[i].duration;
          this.data.policyIssuenceDate = data1[i].startDate;
          this.data.ownerNumber = data1[i].mobile;
          this.data.ownerEmail = data1[i].email;
          }
        }
      }
    )
  }

}

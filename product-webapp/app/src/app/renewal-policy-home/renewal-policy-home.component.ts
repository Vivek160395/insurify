import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-renewal-policy-home',
  templateUrl: './renewal-policy-home.component.html',
  styleUrls: ['./renewal-policy-home.component.css']
})
export class RenewalPolicyHomeComponent implements OnInit {

  constructor(private http:HttpClient) {}

  category:string | undefined;
  insuranceType:string = "LifeInsurance";

  ngOnInit(): void {
  }

  policyId: string = "P0123457";
  insuredName: string = "Vivek";
  pinCode: string = "609609";
  insurancePeriod: string = "24 Oct 21 (00:00 hrs) to 23 Oct 22 (23:59hrs)";
  policyIssuenceDate: string = "21 Oct 2021";
  ownerNumber: string = "8220852467";
  ownerEmail: string = "vivekkrishna005@gmail.com";

  registrddNo: string = "PY02Q6581";
  model   : string = "FZ Version2";
  registrdYear: string = "2016";
  engineNumber: string = "G3C8E0369831";
  chasisNumber: string = "ME1RG0729G0243418";

  formData:any = new FormGroup({
    policyId : new FormControl(this.policyId),
    insuredName: new FormControl(this.insuredName),
    pincode: new FormControl(this.pinCode),
    insurancePeriod: new FormControl(this.insurancePeriod),
    policyIssuenceDate: new FormControl(this.policyIssuenceDate),
    ownerNumber: new FormControl(this.ownerNumber),
    ownerEmail: new FormControl(this.ownerEmail)
  })

  getDetails(){
    this.http.get("htt://localhost:4200/api/vk1/policy-id/"+this.policyId).subscribe(data => console.log(data))
  }
}

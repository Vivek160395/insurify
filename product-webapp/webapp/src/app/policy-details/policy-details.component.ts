import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export class RadioNgModelExample {
  BikePolicies: string;
  policies: string[] = ['Comprehensive policy', 'Standalone own damage policy', 'Third party cover'];

  FourWheelPolicy: string;
  fourwheelpolicies: string[]= ['Private car package policy','Stand-alone own-damage car insurance','Third party car insurance']
}
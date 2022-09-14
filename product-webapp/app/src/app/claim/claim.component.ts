import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Claim } from '../claim';


 
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', ],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', ],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', ],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
  }
  
  policies = [
    {
      
      policyNo: '09898967',
      userName: "ajith",
      contactDetails: "988798877",
      insuranceType:'Motor Insurance',
      purchaseDate: '28-06-2022',
      endDate: '27-01-2023',
    },
  ]
  

}

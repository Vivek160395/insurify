import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { PolicyAdvsior } from '../policy-advsior';
import { PolicyAdvisorService } from '../policy-advisor.service';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-policy-advisor-update',
  templateUrl: './policy-advisor-update.component.html',
  styleUrls: ['./policy-advisor-update.component.css']
})
export class PolicyAdvisorUpdateComponent implements OnInit {


  update:any = {
  }

  policyAdvisor: PolicyAdvsior = new PolicyAdvsior();
  constructor(private policyadvisorService: PolicyAdvisorService) { }

  ngOnInit(): void {
  }

//Methods for chips component
addOnBlur = true;
readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
visible = true;  
selectable = true;  
removable = true;  

fruits: Fruit[] = [  
  {name: 'Health Insurance'},  
  {name: 'Life Insurance'},  
  {name: 'Two-Wheeler Insurance'},
  {name: 'Four-Wheeler Insurance'}  
];  

add(event: MatChipInputEvent): void {  
  const input = event.input;  
  const value = event.value;  
  // Add our fruit  
  if ((value || '').trim()) {  
    this.fruits.push({name: value.trim()});  
  }  
  // Reset the input value  
  if (input) {  
    input.value = '';  
  }  
}  

remove(fruit: Fruit): void {  
  const index = this.fruits.indexOf(fruit);  

  if (index >= 0) {  
    this.fruits.splice(index, 1);  
  }  
}  


//form-group
PolicyAdvisorUpdate = new FormGroup({
name: new FormControl('',[Validators.pattern('(^a-zA-Z)*')]),
phoneNumber: new FormControl('', [Validators.pattern('(^0-9)')]),
aadharNo: new FormControl('', [Validators.pattern('(^0-9A-Z)*')]),
panNo: new FormControl('', [Validators.pattern('(^0-9)*')]),
YearsOfExperience: new FormControl('', [Validators.pattern('^(0-9)*')]),
gender: new FormControl(''),
dateOfBirth: new FormControl(''),
profilePic: new FormControl(''),
category: new FormControl('')

});

UpdateSubmitted(data: any){
//   this.policyAdvisor.name = data.value.name;
//   this.policyAdvisor.phoneNumber = data.value.phoneNumber;
//   this.policyAdvisor.YearsOfExperience = data.value.YearsOfExpereince;
//   this.policyAdvisor.aadharNo = data. value.aadharNo;
//   this.policyAdvisor.panNo = data.value.panNo;

//   this.policyAdvisor.gender = data.value.gender;
//   this.policyAdvisor.dateOfBirth =data.value.dateOfBirth;


//   console.log(this.policyAdvisor);
// this.policyadvisorService.updateAdvisorDetails(this.policyAdvisor).subscribe((response)=>{
//   console.log("Policy advisor details updated", response);
// });
}


// get name(): FormControl{
//   return this.PolicyAdvisorUpdate.get('name') as FormControl;
// }

// get gender(): FormControl{
//   return this.PolicyAdvisorUpdate.get('gender') as FormControl;
// }

// get dateOfBirth(): FormControl{
//   return this.PolicyAdvisorUpdate.get('dateOfBirth') as FormControl;
// }

// get phoneNumber(): FormControl{
//   return this.PolicyAdvisorUpdate.get('phoneNumber') as FormControl;
// }

// get aadharNo(): FormControl{
//   return this.PolicyAdvisorUpdate.get('aadharNo') as FormControl;
// }

// get panNo(): FormControl{
//   return this.PolicyAdvisorUpdate.get('panNo') as FormControl;
// }

// get YearsOfExpereince(): FormControl{
//   return this.PolicyAdvisorUpdate.get('YearsOfExperience') as FormControl;
// }

// get profilePic(): FormControl{
//   return this.PolicyAdvisorUpdate.get('profilePic') as FormControl;

//}
// get category(): FormControl{
//   return this.PolicyAdvisorUpdate.get('category') as FormControl;
// }






}

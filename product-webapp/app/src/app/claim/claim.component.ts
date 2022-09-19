import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { Claim } from '../claim';
import { DetailsComponent } from '../details/details.component';


 
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})

export class ClaimComponent implements OnInit {
   today: number = Date.now();


  
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,public dialog: MatDialog) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
    
  }
  
  
  openDialog() {
    const dialogRef = this.dialog.open(DetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
 public onFileChanged(event:any) {
  //Select File
  
  }
//   insuranceForms = new FormGroup({
//     insuranceType    : new FormControl("", [Validators.required]),
//     policyId         : new FormControl("", [Validators.required]),
//     policyName       : new FormControl("", [Validators.required]),
//     policyDescription: new FormControl("", [Validators.required]),
//     category         : new FormControl("",[Validators.required]),
//     modelsAllowed    : new FormControl("",[Validators.required]),
   
//   })
// contactForm = new FormGroup({
//   firstname: new FormControl(),
//   lastname: new FormControl(),
//   email: new FormControl(),
//   gender: new FormControl(),
//   isMarried: new FormControl(),
//   country: new FormControl()
// })


// onSubmit() {
//   console.log(this.contactForm.value);
// }
policyId: string = "23232334";
  insuredName: string = "raj";
  

  formData:any = new FormGroup({
    policyId : new FormControl(this.policyId),
    insuredName: new FormControl(this.insuredName),

  })
}



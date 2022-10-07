
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, X } from '@angular/cdk/keycodes';
import { Insurance } from '../insurance';
import { MatDialog } from '@angular/material/dialog';

import { PreviewMarkupComponent } from '../preview-markup/preview-markup.component';
import { RecommendationServiceService } from '../Services/recommendation-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { last } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-insurance-policy',
  templateUrl: './add-insurance-policy.component.html',
  styleUrls: ['./add-insurance-policy.component.css']
})
export class AddInsurancePolicyComponent implements OnInit {
  bikeList = ['KTM 390 Duke', 'KTM 125 Duke', 'Heroflareon', 'Honda SP 125', 'Honda Shine', 'Honda H`ness CB350', 'TVS Apache RTR 160', 'TVS Ronin', 'TVS Apache RTR 200 4V', 'Hero Splendor Plus', 'Hero HF Deluxe', '', '']
  carList = ['Hyundai Creta', 'Hyundai Venue', 'Hyundai i20', 'Toyota Fortuner', 'Toyota Innova Crysta', 'Toyota Urban Cruiser', 'Tata Tiago', 'Tata Harrier', 'Tata Safari', 'Maruti Brezza', 'Maruti Swift']
  bikeGroups: bikeCompany[] = [
    {
      name: 'Honda',
      bikeList: [
        { value: 'Honda SP 125', viewValue: 'Honda SP 125' },
        { value: 'Honda Shine', viewValue: 'Honda Shine' },
        { value: 'Honda H`ness CB350', viewValue: 'Honda H`ness CB350' },
      ],
    },
    {
      name: 'TVS',
      bikeList: [
        { value: 'TVS Apache RTR 160', viewValue: 'TVS Apache RTR 160' },
        { value: 'TVS Ronin', viewValue: 'TVS Ronin' },
        { value: 'TVS Apache RTR 200 4V', viewValue: 'TVS Apache RTR 200 4V' },
      ],
    },
    {
      name: 'Hero',
      bikeList: [
        { value: 'Hero Splendor Plus', viewValue: 'Hero Splendor Plus' },
        { value: 'Hero HF Deluxe', viewValue: 'Hero HF Deluxe' },
        { value: 'Heroflareon', viewValue: 'Hero Flareon' },
      ],
    },
    {
      name: 'KTM',
      bikeList: [
        { value: 'KTM 390 Duke', viewValue: 'KTM 390 Duke' },
        { value: 'KTM 125 Duke', viewValue: 'KTM 125 Duke' },
      ],
    },
  ];

  carGroups: carCompany[] = [
    {
      name: 'Hyundai',
      carList: [
        { value: 'Hyundai Creta', viewValue: 'Hyundai Creta' },
        { value: 'Hyundai Venue', viewValue: 'Hyundai Venue' },
        { value: 'Hyundai i20', viewValue: 'Hyundai i20' },
      ],
    },
    {
      name: 'Toyota',
      carList: [
        { value: 'Toyota Fortuner', viewValue: 'Toyota Fortuner' },
        { value: 'Toyota Innova Crysta', viewValue: 'Toyota Innova Crysta' },
        { value: 'Toyota Urban Cruiser', viewValue: 'Toyota Urban Cruiser' },
      ],
    },
    {
      name: 'Tata',
      carList: [
        { value: 'Tata Tiago', viewValue: 'Tata Tiago' },
        { value: 'Tata Harrier', viewValue: 'Tata Harrier' },
        { value: 'Tata Safari', viewValue: 'Tata Safari' },
      ],
    },
    {
      name: 'Maruti',
      carList: [
        { value: 'Maruti Brezza', viewValue: 'Maruti Brezza' },
        { value: 'Maruti Swift', viewValue: 'Maruti Swift' },
      ],
    },
  ];

  num: number = 0;
  policyarray: policyDetails[] = []
  premiumarray: premiumdetails[] = []
  briefInput: string = '';
  descriptionInput: string = '';
  valueVariable: string = '';
  xyz: policyDetails = {
    briefs: '',
    descriptions: ''
  }
  flags: boolean[] = [true];
  flag: boolean[] = [true]
  filestatus: boolean = false
  openSnackBar(message: string) {

    this.snackBar.open(message, 'Ok', { duration: 3000 });
  }


  constructor(public snackBar: MatSnackBar, public http: HttpClient, public dialog: MatDialog, private service: RecommendationServiceService, private route: Router) { }

  openDialog() {
    this.dialog.open(PreviewMarkupComponent, { data: this.valueVariable })
  }

  insuranceForms = new FormGroup({
    insuranceType: new FormControl("", [Validators.required]),
    policyId: new FormControl("",),
    policyName: new FormControl("", [Validators.required]),
    policyDescription: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    modelsAllowed: new FormControl([], [Validators.required]),
    policyDetails: new FormArray([new FormGroup({
      premiums: new FormControl("", [Validators.required, Validators.min(1)]),
      durations: new FormControl("", [Validators.required, Validators.min(1)]),
      sumInsure: new FormControl("", [Validators.required, Validators.min(1)]),
      adults1: new FormControl("", [Validators.min(1), Validators.required]),
      adults2: new FormControl("", [Validators.min(1), Validators.required]),
      adults3: new FormControl("", [Validators.min(1), Validators.required]),
      kids: new FormControl("", [Validators.min(1), Validators.required]),
      minSalary: new FormControl("", [Validators.required, Validators.min(1)]),
      maxSalary: new FormControl("", [Validators.required, Validators.min(1)])
    })]),
    policyBenefits: new FormArray([
      new FormGroup({
        brief: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required])
      })], [Validators.required]),
    addOnDetails: new FormArray([
      new FormGroup({
        addOnName: new FormControl("", [Validators.required]),
        addOnDescription: new FormControl("", [Validators.required]),
        addOnPremiums: new FormControl("", [Validators.required])
      })
    ], [Validators.required]),
    policyDocuments: new FormControl("", [Validators.required]),
    fileSource: new FormControl("",),
    userEmail: new FormControl("", [Validators.required])
  });

  get insuranceFormControl() {
    return <FormArray>this.insuranceForms.controls['policyBenefits'];
  }
  userType = localStorage.getItem('UserType')
  type: boolean = false;
  others: boolean = true;
  filePath: any = '';
  ngOnInit(): void {
    if (this.userType != "insuranceprovider") {
      this.type = true;
      this.others = false;
    }
    this.insuranceForms.get('policyId')?.setValue(this.id.toString())
    this.insuranceForms.get('userEmail')?.setValue(localStorage.getItem('logInEmailId'));
    this.insuranceForms.get('policyId')!.disable()
  }
  id = Math.floor(Math.random() * 1000000 + 100000);
  formData1 = new FormData;
  public onFileChanged(event: any) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData1.append("imageFile", event.target.files[0]);

      this.insuranceForms.patchValue({
        fileSource: file
      });
      this.filestatus = true
    }
  }
  modifyform() {
    const obj = this.insuranceForms
    let control = <FormArray>this.insuranceForms.get('policyBenefits')
    console.log("Inside method");
    let arr = []
    // for(let i=0;i<control.length;i++)
    // {
    //   if(control.at(i).valid)
    //   {
    //     for(let j=0;j<i;j++)
    //     {
    //       if(JSON.stringify(control.at(i).value) === JSON.stringify(control.at(j).value))
    //       {
    //         console.log("Inside method1");
    //         arr.push(i)
    //         continue
    //       }
    //     }
    //   }
    // }
    for (let i = 0; i < control.length; i++) {
      if (control.at(i).invalid) {
        console.log("Removing method");
        arr.push(i)
      }
    }
    let count1 = 0
    for (let ij = 0; ij < arr.length; ij++) {
      let z = arr[ij] - count1
      control.removeAt(z);
      count1++
    }

    let control1 = <FormArray>this.insuranceForms.get('addOnDetails')
    let arr1 = []
    for (let i = 0; i < control1.length; i++) {
      if (control1.at(i).invalid) {
        arr1.push(i)
      }
      // for(let j=0;j<i;j++)
      // {
      //   if(JSON.stringify(control1.at(i).value) === JSON.stringify(control1.at(j).value))
      //   {
      //     control1.removeAt(i)
      //   }
      // }
    }
    let count2 = 0
    for (let ij = 0; ij < arr.length; ij++) {
      let z = arr1[ij] - count2
      control1.removeAt(z);
      count2++
    }
    console.log("After removing add on details");
    let x = <FormArray>this.insuranceForms.get('policyDetails')
    let remove = []
    for (let i = 0; i < x.length; i++) {
      console.log('Automobile INSURANCE:' + (x.at(i).get('premiums')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid && (obj.get('insuranceType')!.value == 'AutoMobileInsurance')));
      console.log('Health INSURANCE:' + (x.at(i).get('adults1')?.valid && x.at(i).get('adults2')?.valid && x.at(i).get('adults3')?.valid && x.at(i).get('kids')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid));
      console.log('Life INSURANCE:' + (x.at(i).get('premiums')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid && x.at(i).get('minSalary')?.valid && x.at(i).get('maxSalary')?.valid));
      if (!((x.at(i).get('premiums')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid && (obj.get('insuranceType')!.value == 'AutoMobileInsurance'))
        || (x.at(i).get('adults1')?.valid && x.at(i).get('adults2')?.valid && x.at(i).get('adults3')?.valid && x.at(i).get('kids')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid)
        || (x.at(i).get('premiums')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid && x.at(i).get('minSalary')?.valid && x.at(i).get('maxSalary')?.valid))) {
        // if(!(x.at(i).get('adults1')?.valid&&x.at(i).get('adults2')?.valid&&x.at(i).get('adults3')?.valid&&x.at(i).get('kids')?.valid&&x.at(i).get('durations')?.valid&&x.at(i).get('sumInsure')?.valid)){
        //   if(!(x.at(i).get('premiums')?.valid&&x.at(i).get('durations')?.valid&&x.at(i).get('sumInsure')?.valid&&x.at(i).get('minSalary')?.valid&&x.at(i).get('maxSalary')?.valid)){

        //     remove.push(i)
        //   }
        // }
        console.log(x.at(i).value);

        remove.push(i)
      }
      else {
        console.log('Entering else');

        for (let j = 0; j < i; j++) {
          console.log('Durations :' + x.at(i).get('durations')!.value + "," + x.at(j).get('durations')!.value);
          console.log('sumInsure :' + x.at(i).get('sumInsure')!.value + "," + x.at(j).get('sumInsure')!.value);
          if ((x.at(i).get('durations')!.value == x.at(j).get('durations')!.value) && (x.at(i).get('sumInsure')!.value == x.at(j).get('sumInsure')!.value)) {
            console.log("I: " + i + "J: " + j)
            if (remove.indexOf(i) == -1)
              remove.push(i)
          }
        }
      }
      // else if(!(x.at(i).get('adults1')?.valid&&x.at(i).get('adults2')?.valid&&x.at(i).get('adults3')?.valid&&x.at(i).get('kids')?.valid&&x.at(i).get('durations')?.valid&&x.at(i).get('sumInsure')?.valid)){
      //   // x.removeAt(i)
      //   remove.push(i)
      // }
      // else if(!(x.at(i).get('premiums')?.valid&&x.at(i).get('durations')?.valid&&x.at(i).get('sumInsure')?.valid&&x.at(i).get('minSalary')?.valid&&x.at(i).get('maxSalary')?.valid)){
      //   // x.removeAt(i)
      //   remove.push(i)
      // }

    }

    console.log("After removing add on details");
    let count = 0
    console.log(remove);
    for (let ij = 0; ij < remove.length; ij++) {
      let z = remove[ij] - count
      x.removeAt(z);
      count++
    }

  }
  check_validity() {
    const obj = this.insuranceForms
    let validity1 = obj.get('insuranceType')?.valid && obj.get('policyName')?.valid && obj.get('policyDescription')?.valid
    let validity2 = this.check_validity2()
    let validity3 = obj.get('policyDocuments')?.valid && obj.get('fileSource')?.valid && obj.get('userEmail')?.valid

    if (obj.get('insuranceType')?.value === 'AutoMobileInsurance') {
      let validity4 = obj.get('modelsAllowed')?.valid && obj.get('category')?.valid
      return !(validity1 && validity2 && validity3 && validity4)
    }
    return !(validity1 && validity2 && validity3)
  }
  check_validity1() {
    const obj = this.insuranceForms
    let validity1 = obj.get('insuranceType')?.valid && obj.get('policyName')?.valid && obj.get('policyDescription')?.valid
    return validity1
  }
  check_validity2() {
    const obj = this.insuranceForms
    let x = <FormArray>obj.get('policyDetails')
    let flag1 = false, flag2 = false, flag3 = false
    for (let i = 0; i < x.length; i++) {
      if (x.at(i).get('premiums')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid && (obj.get('insuranceType')!.value == 'AutoMobileInsurance')) {
        flag1 = true
        break
      }
      if (x.at(i).get('adults1')?.valid && x.at(i).get('adults2')?.valid && x.at(i).get('adults3')?.valid && x.at(i).get('kids')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid) {
        flag1 = true
        break
      }
      if (x.at(i).get('premiums')?.valid && x.at(i).get('durations')?.valid && x.at(i).get('sumInsure')?.valid && x.at(i).get('minSalary')?.valid && x.at(i).get('maxSalary')?.valid) {
        flag1 = true
        break
      }
    }
    x = <FormArray>obj.get('policyBenefits')
    for (let j = 0; j < x.length; j++) {
      if (x.at(j).valid) {
        flag2 = true
        break
      }
    }
    x = <FormArray>obj.get('addOnDetails')
    for (let k = 0; k < x.length; k++) {
      if (x.at(k).valid) {
        flag3 = true
        break
      }
    }
    return flag1 && flag2 && flag3
  }
  check_validity3() {
    const obj = this.insuranceForms
    let validity3 = obj.get('policyDocuments')?.valid && obj.get('fileSource')?.valid && obj.get('userEmail')?.valid
    return validity3
  }
  onSubmit() {
    this.modifyform()
    console.log(this.policyarray);
    // console.log(this.insuranceForms.value);
    this.insuranceForms.get('policyId')!.enable();


    const formData = new FormData;

    formData.append("imageFile", this.insuranceForms.controls['fileSource'].value!);
    formData.append("policyId", this.id.toString())
    console.log(formData)
    this.http.post<Insurance>("http://localhost:8080/insurance/api/vk1/life-policy", this.insuranceForms.value).subscribe(
      (data: any) => {
        console.log(data);
        if (this.filestatus) {
          this.http.put("http://localhost:8080/insurance/api/vk1/photos/update/" + this.id.toString(), formData, { observe: 'response' })
            .subscribe((data: any) => { console.log(data) });
          this.addInsuranceTo(formData);
        }
      });
    console.log(this.insuranceForms.value)
    this.insuranceForms.get('policyId')!.disable()
  }
  addInsuranceTo(formData: FormData) {
    this.insuranceForms.get('policyId')?.enable();
    this.http.post("http://localhost:8080/recommendation/Recommendation/Insurance", this.insuranceForms.value).subscribe(
      (data) => {
        console.log(data);
        this.http.put(`http://localhost:8080/recommendation/Recommendation/insurance/${this.id.toString()}`, formData).subscribe((data) => {
          console.log(data);
          this.route.navigateByUrl("/home/home-page");
        })
      }
    )
    this.insuranceForms.get('policyId')?.disable();
  }
  addDetails(i: any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    console.log('Length of policy Details Array' + control.length);
    for (let z = 0; z < control.length - 1; z++) {
      for (let zz = z + 1; zz < control.length; zz++) {
        console.log(control.at(z).value);
        console.log(control.at(zz).value)
        console.log(control.at(z).value === control.at(zz))
        if (JSON.stringify(control.at(z).value) === JSON.stringify(control.at(zz).value)) {
          this.openSnackBar("Row " + (z + 1) + " and Row " + (zz + 1) + " are same please remove or change value to add new row")
          return
        }
      }
    }
    //insuranceType,AutoMobileInsurance,HealthInsurance
    for (let k = 0; k < control.length; k++) {
      if (this.insuranceForms.get('insuranceType')?.value == 'LifeInsurance') {
        console.log('1');

        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('premiums')?.invalid || control.at(k).get('durations')?.invalid || control.at(k).get('minSalary')?.invalid || control.at(k).get('maxSalary')?.invalid) {
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
        console.log('2');
      }
      if (this.insuranceForms.get('insuranceType')?.value == 'AutoMobileInsurance') {
        console.log('Before');

        if (this.insuranceForms.get('modelsAllowed')?.invalid) {
          console.log('In method not allowed');
          this.openSnackBar('Please select Models Allowed first')
          return
        }
        console.log('After');

        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('premiums')?.invalid || control.at(k).get('durations')?.invalid) {
          console.log('3');
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
      }
      //premiums,durations,sumInsure,adults1,adults2,adults3,kids,minSalary,maxSalary
      if (this.insuranceForms.get('insuranceType')?.value == 'HealthInsurance') {
        console.log('4');
        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('durations')?.invalid || control.at(k).get('adults2')?.invalid || control.at(k).get('adults3')?.invalid || control.at(k).get('adults1')?.invalid || control.at(k).get('kids')?.invalid) {
          console.log('5');
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
      }
    }

    const x = new FormGroup({
      premiums: new FormControl(control.at(i)!.get('premiums')!.value, [Validators.required, Validators.min(0)]),
      durations: new FormControl(control.at(i).get('durations')?.value, [Validators.required, Validators.min(0)]),
      sumInsure: new FormControl(control.at(i).get('sumInsure')?.value, [Validators.required, Validators.min(0)]),
      adults1: new FormControl(control.at(i).get('adults1')?.value, [Validators.min(1), Validators.required]),
      adults2: new FormControl(control.at(i).get('adults2')?.value, [Validators.min(1), Validators.required]),
      adults3: new FormControl(control.at(i).get('adults3')?.value, [Validators.min(1), Validators.required]),
      kids: new FormControl(control.at(i).get('kids')?.value, [Validators.min(1), Validators.required]),
      minSalary: new FormControl(control.at(i).get('minSalary')?.value, [Validators.required, Validators.min(0)]),
      maxSalary: new FormControl(control.at(i).get('maxSalary')?.value, [Validators.required, Validators.min(0)])
    }
    );
    console.log(control.controls[i].value)

    control.push(x);

  }
  //--------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------
  addDetailsE(i: any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    for (let z = 0; z < control.length - 1; z++) {
      for (let zz = z + 1; zz < control.length; zz++) {
        console.log(control.at(z).value);
        console.log(control.at(zz).value)
        console.log(control.at(z).value === control.at(zz))
        if (JSON.stringify(control.at(z).value) === JSON.stringify(control.at(zz).value)) {
          this.openSnackBar("Row " + (z + 1) + " and Row " + (zz + 1) + " are same please remove or change value to add new row")
          return
        }
      }
    }
    for (let k = 0; k < control.length; k++) {
      if (this.insuranceForms.get('insuranceType')?.value == 'LifeInsurance') {
        console.log('1');
        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('premiums')?.invalid || control.at(k).get('durations')?.invalid || control.at(k).get('minSalary')?.invalid || control.at(k).get('maxSalary')?.invalid) {
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
      }
      if (this.insuranceForms.get('insuranceType')?.value == 'AutoMobileInsurance') {
        console.log('Before');
        console.log('2');
        if (this.insuranceForms.get('modelsAllowed')?.invalid) {
          console.log('In method not allowed');
          this.insuranceForms.get('modelsAllowed')?.markAsTouched
          this.openSnackBar('Please select Models Allowed first')
          return
        }
        console.log('After');

        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('premiums')?.invalid || control.at(k).get('durations')?.invalid) {
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
      }
      //premiums,durations,sumInsure,adults1,adults2,adults3,kids,minSalary,maxSalary
      if (this.insuranceForms.get('insuranceType')?.value == 'HealthInsurance') {
        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('durations')?.invalid || control.at(k).get('adults2')?.invalid || control.at(k).get('adults3')?.invalid || control.at(k).get('adults')?.invalid || control.at(k).get('kids')?.invalid) {
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
      }
    }


    console.log(control.value);
    control.push(new FormGroup({
      premiums: new FormControl("", [Validators.required, Validators.min(0)]),
      durations: new FormControl("", [Validators.required, Validators.min(0)]),
      sumInsure: new FormControl("", [Validators.required, Validators.min(0)]),
      adults1: new FormControl("", [Validators.min(1), Validators.required]),
      adults2: new FormControl("", [Validators.min(1), Validators.required]),
      adults3: new FormControl("", [Validators.min(1), Validators.required]),
      kids: new FormControl("", [Validators.min(1), Validators.required]),
      minSalary: new FormControl("", [Validators.required, Validators.min(0)]),
      maxSalary: new FormControl("", [Validators.required, Validators.min(0)])
    }
    ));
  }
  removeDetails(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    if (control.length == 1)
      return

    control.removeAt(index);
  }
  addDetails1(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];

    if (!control.at(index).value.brief || !control.at(index).value.description) {
      return
    }

    this.flags[index] = false
    this.flags.push(true)
    control.push(new FormGroup({
      brief: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    }
    ));
    const arr = new policyDetails('', '');
    // console.log(control.controls[index].value.brief)
    arr.briefs = control.controls[index].value.brief;
    // console.log(this.xyz.briefs)
    arr.descriptions = control.controls[index].value.description;
    this.policyarray.push(arr);
    console.log(this.policyarray)
  }
  removeDetails1(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];
    control.removeAt(index);
    this.policyarray.splice(index, 1);
    this.flags.splice(index, 1)
    console.log(this.policyarray)
    console.log(this.flags)
    console.log(this, this.insuranceForms.value);

  }
  addDetails2(index: any) {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    if ((!control.at(index).value.addOnName || !control.at(index).value.addOnDescription || !control.at(index).value.addOnPremiums)) {
      return
    }
    this.flag[index] = false
    this.flag.push(true)
    control.push(new FormGroup({
      addOnName: new FormControl("", [Validators.required]),
      addOnDescription: new FormControl("", [Validators.required]),
      addOnPremiums: new FormControl("", [Validators.required])
    }));
    const arr1 = new premiumdetails('', '', 0);

    arr1.addOnName = control.controls[index].value.addOnName;
    arr1.addOnDescription = control.controls[index].value.addOnDescription;
    arr1.addOnPremiums = control.controls[index].value.addOnPremiums;
    this.premiumarray.push(arr1);
    console.log(this.premiumarray)
  }
  removeDetails2(index: any) {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    control.removeAt(index);
    this.premiumarray.splice(index, 1);
    this.flag.splice(index, 1)
    console.log(this.premiumarray)
    console.log(this.flag)
    console.log(this, this.insuranceForms.value);
  }





  get insurancex() {
    return this.insuranceForms.get('insuranceType')?.value!
  }
  get categoryx() {
    return this.insuranceForms.get('category')?.value!
  }
  get policyDetailsx() {
    return (this.insuranceForms.get('policyDetails') as FormArray).controls;
  }
  get policyBenefitsx() {
    return (this.insuranceForms.get('policyBenefits') as FormArray).controls;
  }
  get policyAddOnsx() {
    return (this.insuranceForms.get('addOnDetails') as FormArray).controls;
  }
  //=========================================================================================================
  //Methods for chips component
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  sumInsuredValues: SumInsured[] = [{ insuredSum: 100000 }, { insuredSum: 500000 }, { insuredSum: 1000000 }, { insuredSum: 5000000 }];
  duration: Duration[] = [{ years: 1 }, { years: 2 }, { years: 5 }, { years: 10 }];
  add(event: MatChipInputEvent): void {
    // const value = (event.value || '').trim();
    const value = +event.value;
    // Add our fruit
    if (value && !(this.sumInsuredValues.filter((a) => a.insuredSum == value).length > 0)) {
      this.sumInsuredValues.push({ insuredSum: value });
      this.sumInsuredValues.sort((a, b) => a.insuredSum - b.insuredSum)
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: SumInsured): void {
    const index = this.sumInsuredValues.indexOf(fruit);

    if (index >= 0) {
      this.sumInsuredValues.splice(index, 1);
    }
  }
  addduration(event: MatChipInputEvent): void {

    const value = +event.value;

    if (value && !(this.duration.filter((a) => a.years == value).length > 0)) {
      this.duration.push({ years: value });
      this.duration.sort((a, b) => a.years - b.years)
    }
    event.chipInput!.clear();
  }

  removeduration(x: Duration): void {
    const index = this.duration.indexOf(x);

    if (index >= 0) {
      this.duration.splice(index, 1);
    }
  }

  // api for getting policy
  getnumber() {
    var text = 1;
    var possible = "123456789";
    let randomlength = Math.floor(Math.random() * 2377887) % 10
    randomlength++
    for (var i = 0; i < randomlength; i++)
      text = text + (i + 1) * Math.floor(Math.random() * 2377) % 100

    return text;
  }
  getword() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomlength = Math.floor(Math.random() * 43223) % 30
    randomlength++
    for (var i = 0; i < randomlength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  getdob() {
    var text = "";
    let randomlength = Math.floor(Math.random() * 15654833)
    randomlength++

    text = (randomlength % 40 + 1980).toString() + '-'
    text = text + (randomlength % 3 + 10).toString() + '-'
    text = text + (randomlength % 20 + 10).toString()
    // for (var i = 0; i < randomlength; i++)
    //   text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  fill_form() {
    this.insuranceForms.reset()
    this.insuranceForms.get('policyId')?.patchValue(this.id.toString())
    // this.insuranceForms.get()
    let sumInsuredValue = [100000, 500000, 1000000, 5000000]
    let dur = [1, 2, 5, 10]
    let it = this.getnumber() % 25 + 10
    const pdc = <FormArray>this.insuranceForms.get('policyDetails')

    for (let n = 0; n < it; n++) {
      let sal = (this.getnumber() % 11) * 100000 + 1
      let yy = this.getnumber() % 11
      pdc.at(n).get('premiums')?.patchValue((this.getnumber() % 11) * (1423) + 1)
      pdc.at(n).get('durations')?.patchValue((dur[(this.getnumber()) % (dur.length)]).toString())
      pdc.at(n).get('sumInsure')?.patchValue((sumInsuredValue[(this.getnumber()) % (sumInsuredValue.length)]).toString())
      pdc.at(n).get('adults1')?.patchValue(yy * (1230) + 1)
      pdc.at(n).get('adults2')?.patchValue((yy) * (1600) + 1)
      pdc.at(n).get('adults3')?.patchValue((yy) * (2500) + 1)
      pdc.at(n).get('kids')?.patchValue((yy) * (800) + 1)
      pdc.at(n).get('minSalary')?.patchValue(sal)
      pdc.at(n).get('maxSalary')?.patchValue(sal + (this.getnumber() % 11) * 100000)
      this.addDetails(n)
    }
    this.removeDetails(it)
    const pc = <FormArray>this.insuranceForms.get('policyBenefits')
    for (let n = 0; n < this.getnumber() % 14 + 1; n++) {
      pc.at(n).get('brief')?.patchValue(this.getword())
      pc.at(n).get('description')?.patchValue(this.getword())
      this.addDetails1(n)
    }

    const ac = <FormArray>this.insuranceForms.get('addOnDetails')
    for (let n = 0; n < this.getnumber() % 14 + 1; n++) {
      ac.at(n).get('addOnName')?.patchValue(this.getword())
      ac.at(n).get('addOnDescription')?.patchValue(this.getword())
      ac.at(n).get('addOnPremiums')?.patchValue(this.getnumber())
      this.addDetails2(n)
    }


    let insurancearray = ['LifeInsurance', 'HealthInsurance', 'AutoMobileInsurance']
    let categoryarray = ['Car', 'Bike']
    let ind = this.getnumber() % 2
    let selcted_ins = this.getnumber() % 3
    this.insuranceForms.get('insuranceType')?.patchValue(insurancearray[selcted_ins])
    this.insuranceForms.get('policyName')?.patchValue(this.getword())
    this.insuranceForms.get('policyDescription')?.patchValue(this.getword())
    this.insuranceForms.get('policyDocuments')?.patchValue(this.getword())
    this.insuranceForms.get('userEmail')?.patchValue(this.getnumber().toString())
    this.insuranceForms.get('category')?.patchValue(categoryarray[ind])
    // if(ind==0){  this.insuranceForms.get('modelsAllowed')?.patchValue(this.carList)  }
    // else {this.insuranceForms.get('modelsAllowed')?.patchValue(this.bikeList)}

  }

}
export interface bike {
  value: string;
  viewValue: string;
}

export interface bikeCompany {
  name: string;
  bikeList: bike[];
}

export interface car {
  value: string;
  viewValue: string;
}

export interface carCompany {
  name: string;
  carList: bike[];
}
export interface SumInsured {
  insuredSum: number;
}
export interface Duration {
  years: number;
}
export class policyDetails {
  constructor(
    public briefs: string,
    public descriptions: string) { }
}
export class premiumdetails {
  constructor(
    public addOnName: string,
    public addOnDescription: string,
    public addOnPremiums: number) { }
}




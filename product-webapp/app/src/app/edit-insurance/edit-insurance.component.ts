
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Insurance } from '../insurance';
import { MatDialog } from '@angular/material/dialog';

import { PreviewMarkupComponent } from '../preview-markup/preview-markup.component';
import { RecommendationServiceService } from '../Services/recommendation-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


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
@Component({
  selector: 'app-edit-insurance',
  templateUrl: './edit-insurance.component.html',
  styleUrls: ['./edit-insurance.component.css']
})
export class EditInsuranceComponent implements OnInit {

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
  flag: boolean[] = [true];
  init_flag: boolean = false
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', { duration: 3000 });
  }


  constructor(public snackBar: MatSnackBar, public http: HttpClient, public dialog: MatDialog, private service: RecommendationServiceService, private route: Router) { }

  openDialog() {
    this.dialog.open(PreviewMarkupComponent, { data: this.valueVariable })
  }

  insuranceForms = new FormGroup({
    insuranceType: new FormControl("", [Validators.required]),
    policyId: new FormControl("", [Validators.required]),
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
      maxSalary: new FormControl("", [Validators.required, Validators.min(1)]),

    })]),
    policyBenefits: new FormArray([
      new FormGroup({
        brief: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required])
      })]),
    addOnDetails: new FormArray([
      new FormGroup({
        addOnName: new FormControl("", [Validators.required]),
        addOnDescription: new FormControl("", [Validators.required]),
        addOnPremiums: new FormControl("", [Validators.required])
      })
    ]),
    policyDocuments: new FormControl("", [Validators.required]),
    fileSource: new FormControl("", [Validators.required]),
    userEmail: new FormControl("", [Validators.required])
  });

  get insuranceFormControl() {
    return <FormArray>this.insuranceForms.controls['policyBenefits'];
  }

  insuranceobj: any

  ngOnInit(): void {
    this.http.get('https://insurify.stackroute.io/insurance/api/vk1/policy-id/' + localStorage.getItem('editpolicyid')?.toString()).subscribe((data: any) => {
    // this.http.get('http://localhost:8080/insurance/api/vk1/policy-id/' + localStorage.getItem('editpolicyid')?.toString()).subscribe((data: any) => {
      this.insuranceobj = data

      console.log(this.insuranceobj)
      this.insuranceForms.patchValue({
        insuranceType: this.insuranceobj.insuranceType,
        policyId: this.insuranceobj.policyId,
        policyName: this.insuranceobj.policyName,
        policyDescription: this.insuranceobj.policyDescription,
        category: this.insuranceobj.category,
        modelsAllowed: this.insuranceobj.modelsAllowed,
        policyDocuments: this.insuranceobj.policyDocuments,
        userEmail: localStorage.getItem('logInEmailId')
      })
      const control1 = <FormArray>this.insuranceForms.get('policyBenefits')

      for (let i = 0; i < this.insuranceobj.policyBenefits.length; i++) {
        control1.at(i).patchValue({
          brief: this.insuranceobj.policyBenefits[i].brief,
          description: this.insuranceobj.policyBenefits[i].description,
        })
        this.addDetails1(i)
      }
      // this.addDetails1(this.insuranceobj.policyBenefits.length-1)
      // console.log(this.flags)
      const control2 = <FormArray>this.insuranceForms.controls['addOnDetails'];

      for (let i = 0; i < this.insuranceobj.addOnDetails.length; i++) {

        control2.at(i).patchValue({
          addOnName: this.insuranceobj.addOnDetails[i].addOnName,
          addOnDescription: this.insuranceobj.addOnDetails[i].addOnDescription,
          addOnPremiums: this.insuranceobj.addOnDetails[i].addOnPremiums,
        })
        this.addDetails2(i)
      }
      const control3 = <FormArray>this.insuranceForms.get('policyDetails')

      for (let i = 0; i < this.insuranceobj.policyDetails.length; i++) {
        // console.log('Error for ' + i);
        control3.at(i).patchValue({
          premiums: this.insuranceobj.policyDetails[i].premiums,
          durations: this.insuranceobj.policyDetails[i].durations,
          sumInsure: this.insuranceobj.policyDetails[i].sumInsure,
          adults1: this.insuranceobj.policyDetails[i].adults1,
          adults2: this.insuranceobj.policyDetails[i].adults2,
          adults3: this.insuranceobj.policyDetails[i].adults3,
          kids: this.insuranceobj.policyDetails[i].kids,
          minSalary: this.insuranceobj.policyDetails[i].minSalary,
          maxSalary: this.insuranceobj.policyDetails[i].maxSalary,
        })
        // console.log('No Error for ' + i);
        if (i < (this.insuranceobj.policyDetails.length - 1))
          this.addDetailsE(i)
      }

      console.log(this.insuranceForms.value)
    })

    // this.insuranceForms.get('policyId')!.disable()
    this.insuranceForms.get('policyId')!.disable()
    this.insuranceForms.get('policyName')!.disable()
    this.insuranceForms.get('insuranceType')!.disable()
    this.insuranceForms.get('category')!.disable()
    console.log(this.insuranceForms.value);
    this.init_flag = true
  }


  id = Math.floor(Math.random() * 1000000 + 100000);




  public onFileChanged(event: any) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.insuranceForms.patchValue({
        fileSource: file
      });
    }
  }
  modifyform() {
    const obj = this.insuranceForms
    let control = <FormArray>this.insuranceForms.get('policyBenefits')
    console.log("Inside method");
    let arr = []

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

  onSubmit() {
    this.modifyform();
    console.log(this.policyarray);
    this.insuranceForms.get('policyId')!.enable();
    const formData = new FormData;

    formData.append("imageFile", this.insuranceForms.controls['fileSource'].value!);
    formData.append("policyId", this.insuranceForms.controls['policyId'].value!)
    //   const httpOptions = {
    //     headers: new HttpHeaders(
    //     {
    //        'Authorization': 'Your Token',
    //        'Content-Type': 'application/json'
    //     })
    this.insuranceForms.get('policyId')!.enable()
    this.insuranceForms.get('policyName')!.enable()
    this.insuranceForms.get('insuranceType')!.enable()
    // }
    console.log(this.insuranceForms.get('insuranceType')!.value)
    this.http.put<Insurance>("https://insurify.stackroute.io/insurance/api/vk1/update", this.insuranceForms.value).subscribe(
    // this.http.put<Insurance>("http://localhost:8080/insurance/api/vk1/update", this.insuranceForms.value).subscribe(
      (data: any) => {
        console.log(data);
        if (this.insuranceForms.controls['fileSource'].value!=null)
        this.http.put("https://insurify.stackroute.io/insurance/api/vk1/photos/update/" + this.id.toString(), formData, { observe: 'response' })  
        // this.http.put("http://localhost:8080/insurance/api/vk1/photos/update/" + this.id.toString(), formData, { observe: 'response' })
            .subscribe((data: any) => {
              this.route.navigateByUrl("/home/home-page")
              console.log(data)
            }
            );
      });
    console.log(this.insuranceForms.value)
    this.insuranceForms.get('policyId')!.disable()
  }


  addDetails(i: any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    // console.log('Length of policy Details Array'+ control.length);
    for (let z = 0; z < control.length - 1; z++) {
      for (let zz = z + 1; zz < control.length; zz++) {
        // console.log(control.at(z).value);
        // console.log(control.at(zz).value)
        // console.log(control.at(z).value===control.at(zz))
        if (JSON.stringify(control.at(z).value) === JSON.stringify(control.at(zz).value)) {
          this.openSnackBar("Row " + (z + 1) + " and Row " + (zz + 1) + " are same please remove or change value to add new row")
          return
        }
      }
    }
    //insuranceType,AutoMobileInsurance,HealthInsurance
    for (let k = 0; k < control.length; k++) {
      if (this.insuranceForms.get('insuranceType')?.value == 'LifeInsurance') {
        // console.log('1');

        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('premiums')?.invalid || control.at(k).get('durations')?.invalid || control.at(k).get('minSalary')?.invalid || control.at(k).get('maxSalary')?.invalid) {
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
        // console.log('2');
      }
      if (this.insuranceForms.get('insuranceType')?.value == 'AutoMobileInsurance') {
        // console.log('Before');

        if (this.insuranceForms.get('modelsAllowed')?.invalid) {
          console.log('In method not allowed');
          this.openSnackBar('Please select Models Allowed first')
          return
        }
        // console.log('After');

        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('premiums')?.invalid || control.at(k).get('durations')?.invalid) {
          console.log('3');
          this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
          return
        }
      }
      //premiums,durations,sumInsure,adults1,adults2,adults3,kids,minSalary,maxSalary
      if (this.insuranceForms.get('insuranceType')?.value == 'HealthInsurance') {
        // console.log('4');
        if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('durations')?.invalid || control.at(k).get('adults2')?.invalid || control.at(k).get('adults3')?.invalid || control.at(k).get('adults1')?.invalid || control.at(k).get('kids')?.invalid) {
          // console.log('5');
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
    if (this.init_flag) {
      for (let z = 0; z < control.length - 1; z++) {
        for (let zz = z + 1; zz < control.length; zz++) {
          // console.log(control.at(z).value);
          // console.log(control.at(zz).value)
          // console.log(control.at(z).value === control.at(zz))
          if (JSON.stringify(control.at(z).value) === JSON.stringify(control.at(zz).value)) {
            this.openSnackBar("Row " + (z + 1) + " and Row " + (zz + 1) + " are same please remove or change value to add new row")
            return
          }
        }
      }
      for (let k = 0; k < control.length; k++) {
        if (this.insuranceForms.get('insuranceType')?.value == 'LifeInsurance') {
          // console.log('1');
          if (control.at(k).get('sumInsure')?.invalid || control.at(k).get('premiums')?.invalid || control.at(k).get('durations')?.invalid || control.at(k).get('minSalary')?.invalid || control.at(k).get('maxSalary')?.invalid) {
            this.openSnackBar('Fill all the details of row  ' + (k + 1) + '  to add new Row')
            return
          }
        }
        if (this.insuranceForms.get('insuranceType')?.value == 'AutoMobileInsurance') {
          // console.log('Before');
          // console.log('2');
          if (this.insuranceForms.get('modelsAllowed')?.invalid) {
            // console.log('In method not allowed');
            this.insuranceForms.get('modelsAllowed')?.markAsTouched
            this.openSnackBar('Please select Models Allowed first')
            return
          }
          // console.log('After');

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

    }
    // console.log(control.value);
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

    arr.briefs = control.controls[index].value.brief;

    arr.descriptions = control.controls[index].value.description;
    this.policyarray.push(arr);
    // console.log(this.policyarray)
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
    // console.log(this.premiumarray)
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
  check_validity() {
    const obj = this.insuranceForms
    console.log(obj)
    let validity1 = obj.get('policyDescription')?.valid
    let validity2 = this.check_validity2()
    let validity3 = obj.get('policyDocuments')?.valid && obj.get('userEmail')?.valid

    if (obj.get('insuranceType')?.value === 'AutoMobileInsurance') {
      let validity4 = obj.get('modelsAllowed')?.valid && obj.get('category')?.valid
      return !(validity1 && validity2 && validity3 && validity4)
    }
    console.log('Validity 1:' + validity1)
    console.log('Validity 2:' + validity2)
    console.log('Validity 3:' + validity3)
    console.log(validity1 && validity2 && validity3);

    return !(this.check_validity1() && this.check_validity2() && this.check_validity3())
  }
  check_validity1() {
    const obj = this.insuranceForms
    let validity1 = obj.get('policyDescription')?.valid
    return validity1
  }
  check_validity2() {
    const obj = this.insuranceForms
    let x = <FormArray>obj.get('policyDetails')
    let flag1 = false, flag2 = false, flag3 = false
    console.log("length of policy Details" + x.length);

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
    console.log(flag1 + '' + flag2 + '' + flag3);


  }
  check_validity3() {
    const obj = this.insuranceForms
    let validity3 = obj.get('policyDocuments')?.valid && obj.get('userEmail')?.valid
    return validity3
  }

}

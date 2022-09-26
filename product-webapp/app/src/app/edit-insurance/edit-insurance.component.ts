
import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Insurance } from '../insurance';
import { MatDialog } from '@angular/material/dialog';

import { PreviewMarkupComponent } from '../preview-markup/preview-markup.component';
import { RecommendationServiceService } from '../recommendation-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
export class policyDetails{
  constructor(
    public briefs:string,
    public descriptions:string){}
}
export class premiumdetails{
  constructor(
    public addOnName       :string,
    public addOnDescription:string,
    public addOnPremiums   :number){}
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
        {value: 'Honda SP 125', viewValue: 'Honda SP 125'},
        {value: 'Honda Shine', viewValue: 'Honda Shine'},
        {value: 'Honda H`ness CB350', viewValue: 'Honda H`ness CB350'},
      ],
    },
    {
      name: 'TVS',
      bikeList: [
        {value: 'TVS Apache RTR 160', viewValue: 'TVS Apache RTR 160'},
        {value: 'TVS Ronin', viewValue: 'TVS Ronin'},
        {value: 'TVS Apache RTR 200 4V', viewValue: 'TVS Apache RTR 200 4V'},
      ],
    },
    {
      name: 'Hero',
      bikeList: [
        {value: 'Hero Splendor Plus', viewValue: 'Hero Splendor Plus'},
        {value: 'Hero HF Deluxe', viewValue: 'Hero HF Deluxe'},
        {value: 'Heroflareon', viewValue: 'Hero Flareon'},
      ],
    },
    {
      name: 'KTM',
      bikeList: [
        {value: 'KTM 390 Duke', viewValue: 'KTM 390 Duke'},
        {value: 'KTM 125 Duke', viewValue: 'KTM 125 Duke'},
      ],
    },
  ];

  carGroups: carCompany[] = [
    {
      name: 'Hyundai',
      carList: [
        {value: 'Hyundai Creta', viewValue: 'Hyundai Creta'},
        {value: 'Hyundai Venue', viewValue: 'Hyundai Venue'},
        {value: 'Hyundai i20', viewValue: 'Hyundai i20'},
      ],
    },
    {
      name: 'Toyota',
      carList: [
        {value: 'Toyota Fortuner', viewValue: 'Toyota Fortuner'},
        {value: 'Toyota Innova Crysta', viewValue: 'Toyota Innova Crysta'},
        {value: 'Toyota Urban Cruiser', viewValue: 'Toyota Urban Cruiser'},
      ],
    },
    {
      name: 'Tata',
      carList: [
        {value: 'Tata Tiago', viewValue: 'Tata Tiago'},
        {value: 'Tata Harrier', viewValue: 'Tata Harrier'},
        {value: 'Tata Safari', viewValue: 'Tata Safari'},
      ],
    },
    {
      name: 'Maruti',
      carList: [
        {value: 'Maruti Brezza', viewValue: 'Maruti Brezza'},
        {value: 'Maruti Swift', viewValue: 'Maruti Swift'},
      ],
    },
  ];
  num:number=0;
  policyarray:policyDetails[]=[]
  premiumarray:premiumdetails[]=[]
  briefInput:string='';
  descriptionInput:string='';
  valueVariable: string='';
  xyz:policyDetails={
    briefs:'',
    descriptions :''
  }
 flags:boolean[]=[true];
 flag:boolean[]=[true]
 openSnackBar(message: string) {
    
  this.snackBar.open(message,'Ok',{duration: 3000});
}


  constructor(public snackBar:MatSnackBar,public http:HttpClient,public dialog:MatDialog,private service:RecommendationServiceService) { }

  openDialog(){
    this.dialog.open(PreviewMarkupComponent,{data:this.valueVariable})
  }

  insuranceForms = new FormGroup({
    insuranceType    : new FormControl("", [Validators.required]),
    policyId         : new FormControl("", [Validators.required]),
    policyName       : new FormControl("", [Validators.required]),
    policyDescription: new FormControl("", [Validators.required]),
    category         : new FormControl("",[Validators.required]),
    modelsAllowed    : new FormControl([],[Validators.required]),
    policyDetails    : new FormArray([new FormGroup({
      premiums :    new FormControl("", [Validators.required,Validators.min(1)]),
      durations:    new FormControl("", [Validators.required,Validators.min(1)]),
      sumInsure:    new FormControl("", [Validators.required,Validators.min(1)]),
      adults1   :    new FormControl("",[Validators.min(1),Validators.required]),
      adults2   :    new FormControl("",[Validators.min(1),Validators.required]),
      adults3   :    new FormControl("",[Validators.min(1),Validators.required]),
      kids     :    new FormControl("", [Validators.min(1),Validators.required]),
      minSalary:    new FormControl("", [Validators.required,Validators.min(1)]),
      maxSalary:    new FormControl("", [Validators.required,Validators.min(1)])
    })]),
    policyBenefits: new FormArray([
      new FormGroup({
        brief      : new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required])
      })]),
    addOnDetails: new FormArray([
      new FormGroup({
        addOnName        : new FormControl("", [Validators.required]),
        addOnDescription : new FormControl("", [Validators.required]),
        addOnPremiums    : new FormControl("", [Validators.required])
      })
    ]),
    policyDocuments: new FormControl("", [Validators.required]),
    fileSource     : new FormControl("", [Validators.required])
  });

  get insuranceFormControl() {
    return <FormArray>this.insuranceForms.controls['policyBenefits'];
  }

 insuranceobj:any

  ngOnInit(): void {
    this.http.get('http://localhost:8084/api/returnobj').subscribe((data:any)=>{
      this.insuranceobj=data
      
      console.log(this.insuranceobj)
      this.insuranceForms.patchValue({
        insuranceType:this.insuranceobj.insuranceType,
        policyId:this.insuranceobj.policyId,
        policyName:this.insuranceobj.policyName,
        policyDescription:this.insuranceobj.policyDescription,
        category:this.insuranceobj.category, 
        modelsAllowed:this.insuranceobj.modelsAllowed,
        policyDocuments:this.insuranceobj.policyDocuments, 
      })
      const control1=<FormArray> this.insuranceForms.get('policyBenefits')

      for(let i=0;i< this.insuranceobj.policyBenefits.length;i++)
      {
        control1.push( new FormGroup({
          brief      : new FormControl(this.insuranceobj.policyBenefits[i].brief, [Validators.required]),
          description: new FormControl(this.insuranceobj.policyBenefits[i].description, [Validators.required])
        }))
        this.policyarray.push({'briefs':this.insuranceobj.policyBenefits[i].brief,'descriptions':this.insuranceobj.policyBenefits[i].description})
      }
      console.log(this.insuranceForms.get('policyBenefits')?.value)
      // this.insuranceForms.get('policyBenefits')?.patchValue(control1)
      
      // this.insuranceForms.get('policyId')?.setValue(data.policyId);
      // this.insuranceForms.get('insuranceType')?.setValue(data.insuranceType);
      // this.insuranceForms.get('policyName')?.setValue(data.policyName);
      // this.insuranceForms.get('policyDescription')?.setValue(data.policyDescription);
      // this.insuranceForms.get('category')?.setValue(data.category);
      // this.insuranceForms.get('modelsAllowed')?.setValue(data.modelsAllowed);
      // this.insuranceForms.get('policyDocuments')?.setValue(data.policyDocuments);
      const control = <FormArray>this.insuranceForms.controls['policyDetails'];
      for(let i=0;i<data.policyDetails.length;i++)
      {
        console.log(data.policyDetails[i]);
      }
      for(let i=1;i<data.policyDetails.length;i++)
      {
        console.log(i);
        
        control.push(new FormGroup({
          premiums :    new FormControl("", [Validators.required,Validators.min(0)]),
          durations:    new FormControl(data.policyDetails[i].durations, [Validators.required,Validators.min(0)]),
          sumInsure:    new FormControl("", [Validators.required,Validators.min(0)]),
          adults1   :    new FormControl("", [Validators.min(1),Validators.required]),
          adults2   :    new FormControl("", [Validators.min(20),Validators.max(60)]),
          adults3   :    new FormControl("", [Validators.min(20),Validators.max(60)]),
          kids     :    new FormControl("", [Validators.min(1),Validators.required]),
          minSalary:    new FormControl("", [Validators.required,Validators.min(0)]),
          maxSalary:    new FormControl("", [Validators.required,Validators.min(0)])      
        }
        ));
      }
      console.log(control)
      this.insuranceForms.get('policyDocuments')?.setValue(data.policyDocuments);
      // this.insuranceForms.get('policyDetails')?.setValue(control);
      console.log(control);
      
     console.log(this.insuranceForms)
    }) 
    //premiums : 
    //durations: 
    //sumInsure: 
    //adults1   :
    //adults2   :
    //adults3   :
    //kids     : 
    //minSalary: 
    //maxSalary: 
    // this.insuranceForms.disable()
    
  // this.insuranceForms.get('policyId')?.setValue(this.id.toString())
  // this.insuranceForms.get('policyId')!.disable()
  }


  id=Math.floor(Math.random()*1000000+100000);




  public onFileChanged(event:any) {
    //Select File
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.insuranceForms.patchValue({
        fileSource: file
      });
    }
  }


  onSubmit(){
    console.log(this.policyarray) ;
 
    this.insuranceForms.get('policyId')!.enable();
  

    const formData=new FormData;
    
    formData.append("imageFile",this.insuranceForms.controls['fileSource'].value!);
    formData.append("policyId",this.id.toString())

    this.http.post<Insurance>("http://localhost:8010/api/vk1/life-policy",this.insuranceForms.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.http.put("http://localhost:8010/api/vk1/photos/update/"+this.id.toString(),formData, { observe: 'response' })
              .subscribe((data:any)=>{console.log(data)});
      });
    console.log(this.insuranceForms.value)
    this.insuranceForms.get('policyId')!.disable()
  }


  addDetails(i:any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    console.log('Length of policy Details Array'+ control.length);
    for(let z=0;z<control.length-1;z++)
        {
          for(let zz=z+1;zz<control.length;zz++)
          {
            console.log(control.at(z).value);
            console.log(control.at(zz).value)
            console.log(control.at(z).value===control.at(zz))
            if(JSON.stringify(control.at(z).value)===JSON.stringify(control.at(zz).value))
            {
              this.openSnackBar("Row "+(z+1)+" and Row "+(zz+1)+" are same please remove or change value to add new row")
              return
            }
          }
        }
    //insuranceType,AutoMobileInsurance,HealthInsurance
    for(let k=0;k<control.length;k++)
    {
      if(this.insuranceForms.get('insuranceType')?.value=='LifeInsurance')
      {
        console.log('1');
        
        if(control.at(k).get('sumInsure')?.invalid||control.at(k).get('premiums')?.invalid||control.at(k).get('durations')?.invalid||control.at(k).get('minSalary')?.invalid||control.at(k).get('maxSalary')?.invalid)
        {
          this.openSnackBar('Fill all the details of row  '+(k + 1)+'  to add new Row')
          return 
        }
        console.log('2');
      }
      if(this.insuranceForms.get('insuranceType')?.value=='AutoMobileInsurance')
      {
        console.log('Before');
        
        if(this.insuranceForms.get('modelsAllowed')?.invalid)
        {
          console.log('In method not allowed');
          this.openSnackBar('Please select Models Allowed first')
          return 
        }
       console.log('After');
       
        if(control.at(k).get('sumInsure')?.invalid||control.at(k).get('premiums')?.invalid||control.at(k).get('durations')?.invalid)
        {
          console.log('3');
          this.openSnackBar('Fill all the details of row  '+(k + 1)+'  to add new Row')
          return 
        }
      }
       //premiums,durations,sumInsure,adults1,adults2,adults3,kids,minSalary,maxSalary
      if(this.insuranceForms.get('insuranceType')?.value=='HealthInsurance')
      {
        console.log('4');        
        if(control.at(k).get('sumInsure')?.invalid||control.at(k).get('durations')?.invalid||control.at(k).get('adults2')?.invalid||control.at(k).get('adults3')?.invalid||control.at(k).get('adults1')?.invalid||control.at(k).get('kids')?.invalid)
        {
          console.log('5');
          this.openSnackBar('Fill all the details of row  '+(k + 1)+'  to add new Row')
          return 
        }
      }
    }

    const x=new FormGroup({
      premiums :    new FormControl(control.at(i)!.get('premiums')!.value, [Validators.required,Validators.min(0)]),
      durations:    new FormControl(control.at(i).get('durations')?.value, [Validators.required,Validators.min(0)]),
      sumInsure:    new FormControl(control.at(i).get('sumInsure')?.value, [Validators.required,Validators.min(0)]),
      adults1   :    new FormControl(control.at(i).get('adults1')?.value, [Validators.min(1),Validators.required]),
      adults2   :    new FormControl(control.at(i).get('adults2')?.value, [Validators.min(20),Validators.max(60)]),
      adults3   :    new FormControl(control.at(i).get('adults3')?.value, [Validators.min(20),Validators.max(60)]),
      kids     :    new FormControl(control.at(i).get('kids')?.value, [Validators.min(1),Validators.required]),
      minSalary:    new FormControl(control.at(i).get('minSalary')?.value, [Validators.required,Validators.min(0)]),
      maxSalary:    new FormControl(control.at(i).get('maxSalary')?.value, [Validators.required,Validators.min(0)])
    }
    );
    console.log(control.controls[i].value)

    control.push(x);

  }
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
  addDetailsE(i:any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    for(let z=0;z<control.length-1;z++)
    {
      for(let zz=z+1;zz<control.length;zz++)
      {
        console.log(control.at(z).value);
        console.log(control.at(zz).value)
        console.log(control.at(z).value===control.at(zz))
        if(JSON.stringify(control.at(z).value)===JSON.stringify(control.at(zz).value))
        {
          this.openSnackBar("Row "+(z+1)+" and Row "+(zz+1)+" are same please remove or change value to add new row")
          return
        }
      }
    }
    for(let k=0;k<control.length;k++)
    {
      if(this.insuranceForms.get('insuranceType')?.value=='LifeInsurance')
      {
        console.log('1');        
        if(control.at(k).get('sumInsure')?.invalid||control.at(k).get('premiums')?.invalid||control.at(k).get('durations')?.invalid||control.at(k).get('minSalary')?.invalid||control.at(k).get('maxSalary')?.invalid)
        {
          this.openSnackBar('Fill all the details of row  '+(k + 1)+'  to add new Row')
          return 
        }
      }
      if(this.insuranceForms.get('insuranceType')?.value=='AutoMobileInsurance')
      {
        console.log('Before');
        console.log('2');
        if(this.insuranceForms.get('modelsAllowed')?.invalid)
        {
          console.log('In method not allowed');
          this.insuranceForms.get('modelsAllowed')?.markAsTouched
          this.openSnackBar('Please select Models Allowed first')
          return 
        }
       console.log('After');
       
        if(control.at(k).get('sumInsure')?.invalid||control.at(k).get('premiums')?.invalid||control.at(k).get('durations')?.invalid)
        {
          this.openSnackBar('Fill all the details of row  '+(k + 1)+'  to add new Row')
          return 
        }
      }
       //premiums,durations,sumInsure,adults1,adults2,adults3,kids,minSalary,maxSalary
      if(this.insuranceForms.get('insuranceType')?.value=='HealthInsurance')
      {
        if(control.at(k).get('sumInsure')?.invalid||control.at(k).get('durations')?.invalid||control.at(k).get('adults2')?.invalid||control.at(k).get('adults3')?.invalid||control.at(k).get('adults')?.invalid||control.at(k).get('kids')?.invalid)
        {
          this.openSnackBar('Fill all the details of row  '+(k + 1)+'  to add new Row')
          return 
        }
      }
    }

    
    console.log(control.value);
    control.push(new FormGroup({
      premiums :    new FormControl("", [Validators.required,Validators.min(0)]),
      durations:    new FormControl("", [Validators.required,Validators.min(0)]),
      sumInsure:    new FormControl("", [Validators.required,Validators.min(0)]),
      adults1   :    new FormControl("", [Validators.min(1),Validators.required]),
      adults2   :    new FormControl("", [Validators.min(20),Validators.max(60)]),
      adults3   :    new FormControl("", [Validators.min(20),Validators.max(60)]),
      kids     :    new FormControl("", [Validators.min(1),Validators.required]),
      minSalary:    new FormControl("", [Validators.required,Validators.min(0)]),
      maxSalary:    new FormControl("", [Validators.required,Validators.min(0)])      
    }
    ));
  }
  removeDetails(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyDetails'];
    if(control.length==1)
    return

    control.removeAt(index);
  }
  addDetails1(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];

    if(!control.at(index).value.brief||!control.at(index).value.description)
    {
      return
    }

    this.flags[index]=false
    this.flags.push(true)
    control.push(new FormGroup({
      brief: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required])
    }
    ));
    const arr=new policyDetails('','');
      
      arr.briefs=control.controls[index].value.brief;
  
      arr.descriptions=control.controls[index].value.description;
      this.policyarray.push(arr);
      console.log(this.policyarray)
  }
  removeDetails1(index: any) {
    const control = <FormArray>this.insuranceForms.controls['policyBenefits'];
    control.removeAt(index);
    this.policyarray.splice(index, 1);
    this.flags.splice(index,1)
    console.log(this.policyarray)
    console.log(this.flags)
    console.log(this,this.insuranceForms.value);

  }
  addDetails2(index:any) {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    if((!control.at(index).value.addOnName||!control.at(index).value.addOnDescription||!control.at(index).value.addOnPremiums))
    {
     return
    }
    this.flag[index]=false
    this.flag.push(true)
    control.push(new FormGroup({
      addOnName: new FormControl("", [Validators.required]),
      addOnDescription: new FormControl("", [Validators.required]),
      addOnPremiums: new FormControl("", [Validators.required])
    }));
    const arr1=new premiumdetails('','',0);

      arr1.addOnName       =control.controls[index].value.addOnName;
      arr1.addOnDescription=control.controls[index].value.addOnDescription;
      arr1.addOnPremiums   =control.controls[index].value.addOnPremiums;
      this.premiumarray.push(arr1);
      console.log(this.premiumarray)
  }
  removeDetails2(index: any) {
    const control = <FormArray>this.insuranceForms.controls['addOnDetails'];
    control.removeAt(index);
    this.premiumarray.splice(index, 1);
    this.flag.splice(index,1)
    console.log(this.premiumarray)
    console.log(this.flag)
    console.log(this,this.insuranceForms.value);
  }





  get insurancex(){
    return this.insuranceForms.get('insuranceType')?.value!
  }
  get categoryx(){
    return this.insuranceForms.get('category')?.value!
  }
  get policyDetailsx() {
    return (this.insuranceForms.get('policyDetails') as FormArray).controls;
  }
  get policyBenefitsx() {
    return (this.insuranceForms.get('policyBenefits') as FormArray).controls;
  }
  get policyAddOnsx(){
    return (this.insuranceForms.get('addOnDetails') as FormArray).controls;
  }
//=========================================================================================================
//Methods for chips component
addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  sumInsuredValues: SumInsured[] = [{insuredSum: 100000}, {insuredSum: 1000000}, {insuredSum: 5000000}];
  duration: Duration[] = [{years: 1}, {years: 5}, {years: 10}];
  add(event: MatChipInputEvent): void {
    // const value = (event.value || '').trim();
    const value = +event.value ;
    // Add our fruit
    if (value && this.sumInsuredValues.filter((a)=>a.insuredSum==value).length>1) {
      this.sumInsuredValues.push({insuredSum: value});
      this.sumInsuredValues.sort((a,b)=>a.insuredSum-b.insuredSum)
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

    const value = +event.value ;

    if (value && this.duration.filter((a)=>a.years==value).length>1) {
      this.duration.push({years: value});
      this.duration.sort((a,b)=>a.years-b.years)
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

}

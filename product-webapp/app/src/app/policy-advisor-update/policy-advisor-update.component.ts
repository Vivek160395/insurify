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

policyAdvisor: PolicyAdvsior = new PolicyAdvsior();

  file!:File;
  Imgurl:string='';
  image:any;

  
  imgView2:boolean=false;

  //info: PolicyAdvsior = new PolicyAdvsior();
  
  info:any = {

    "emailId": null,
    "name": null,
    "gender": null,
    "dateOfBirth": null,
    "phoneNumber": null,
    "aadharNo": 0,

    "panNo": null,

    "yearsOfExperience": 0,

    // List<String> category;

    "category": null,

    "profilePic": null
  }

  //policyAdvisor: PolicyAdvsior = new PolicyAdvsior();
  constructor(private http:HttpClient, private policyadvisorService: PolicyAdvisorService) { }

  ngOnInit(): void {
      this.getDetails();
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


  getDetails(){

    this.policyadvisorService.getUserDetails().subscribe(data=>{
      console.log(this.file);
      for(var i=0;i<data.length;i++){
        if(data[i].emailId === this.policyAdvisor.emailId){
          this.info.name=data[i].name;
          this.info.phoneNumber=data[i].phoneNumber;
          this.info.dateOfBirth=data[i].dateOfBirth;
          this.info.gender=data[i].gender;
          this.info.aadharNo=data[i].aadharNo;
          this.info.panNo=data[i].panNo;
          this.info.yearsOfExperience = data[i].yearsOfExperience;

          //this.info.category = data[i].category;
          this.info.profilePic=data[i].profilePic;
        } 
      }
    })

  }

  //form-group
  PolicyAdvisorUpdate = new FormGroup({
      emailId: new FormControl(''),
      name: new FormControl('',[Validators.maxLength(20)]),
      phoneNumber: new FormControl(''),
      aadharNo: new FormControl(''),
      panNo: new FormControl(''),
      yearsOfExperience: new FormControl('', [Validators.pattern('^(0-9)*')]),
      gender: new FormControl(''),
      dateOfBirth: new FormControl(''),
      profilePic: new FormControl(''),
      category: new FormControl('')

    });

  //UpdateSubmitted(data: any){
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
  //}

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



  onSubmit(){
    console.log(this.PolicyAdvisorUpdate.value.dateOfBirth);
  // this.edit=true;
  // this.view=false;

  this.info.emailId= this.PolicyAdvisorUpdate.get('emailId')?.value;
    this.info.name=this.PolicyAdvisorUpdate.get('name')?.value;
    this.info.dateOfBirth=this.PolicyAdvisorUpdate.get('dateOfBirth')?.value;
    this.info.gender=this.PolicyAdvisorUpdate.get('gender')?.value;
    this.info.phoneNumber=this.PolicyAdvisorUpdate.get('phoneNumber')?.value;
    this.info.aadharNo=this.PolicyAdvisorUpdate.get('aadharNo')?.value;
    this.info.panNo=this.PolicyAdvisorUpdate.get('panNo')?.value;
    this.info.yearsOfExperience=this.PolicyAdvisorUpdate.get('yearsOfExperience')?.value;

    this.info.profilePic = this.PolicyAdvisorUpdate.get('profilePic')?.value;
    if(this.info.profilePic! = null){
      this.policyadvisorService.updateAdvisorDetails(this.info, this.info.emailId, this.file).subscribe(
        (res)=>console.log(res),
        (err)=>console.log(err)
      );
      }
      else{
        this.policyadvisorService.updateAdvisorWithoutImage(this.info, this.info.emailId).subscribe(
          (res) => console.log(res),
          (error) => console.log(error)
        );
      }
    }

  

  onCancel(){
    this.imgView2=true;
  }
  
    onImgSelected(e:any){
      if(e.target.files){
        var reader=new FileReader();
        this.file=e.target.files[0];
        console.log(this.file.size);
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
        this.Imgurl=event.target.result;
     }}}




}





import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { T } from '@angular/cdk/keycodes';
import { UserService } from '../user.service';
import { User } from '../user';
import { Address } from '../address';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  selectedFile=null;
  Imgurl=null;
  name1:any='srisha';
  number1:any=123
  aadhar1:any=123;
  pan1:any=123;
  pin1:any=502032;
  state1:any="ap";
  city1:any="hyd";
  dob1:any="20/08/1887";
  hno1:any="25-34/24";
  land1:any="opp. idbi bank";
  street1:any="rr nagar";
  gender1:any="Female";
  edit:boolean=true;
  view:boolean=false;

  address:Address=new Address("","","","","","");
  user1:User=new User("","","","","","","","",this.address,"","");

 


  constructor(private http:HttpClient,private service:UserService) { }

  ngOnInit(): void {
    this.getDetails();
  }



  getDetails(){
    this.service.getUserDetails().subscribe(data=>{
      for(var i=0;i<data.length;i++){
        if(data[i].emailId === this.service.email1){
        console.log("done");
        console.log(data[i].emailId);
        console.log(data[i].name);
        this.name1=data[i].name;
        this.number1=data[i].mobileNo;
        this.dob1=data[i].dateOfBirth;
        this.gender1=data[i].gender;
        this.aadhar1=data[i].aadharNo;
        this.pan1=data[i].panNo;
        if(data[i].aadharNo==0){
          this.aadhar1=null;
        }
        if(data[i].mobileNo==0){
          this.number1=null;
        }
        if(data[i].address==null){
        }
        else{
        this.hno1=data[i].address.houseNo;
        this.land1=data[i].address.landmark;
        this.city1=data[i].address.city;
        this.street1=data[i].address.street;
        this.state1=data[i].address.state;
        this.pin1=data[i].address.pinCode;
      }
         }
      }})
  }

  
profile=new FormGroup({
    name:new FormControl(null,[Validators.pattern('[a-zA-Z0-9 ]*')]),
    mobile:new FormControl(null,[Validators.pattern('[0-9]{10}')]),
    gender:new FormControl(null,[Validators.pattern('')]),
    dob:new FormControl(null,[Validators.pattern('([0-2][0-9]|(3)[0-1])(/)((0)[1-9]|[1][0-2])(/)([0-9]{4})')]),
    hno:new FormControl(null),
    street:new FormControl(null),
    landmark:new FormControl(null),
    city:new FormControl(null),
    state:new FormControl(null),
    pincode:new FormControl(null,[Validators.pattern('[1-9]{1}[0-9]{5}')]),
    pan:new FormControl(null,[Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
    aadhar:new FormControl(null,[Validators.pattern('[2-9]{1}[0-9]{11}')])
  });



  onSubmit(){
    this.edit=true;
    this.view=false;
    console.log(this.profile.value.name);
    this.user1.name=this.profile.value.name;
    this.user1.dateOfBirth=this.profile.value.dob;
    this.user1.gender=this.profile.value.gender;
    this.user1.mobileNo=this.profile.value.mobile;
    this.user1.aadharNo=this.profile.value.aadhar;
    this.user1.panNo=this.profile.value.pan;
    this.user1.address.city=this.profile.value.hno;
    this.user1.address.landmark=this.profile.value.landmark;
    this.user1.address.city=this.profile.value.city;
    this.user1.address.street=this.profile.value.street;
    this.user1.address.state=this.profile.value.state;
    this.user1.address.pinCode=this.profile.value.pincode;
    console.log(this.user1.address);
    this.service.updateUserDetails(this.user1);
}

onEdit(){
  this.edit=false;
  this.view=true;
}
  onImgSelected(e:any){
   if(e.target.files){
     var reader=new FileReader();
     reader.readAsDataURL(e.target.files[0]);
     reader.onload=(event:any)=>{
     this.Imgurl=event.target.result;
  }}}

  

 


  
}

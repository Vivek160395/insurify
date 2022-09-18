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
  data ={
    name:'srisha',
    mobileNo:123,
    aadharNo:123,
    panNo:123,
    dateOfBirth:"20/08/1887",
    gender:"Female",
    address:{
      houseNo:"25-34/24",
      landmark:"opp. idbi bank",
      street:"rr nagar",
      pinCode:502032,
      state:"ap",
      city:"hyd",
    }
  }
  edit:any = true;
  view:any = false;

  address:Address=new Address("","","","","","");
  user1:User=new User("","","","","","","","",this.address,"","");




  constructor(private http:HttpClient,private service:UserService) { }

  ngOnInit(): void {
    this.getDetails();
  }



  getDetails(){
    this.service.getUserDetails().subscribe(data1=>{
      for(var i=0;i<data1.length;i++){
        console.log(data1);
        if(data1[i].emailId === this.service.email1){
        console.log("done");
        console.log(data1[i].emailId);
        console.log(data1[i].name);
        this.data.name=data1[i].name;
        this.data.mobileNo=data1[i].mobileNo;
        this.data.dateOfBirth=data1[i].dateOfBirth;
        this.data.gender=data1[i].gender;
        this.data.aadharNo=data1[i].aadharNo;
        this.data.panNo=data1[i].panNo;
        if(data1[i].aadharNo==0){
          this.data.aadharNo=0;
        }
        if(data1[i].mobileNo==0){
          this.data.mobileNo=0;
        }
        if(data1[i].address==0 || data1[i].address == null){
        }
        else{
        this.data.address.houseNo=data1[i].address.houseNo;
        this.data.address.landmark=data1[i].address.landmark;
        this.data.address.city=data1[i].address.city;
        this.data.address.street=data1[i].address.street;
        this.data.address.state=data1[i].address.state;
        this.data.address.pinCode=data1[i].address.pinCode;
      }
         }
      }})
  }


profile=new FormGroup({
    name:new FormControl("",[Validators.pattern('[a-zA-Z0-9 ]*')]),
    mobile:new FormControl("",[Validators.pattern('[0-9]{10}')]),
    gender:new FormControl("",[Validators.pattern('')]),
    dob:new FormControl("",[Validators.pattern('([0-2][0-9]|(3)[0-1])(/)((0)[1-9]|[1][0-2])(/)([0-9]{4})')]),
    hno:new FormControl(""),
    street:new FormControl(""),
    landmark:new FormControl(""),
    city:new FormControl(""),
    state:new FormControl(""),
    pincode:new FormControl("",[Validators.pattern('[1-9]{1}[0-9]{5}')]),
    pan:new FormControl("",[Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
    aadhar:new FormControl("",[Validators.pattern('[2-9]{1}[0-9]{11}')])
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
    var formData:any = new FormData();
    var formData1:any = new FormData();
    formData.append("userDetails",this.data);
    console.log(this.data);

    formData1.append("imageFile","");
    this.service.updateUserDetails(formData).subscribe(data=>{
      console.log("Its Working");

    });
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

// private String userType;
// private String name;
// private String gender;
// private int age;
// private String dateOfBirth;
// private long mobileNo;
// private Address address;
// private long aadharNo;
// private String panNo;
// private byte[] profilePic;

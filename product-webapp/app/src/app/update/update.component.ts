import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  selectedFile=null;
  url=null;

  profile=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]),
    mobile:new FormControl(null,[Validators.required,Validators.pattern('[0-9]{10}')]),
    gender:new FormControl(null,[Validators.required,Validators.pattern('')]),
    dob:new FormControl(null,[Validators.required]),
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
    console.log(this.profile.value);
  }



  onImgSelected(e:any){
   if(e.target.files){
     var reader=new FileReader();
     reader.readAsDataURL(e.target.files[0]);
     reader.onload=(event:any)=>{
     this.url=event.target.result;
  }}}

}

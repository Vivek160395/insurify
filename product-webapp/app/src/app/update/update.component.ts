import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {

  file!: File;
  Imgurl: string = '';
  image: any;
  edit: boolean = true;
  view: boolean = false;
  imgView: boolean = false;
  imgView2: boolean = false;


  info: any = {
    "emailId": null,
    "password": null,
    "userType": null,
    "name": null,
    "gender": null,
    "age": null,
    "dateOfBirth": null,
    "mobileNo": null,
    "address": {
      "houseNo": null,
      "street": null,
      "landmark": null,
      "city": null,
      "state": null,
      "pinCode": null
    },
    "aadharNo": null,
    "panNo": null,
    "profilePic": null
  }


  constructor(private http: HttpClient, private service: UserService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.service.getUserDetails().subscribe(data => {
      console.log(this.file);
      for (var i = 0; i < data.length; i++) {
        if (data[i].emailId === this.service.email1) {
          this.info.name = data[i].name;
          this.info.mobileNo = data[i].mobileNo;
          this.info.dateOfBirth = data[i].dateOfBirth;
          this.info.gender = data[i].gender;
          this.info.aadharNo = data[i].aadharNo;
          this.info.panNo = data[i].panNo;
          this.info.profilePic = data[i].profilePic;
          if (this.info.profilePic == null) {
            this.imgView = true;
          }
          if (data[i].mobileNo == 0) {
            this.info.mobileNo = null;
          }
          if (data[i].aadharNo == 0) {
            this.info.aadharNo = null;
          }
          {
            if (data[i].address == null) {
            }
            else {
              this.info.address.houseNo = data[i].address.houseNo;
              this.info.address.landmark = data[i].address.landmark;
              this.info.address.city = data[i].address.city;
              this.info.address.street = data[i].address.street;
              this.info.address.state = data[i].address.state;
              this.info.address.pinCode = data[i].address.pinCode;
              if (data[i].address.houseNo == 0) {
                this.info.address.houseNo = null;
              }
              if (data[i].address.pinCode == 0) {
                this.info.address.pinCode = null;
              }
            }
          }
        }
      }
    })
  }


  profile = new FormGroup({
    name: new FormControl(" ", [Validators.pattern('[a-zA-Z0-9 ]*')]),
    mobileNo: new FormControl('', [Validators.pattern('[0-9]{10}')]),
    gender: new FormControl('', [Validators.pattern('')]),
    // dateOfBirth:new FormControl('',[Validators.pattern('([0-2][0-9]|(3)[0-1])(/)((0)[1-9]|[1][0-2])(/)([0-9]{4})')]),

    dateOfBirth: new FormControl(''),
    houseNo: new FormControl(''),
    street: new FormControl(''),
    landmark: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    pinCode: new FormControl('', [Validators.pattern('[1-9]{1}[0-9]{5}')]),
    panNo: new FormControl('', [Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]),
    aadharNo: new FormControl('', [Validators.pattern('[2-9]{1}[0-9]{11}')])
  });



  onSubmit() {
    console.log(this.profile.value.dateOfBirth);
    this.edit = true;
    this.view = false;
    this.info.name = this.profile.value.name;
    this.info.dateOfBirth = this.profile.value.dateOfBirth;
    this.info.gender = this.profile.value.gender;
    this.info.mobileNo = this.profile.value.mobileNo;
    this.info.aadharNo = this.profile.value.aadharNo;
    this.info.panNo = this.profile.value.panNo;
    this.info.address.houseNo = this.profile.value.houseNo;
    this.info.address.landmark = this.profile.value.landmark;
    this.info.address.city = this.profile.value.city;
    this.info.address.street = this.profile.value.street;
    this.info.address.state = this.profile.value.state;
    this.info.address.pinCode = this.profile.value.pinCode;
    if (this.info.profilePic != null) {
      this.imgView = false;
    }
    if (this.file == undefined) {
      this.service.updateDetails(this.info).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
    else {
      this.imgView = true;
      this.service.updateUserDetails(this.file, JSON.stringify(this.info)).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
  }

  onEdit() {
    this.edit = false;
    this.view = true;
  }

  onCancel() {
    this.edit = true;
    this.view = false;
    this.imgView2 = true;
    if (this.info.profilePic != null) {
      this.imgView = false;
    }
  }

  onImgSelected(e: any) {
    if (e.target.files) {
      this.imgView = true;
      var reader = new FileReader();
      this.file = e.target.files[0];
      console.log(this.file.size);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.Imgurl = event.target.result;
      }
    }
  }
}

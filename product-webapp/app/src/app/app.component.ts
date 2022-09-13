import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private httpClient:HttpClient){}

  retrieveResponse:any;
  base64Data:any;
  retrievedImage:any;

  ngOnInit() {
    this.httpClient.get('http://localhost:8010/api/vk1/get/596883')
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
   
}





function ngOnInit() {
  throw new Error('Function not implemented.');
}


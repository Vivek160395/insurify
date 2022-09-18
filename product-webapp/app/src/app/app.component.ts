import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(){}


  ngOnInit() {
    // this.httpClient.get('http://localhost:8010/api/vk1/get/371265')
    //   .subscribe(
    //     res => {
    //       this.retrieveResponse = res;
    //       this.base64Data = this.retrieveResponse.picByte;
    //       this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //     }
    //   );
  }

}


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  images:any =[];
  types:any =[];
  healthNames:any=[];
  count:number =0;
  countt:number=0;
  count2:number=0;
  allinsurances:any[][]=[[],[],[]];
  healthInsurance:any=[];
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    this.getALlImages();
    this.getNames();
    this.getInsurnacesAcc();
    this.getHealthInsurances();
  }
  isDisplay=false;
  isHealth=true;
  isOther=true;
  isLife =true;
  display(){
      this.isDisplay=!this.isDisplay;
      this.isHealth=!this.isHealth;
      this.isLife=!this.isLife;
      this.isOther=!this.isOther;
  }
  health(){
    this.isHealth=!this.isHealth;
    this.isDisplay=!this.isDisplay;
    this.isLife=!this.isLife;
    this.isOther=!this.isOther;
}
other(){
  this.isHealth=!this.isHealth;
  this.isDisplay=!this.isDisplay;
  this.isLife=!this.isLife;
  this.isOther=!this.isOther;
}
life(){
  this.isHealth=!this.isHealth;
  this.isDisplay=!this.isDisplay;
  this.isLife=!this.isLife;
  this.isOther=!this.isOther;
}
  getALlImages(){
    this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
      this.images = data;
      for(var i=0;i<this.images.length;i++){
        for(var j=i+1;j<this.images.length;j++){
           if(this.images[i].type==this.images[j].type){
            this.types[this.count] = this.images[i].type;
            this.count++;
          }
        }
      }
    })
  }
  getNames(){
    this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
      this.images = data;
for(var i=0;i<this.images.length;i++){
     if(this.images[i].type=="health"){
    this.healthNames[this.countt]=this.images[i].name;
    this.countt++;
  }
}
  })
}
getInsurnacesAcc(){
  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
console.log(this.images);
console.log(this.types);
console.log("done");
for(var i=0;i<this.types.length;i++){
  this.count2=0;
  for(var j=0;j<this.images.length;j++){
    if(this.types[i]==this.images[j].type){
      this.allinsurances[i][this.count2]=this.images[j];
      this.count2++;
    }
  }
}
console.log(this.allinsurances);
  })
}
getHealthInsurances(){

  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
     for(var i=0;i<this.allinsurances[0].length;i++){
    this.healthInsurance[i]=this.allinsurances[0][i];
    console.log("hello")
    }
  })
}

changeDiv(){

}
}

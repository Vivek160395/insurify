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
  otherNames:any=[];
  lifeNames:any=[];
  count:number =0;
  countt:number=0;
  count2:number=0;
  allinsurances:any[][]=[[],[],[]];
  healthInsurance:any=[];
  lifeInsurance:any=[];
  OtherInsurance:any=[];
  isHealth=true;
  isDisplay=false;
  isOther=true;
  isLife=true;
  health(){
    this.isHealth=!this.isHealth;
    this.isOther=true;
    this.isDisplay=true;
    this.isLife=true;
    if(this.isHealth==true){
       this.isDisplay=false;
    }
  }

other(){
    this.isDisplay=true;
    this.isHealth=true;
    this.isLife=true;
    this.isOther=!this.isOther;
    if(this.isOther==true){
      this.isDisplay=false;
   }
  }
life(){
  this.isDisplay=true;
  this.isHealth=true;
  this.isOther=true;
  this.isLife=!this.isLife;
  if(this.isLife==true){
    this.isDisplay=false;
 }
}
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getALlImages();
    this.getNamesHealth();
    this.getInsurnacesAcc();
    this.getHealthInsurances();
    this.getLifeInsurances();
    this.getOtherInsurances();
    this.getNamesOther();
    this.getNamesLife();
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

  getNamesHealth(){
    this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
    for(var i=0;i<this.images.length;i++){
     if(this.images[i].type=="health"){
    this.healthNames[this.countt]=this.images[i].name;
    this.countt++;
  }
}

  })
}

getNamesOther(){
  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
  for(var i=0;i<this.images.length;i++){
   if(this.images[i].type=="other"){
  this.otherNames[this.countt]=this.images[i].name;
  this.countt++;
}
}

})
}
getNamesLife(){
  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
  for(var i=0;i<this.images.length;i++){
   if(this.images[i].type=="life"){
  this.lifeNames[this.countt]=this.images[i].name;
  this.countt++;
}
}

})
}
getInsurnacesAcc(){
  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{

for(var i=0;i<this.types.length;i++){
  this.count2=0;
  for(var j=0;j<this.images.length;j++){
    if(this.types[i]==this.images[j].type){
      this.allinsurances[i][this.count2]=this.images[j];
      this.count2++;
    }
  }
}


  })
}

getHealthInsurances(){
  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
    for(var i=0;i<this.allinsurances[0].length;i++){
    this.healthInsurance[i]=this.allinsurances[0][i];
    }

})
}
getLifeInsurances(){
  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
    for(var i=0;i<this.allinsurances[2].length;i++){
    this.lifeInsurance[i]=this.allinsurances[2][i];
    }

  
})
}
getOtherInsurances(){
  this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
    for(var i=0;i<this.allinsurances[1].length;i++){
    this.OtherInsurance[i]=this.allinsurances[1][i];
    }
  
  
}
)
}
}
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  images:any =[];
  trendNames:any=[];
  healthNames:any=[];
  otherNames:any=[];
  lifeNames:any=[];
  cropNames:any=[];
  isHealth=true;
  isDisplay=false;
  isOther=true;
  isLife=true;
  isTrend=true;
  healthCount:number=0;
  lifeCount:number=0;
  otherCount:number=0;
  cropCount:number=0;
  displayHealth=false;
  displayLife=false;
  displayCrop=false;
  displayOther=false;
  health(){
    this.isHealth=!this.isHealth;
    this.isOther=true;
    this.isDisplay=true;
    this.isLife=true;
    this.isTrend=true;
    if(this.isHealth==true){
       this.isDisplay=false;
    }
  }
other(){
    this.isDisplay=true;
    this.isHealth=true;
    this.isLife=true;
    this.isTrend=true;
    this.isOther=!this.isOther;
    if(this.isOther==true){
      this.isDisplay=false;
   }
  }
life(){
  this.isDisplay=true;
  this.isHealth=true;
  this.isOther=true;
  this.isTrend=true;
  this.isLife=!this.isLife;
  if(this.isLife==true){
    this.isDisplay=false;
 }
}
trend(){
  this.isDisplay=true;
  this.isHealth=true;
  this.isOther=true;
  this.isLife=true;
  this.isTrend=!this.isTrend;
  if(this.isTrend==true){
    this.isDisplay=false;
    }
}
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
<<<<<<< HEAD
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
=======
    this.getNames();
    this.getTrendingNames();

  }
 
   

 getNames(){
      this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
        this.images=data;
        for(var i=0;i<this.images.length;i++){
          if(this.images[i].type=="health"){
         this.healthNames[this.healthCount]=this.images[i];
         this.healthCount++;
         this.displayHealth=true;
       }
       if(this.images[i].type=="life"){
        this.lifeNames[this.lifeCount]=this.images[i];
        this.lifeCount++;
        this.displayLife=true;
       }
       else if(this.images[i].type=="other"){
        this.otherNames[this.otherCount]=this.images[i];
        this.otherCount++;
        this.displayOther=true;
       }
       else if(this.images[i].type=="crop"){
        this.cropNames[this.cropCount]=this.images[i];
        this.cropCount++;
        this.displayCrop=true;
       }
      }
      })
    }
  
    getTrendingNames(){
      this.http.get("http://localhost:3000/trends").subscribe((data)=>{
        this.trendNames=data;
        console.log(this.trendNames);
      })
    
    }
  }
  
  

  
    




>>>>>>> 893cc0eaf9cb2435414a349d6fd0dc7038ae6ba3

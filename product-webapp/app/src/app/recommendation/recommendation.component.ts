import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
export interface Insurances {
  name: string;
}

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})

export class RecommendationComponent implements OnInit {
  allNames:any = [];
  isActive = true;
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
      this.allNames = this.images;
    }else{
      this.allNames = this.healthNames;
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
      this.allNames = this.images;
    }else{
    this.allNames = this.otherNames;
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
    this.allNames = this.images;
  }else{
 this.allNames = this.lifeNames;
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
    this.allNames = this.images;
  }else{
    this.allNames = this.trendNames;
  }
}
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    this.getNames();
    this.getTrendingNames();
  }



 getNames(){
      this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
        this.images=data;
        this.allNames = this.images;
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










import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { C, E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RecommendationServiceService } from '../recommendation-service.service';
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
  motorNames:any=[];
  lifeNames:any=[];
  otherNames:any=[];
  isHealth=true;
  isDisplay=false;
  isMotor=true;
  isLife=true;
  isTrend=true;
  isother=true;
  healthCount:number=0;
  lifeCount:number=0;
  otherCount:number=0;
  displayHealth=false;
  displayLife=false;
  displayother=false;
  displayOther=false;
  totalLength:any;
  page:number=1;
  showMore:boolean=false;
life(){
  this.isother=true;
  this.isMotor=true;
  this.isTrend=true;
  this.isLife=!this.isLife;
  if(this.isLife==true){
    this.isDisplay=false;
    this.allNames = this.images;
      this.totalLength=this.allNames.length;
  }else{
    this.allNames = this.lifeNames;
    this.totalLength=this.allNames.length;
  }
}
trend(){
  this.isother=true;
  this.isMotor=true;
  this.isLife = true;
  this.isTrend=!this.isTrend;
  if(this.isTrend==true){
    this.isDisplay=false;
    this.allNames = this.images;
    this.totalLength=this.allNames.length;
  }else{
    this.allNames = this.trendNames;
    this.totalLength=this.allNames.length;
  }
}
other(){
  this.isMotor =true;
  this.isTrend= true;
  this.isLife = true;
  this.isother = !this.isother;
  if(this.isother == true){
    this.isDisplay = false;
    this.allNames = this.images;
    this.totalLength=this.allNames.length;
  }else{
    this.allNames = this.otherNames;
    this.totalLength=this.allNames.length;
  }
}
motor(){
  this.isother =true;
  this.isTrend= true;
  this.isLife = true;
  this.isMotor = !this.isMotor;
  if(this.isMotor == true){
    this.isDisplay = false;
    this.allNames = this.images;
    this.totalLength=this.allNames.length;
  }else{
    this.allNames = this.motorNames;
    this.totalLength=this.allNames.length;
  }
}
  constructor(private http:HttpClient,private service:RecommendationServiceService) { }
  ngOnInit(): void {
    this.getNames();
    // this.getimageOfFarmer("Farmer Insurance");
    // this.getImagesOfLife("Life Insurance");
    // this.getimagesOfMotor("Motor Insurance");
    this.getrendingInsurances();
  }

 getNames(){
      this.service.getAllInsurances().subscribe((data)=>{
        console.log(data);
        this.images=data;
        this.allNames = this.images;
        console.log(this.images[0].imageType);
      })
    }
    getimageOfFarmer(type:string){
      this.service.getInsuranceOnBasisOfType(type).subscribe((data)=>{
          this.otherNames=data;
      })
    }
    getImagesOfLife(type:string){
      this.service.getInsuranceOnBasisOfType(type).subscribe((data)=>{
          this.lifeNames=data;
      })
    }
    getimagesOfMotor(type:string){
      this.service.getInsuranceOnBasisOfType(type).subscribe((data)=>{
          this.motorNames=data;
      })
    }
    getrendingInsurances(){
      this.service.getrendingInsurances().subscribe((data)=>{
        this.trendNames = data;
      })
    }
    getLifeInsurances(type:string){
      this.service.getInsuranceOnBasisOfType(type).subscribe((data)=>{
        this.lifeNames = data;
      })
    }
  }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  images:any =[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getALlImages();
  }
  getALlImages(){
    this.http.get("http://localhost:3000/recommendation").subscribe((data)=>{
      this.images = data;
      console.log(this.images[0].img);
    })
  }
}

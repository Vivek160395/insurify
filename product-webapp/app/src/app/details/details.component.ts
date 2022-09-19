import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  insuranceType: string | null;

 
  constructor() {
     this.insuranceType= localStorage.getItem('insuranceType');
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css']
})
export class InsuranceDetailsComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  images = [
    {path: '../../assets/img/Coronavirus-Business-Insurance.png'},
    {path: '../../assets/img/essentials-for-buying-a-long-term-comprehensive-bike-insurance-plan.webp'},
    {path: '../../assets/img/how-crop-insurance-will-benefit-the-farmers.jpg'},
    {path: '../../assets/img/istockphoto-856956280-612x612.jpg'},
    {path: '../../assets/img/image (1).png'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

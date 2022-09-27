import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Chart, BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale, LineController, LineElement, PointElement } from 'chart.js';
import { RecommendationServiceService } from '../recommendation-service.service';

@Component({
  selector: 'app-insurance-provider',
  templateUrl: './insurance-provider.component.html',
  styleUrls: ['./insurance-provider.component.css']
})
export class InsuranceProviderComponent implements OnInit {
  constructor(private elementRef: ElementRef, private route: Router, private service: RecommendationServiceService) {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  }

  myChart1: any = [];
  goto(id: any) {
    this.service.policyNo = id;
    this.route.navigateByUrl("/policyDetails");
  }
  ngOnInit(): void {
    this.getAllPolicies();
    // this.getPolicy();
    var ctx = this.elementRef.nativeElement.querySelector("#myChart").getContext('2d');
    this.myChart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  getAllPolicies() {
    this.service.getAllPolicies().subscribe(data => {
      this.policies = data.content;
      console.log(this.policies);
    })
  }
  policyName: any;
  policyType: any;
  pic: any;
  imageType: any;
  policies: any;
  // getPolicy() {
  //   this.service.getPolicyDetails("297025").subscribe(data => {
  //     console.log(data);
  //     this.policyName = data.policyName;
  //     this.policyType = data.insuranceType;
  //     this.pic = data.picByte;
  //     this.imageType = data.picType;
  //   })
  // }
}


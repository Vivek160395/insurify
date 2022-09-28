import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RecommendationServiceService } from '../recommendation-service.service';
import { Chart, registerables } from 'chart.js'


@Component({
  selector: 'app-insurance-provider',
  templateUrl: './insurance-provider.component.html',
  styleUrls: ['./insurance-provider.component.css']
})
export class InsuranceProviderComponent implements OnInit {
  constructor(private elementRef: ElementRef, private route: Router, private service: RecommendationServiceService) {
    Chart.register(...registerables)
  }

  myChart1: any = [];
  goto(id: any) {
    this.service.policyNo = id;
    this.route.navigateByUrl("/policyDetails");
  }
  ngOnInit(): void {
    this.getAllPolicies();
    var ctx = this.elementRef.nativeElement.querySelector("#myChart ").getContext('2d');
    this.myChart1 = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Corona',
          'Suv',
          'Term Life'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'cyan',
            'rgb(224, 194, 194)',
            '#F9E076'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
  policies: any = [];
  count = 0;
  getAllPolicies() {
    this.service.getAllPolicies().subscribe(data => {
      for (var i = 0; i < data.content.length; i++) {
        if (data.content[i].userEmail == this.service.userEmail) {
          this.policies[this.count] = data.content[i];
          this.count = this.count + 1;
        }
      }
    })
    console.log(this.policies);
  }
  policyName: any;
  policyType: any;
  pic: any;
  imageType: any;

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


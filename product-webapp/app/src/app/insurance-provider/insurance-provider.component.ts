// import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Route, Router } from '@angular/router';
// import { RecommendationServiceService } from '../recommendation-service.service';
// import { Chart, registerables } from 'chart.js'
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';

// interface BoughtDetails {
//   PolicyName: string;
//   Bought: number;
// }

// @Component({
//   selector: 'app-insurance-provider',
//   templateUrl: './insurance-provider.component.html',
//   styleUrls: ['./insurance-provider.component.css']
// })
// export class InsuranceProviderComponent implements OnInit, AfterViewInit {
//   constructor(private elementRef: ElementRef, private route: Router, private service: RecommendationServiceService) {
//     Chart.register(...registerables)
//   }
//   myChart1: any = [];
//   goto(id: any) {
//     this.service.policyNo = id;
//     this.route.navigateByUrl("/policyDetails");
//   }
//   ELEMENT_DATA: BoughtDetails[] = [];
//   ngOnInit(): void {
//     this.getAllPolicies();
//     var ctx = this.elementRef.nativeElement.querySelector("#myChart ").getContext('2d');
//     this.myChart1 = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: this.chartPolicyName,
//         datasets: [{
//           label: 'My First Dataset',
//           data: this.chartCount,
//           backgroundColor: [
//             'cyan',
//             'rgb(224, 194, 194)',
//             '#F9E076'
//           ],

//         }]
//       }
//     });
//   }
//   countData: any;
//   policies: any = [];
//   countofusersBountInsurance: any = [];
//   count = 0;
//   getAllPolicies() {
//     this.service.getAllPolicies().subscribe(data => {
//       for (var i = 0; i < data.content.length; i++) {
//         this.chartCount = data.content.map((data1: any) => data1.policyId);
//         this.chartPolicyName = data.content.map((data1: any) => data1.policyName);
//         if (data.content[i].userEmail == this.service.userEmail) {
//           this.policies[this.count] = data.content[i];
//           this.count = this.count + 1;
//           this.countData = {
//             "PolicyName": `${data.content[i].policyName}`,
//             "Bought": 0
//           }
//           this.ELEMENT_DATA.push(this.countData)
//         }
//       }
//       this.dataSource = this.ELEMENT_DATA;
//       console.log(this.ELEMENT_DATA);
//       console.log(this.chartCount);
//       console.log(this.chartPolicyName);
//     })
//   }
//   chartCount: any = [];
//   chartPolicyName: any = [];
//   policyName: any;
//   policyType: any;
//   pic: any;
//   imageType: any;
//   count2 = 0;
//   displayedColumns: string[] = ['PolicyName', 'Bought'];
//   dataSource: any = [];
//   countOfInsurances: any = [];

//   @ViewChild(MatPaginator)
//   paginator!: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
// }




import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RecommendationServiceService } from '../recommendation-service.service';
import { Chart, registerables } from 'chart.js'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface BoughtDetails {
  PolicyName: string;
  Bought: number;
}

@Component({
  selector: 'app-insurance-provider',
  templateUrl: './insurance-provider.component.html',
  styleUrls: ['./insurance-provider.component.css']
})
export class InsuranceProviderComponent implements OnInit, AfterViewInit {
  chartCount: any = [];
  chartPolicyName: any = [];
  policyName: any;
  policyType: any;
  pic: any;
  imageType: any;
  count2 = 0;
  displayedColumns: string[] = ['PolicyName', 'Bought'];
  dataSource: any = [];
  countOfInsurances: any = [];
  ELEMENT_DATA: BoughtDetails[] = [];
  countData: any;
  policies: any = [];
  countofusersBountInsurance: any = [];
  count = 0;
  userInsuranceCount = 0;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
      type: 'bar',
      data: {
        labels: this.chartPolicyName,
        datasets: [{
          label: 'My First Dataset',
          data: this.chartCount,
          backgroundColor: [
            'cyan',
            'rgb(224, 194, 194)',
            '#F9E076'
          ],
        }]
      }
    });
  }
  name: string = "";
  iId: string = "";
  getAllPolicies() {
    this.service.getAllPolicies().subscribe(data => {
      for (var i = 0; i < data.content.length; i++) {
        // this.chartCount = data.content.map((data1: any) => data1.policyId);
        // this.chartPolicyName = data.content.map((data1: any) => data1.policyName);
        if (data.content[i].userEmail == this.service.userEmail) {
          this.policies[this.count] = data.content[i];
          this.count = this.count + 1;
          // this.countData = {
          //   "PolicyName": `${data.content[i].policyName}`,
          //   "Bought": 20
          // }
          // this.ELEMENT_DATA.push(this.countData)
        }
      }
      console.log(this.policies);
      // while (this.userInsuranceCount < this.policies.length) {
      //   console.log("hello");
      //   this.service.getCountOfUsersBoughtInsurance(this.policies[this.userInsuranceCount].policyId).subscribe(data => {
      //     console.log(this.policies[this.userInsuranceCount].policyName);
      //   })
      //   this.userInsuranceCount += 1;
      // }
      // this.dataSource = this.ELEMENT_DATA;
      // console.log(this.ELEMENT_DATA);
      // console.log(this.chartCount);
      // console.log(this.chartPolicyName);
    })
  }
}





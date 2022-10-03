import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RecommendationServiceService } from '../Services/recommendation-service.service';
import { Chart, registerables } from 'chart.js'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface BoughtDetails {
  PolicyName: string;
  Bought: number;
}
var data12: any[] = [];
@Component({
  selector: 'app-insurance-provider',
  templateUrl: './insurance-provider.component.html',
  styleUrls: ['./insurance-provider.component.css']
})
export class InsuranceProviderComponent implements OnInit, AfterViewInit {
  constructor(private elementRef: ElementRef, private route: Router, private service: RecommendationServiceService) {
    Chart.register(...registerables)
  }
  myChart1: any = [];
  goto(id: any) {
    this.service.policyNo = id;
    this.route.navigateByUrl("/policyDetails");
  }
  ELEMENT_DATA: BoughtDetails[] = [];
  ngOnInit(): void {
    this.getAllPolicies();
    var ctx = this.elementRef.nativeElement.querySelector("#myChart ").getContext('2d');
    this.myChart1 = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.policynamesofInsurance,
        datasets: [{
          label: 'My First Dataset',
          data: [10, 20, 30, 40, 50, 60],
          backgroundColor: this.colors,
        }]
      }
    });
  }
  countData: any;
  policies: any = [];
  countofusersBountInsurance: any[] = [];
  policynamesofInsurance: any[] = [];
  count = 0;
  colors: any[] = [];
  page: number = 1;
  totalLength: any;
  getAllPolicies() {
    // console.log(this.colors);
    this.service.getuserPolicies(this.service.userEmail).subscribe(data => {
      this.policies = data
      // console.log(this.policies);
      for (var i = 0; i < data.length; i++) {
        this.policynamesofInsurance[this.count] = data[i].policyName;
        this.count += 1;
        this.service.getCountOfUsersBoughtInsurance(data[i].policyId).subscribe(da => {
          // this.countData = {
          //   "PolicyName": `${data[this.count2].policyName}`,
          //   "Bought": da
          // }
          // this.ELEMENT_DATA.push(this.countData);
          // this.dataSource = this.ELEMENT_DATA;
          this.countofusersBountInsurance[this.count2] = da;
          this.count2 += 1;
          // console.log(this.countofusersBountInsurance);
        })
      }
      // console.log(this.policynamesofInsurance);
      this.totalLength = this.policynamesofInsurance.length;
      for (var i = 0; i < this.policynamesofInsurance.length; i++) {
        var num = Math.floor(Math.random() * 256);
        var num1 = Math.floor(Math.random() * 256);
        var num2 = Math.floor(Math.random() * 256);
        this.colors.push(`rgb(${num},${num2},${num1})`)
        console.log(this.colors);
      }
    })

  }
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

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}






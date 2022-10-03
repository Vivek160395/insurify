import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RecommendationServiceService } from '../Services/recommendation-service.service';
import { Chart, registerables } from 'chart.js'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../Services/login.service';

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
  constructor(private elementRef: ElementRef, private route: Router, private service: RecommendationServiceService, private loginService: LoginService) {
    Chart.register(...registerables)
  }
  myChart1: any = [];
  goto(id: any) {
    this.service.policyNo = id;
    this.route.navigateByUrl("/policyDetails");
  }
  insurer: any = '';
  others: any = '';
  ELEMENT_DATA: BoughtDetails[] = [];
  ngOnInit(): void {
    console.log(this.service.userType);
    // console.log(this.service.userType);
    if (this.service.userType == "Insurer") {
      this.insurer = false;
      this.others = true;
    } else {
      this.insurer = true;
      this.others = false;
    }
    console.log(this.insurer);
    console.log(this.others);

    this.getAllPolicies();
    var ctx = this.elementRef.nativeElement.querySelector("#myChart ").getContext('2d');
    this.myChart1 = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.policynamesofInsurance,
        datasets: [{
          label: 'My First Dataset',
          data: [10, 20, 30, 40, 50, 60],
          // backgroundColor: ["rgb(189,126,91)",
          //   "rgb(30,105,122)",
          //   "rgb(114,151,164)",
          //   "rgb(206,181,111)",
          //   "rgb(30,75,91)",
          //   "rgb(94,119,125)"]
          backgroundColor: this.colors
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
      this.policies = data;
      for (var i = 0; i < this.policies.length; i++) {
        var num = Math.floor(Math.random() * 256);
        var num1 = Math.floor(Math.random() * 256);
        var num2 = Math.floor(Math.random() * 256);
        this.colors.push(`rgb(${num},${num1},${num2})`)
        // console.log(this.colors);
      }
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
      console.log(this.policynamesofInsurance);
      this.totalLength = this.policynamesofInsurance.length;
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






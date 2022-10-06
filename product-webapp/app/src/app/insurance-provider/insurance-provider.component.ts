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
    this.route.navigateByUrl("/home/policyDetails");
  }
  insurer: any = '';
  others: any = '';
  ELEMENT_DATA: BoughtDetails[] = [];
  countData: any;
  policies: any = [];
  countofusersBountInsurance: any[] = [];
  policynamesofInsurance: any[] = [];
  count = 0;
  colors: any[] = [];
  page: number = 1;
  totalLength: any;
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
  ngOnInit(): void {
    console.log(this.service.userType);
    if (this.service.userType == "insuranceprovider") {
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
    var dat = this.policynamesofInsurance;
    var chartData = this.countofusersBountInsurance;
    var colors = this.colors;
    setTimeout(() => {
      this.myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dat,
          datasets: [{
            label: "Count Of users",
            data: chartData,
            fill: false,
            borderColor: '#de7219',
            backgroundColor: '#de7219',
            tension: 0.1
          }]
        }
      });
    }, 2000)
  }

  getAllPolicies() {
    this.service.getuserPolicies(this.service.userEmail).subscribe(data => {
      this.policies = data;
      for (var i = 0; i < this.policies.length; i++) {
        var num = Math.floor(Math.random() * 256);
        var num1 = Math.floor(Math.random() * 256);
        var num2 = Math.floor(Math.random() * 256);
        this.colors.push(`rgb(${num},${num1},${num2})`)
      }
      for (var i = 0; i < data.length; i++) {
        this.policynamesofInsurance[this.count] = data[i].policyName;
        this.count += 1;
        this.service.getCountOfUsersBoughtInsurance(data[i].policyId).subscribe(da => {
          this.countofusersBountInsurance[this.count2] = da;
          this.count2 += 1;
        })
      }
      console.log(this.policynamesofInsurance);
      this.totalLength = this.policynamesofInsurance.length;
    })

  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}






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
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
  countData: any;
  policies: any = [];
  countofusersBountInsurance: any = [];
  policynamesofInsurance: any = [];
  count = 0;
  page: number = 1;
  totalLength: any;
  getAllPolicies() {
    this.service.getuserPolicies(this.service.userEmail).subscribe(data => {
      this.policies = data
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
          console.log(this.countofusersBountInsurance);
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






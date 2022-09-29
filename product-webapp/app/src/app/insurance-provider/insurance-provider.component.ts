import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RecommendationServiceService } from '../recommendation-service.service';
import { Chart, registerables } from 'chart.js'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


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
  ngOnInit(): void {
    this.getAllPolicies();
    var ctx = this.elementRef.nativeElement.querySelector("#myChart ").getContext('2d');
    this.myChart1 = new Chart(ctx, {
      type: 'pie',
      data: {
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
      this.dataSource = this.policies;
      console.log(this.dataSource);
    })
  }
  policyName: any;
  policyType: any;
  pic: any;
  imageType: any;
  count2 = 0;
  displayedColumns: string[] = ['policyName'];
  dataSource: any = [];
  countOfInsurances: any = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}



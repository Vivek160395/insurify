import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, VERSION } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalculatorComponent } from '../calculator/calculator.component';
import { RecommendationServiceService } from '../Services/recommendation-service.service';
export interface PeriodicElement1 {
  addOnName: string;
  addOnPremiums: number;
  addOnDescription: string;
}
export interface PeriodicElement2 {
  brief: string;
  description: string;
}
@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InsuranceDetailsComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  images = "../../assets/img/Coronavirus-Business-Insurance.png"
  displayedColumns: string[] = ['premiums', 'durations', 'sumInsure'];
  addOns: any = [];
  addOnDescription: string = "";
  policyName: string = "";
  policyType: string = "";
  pic: any = "";
  imageType: any = "";
  dataSource: any = [];
  dataSource1: any = [];
  dataSource2: any = [];
  demo: any = [];
  demo1: any = [];
  // dialog: any;
  buyPolicy() {

    // localStorage.setItem('insurance_id', this.service.policyNo);
    // console.log(localStorage.getItem('insurance_id'));
    this.route.navigateByUrl("/buy")
  }
  constructor(private service: RecommendationServiceService, public dialog: MatDialog, private route: Router) { }
  ngOnInit(): void {
    this.getPolicy();
    if (this.service.userType == "As Insurer") {
      this.edit = false;
      this.buy = true;
    } else if (this.service.userType == "As Insured") {
      this.edit = true;
      this.buy = false;
    }
  }

  view: boolean = true;
  wide: number = 0;
  carModel: number = 0;
  count: number = 0;
  count1: number = 0;
  firstDiv: String = "";
  cars: string[] = [];
  editPolicy() {
    this.route.navigateByUrl("/edit-insurance")
  }
  openDialog() {
    this.dialog.open(CalculatorComponent);
  }
  buy = false;
  edit = false;
  differentImg: string = "";
  befnefitsImg: string = "";
  getPolicy() {
    this.service.getPolicyDetails(this.service.policyNo).subscribe(data => {
      console.log(data);
      this.addOns = data.addOnDetails;
      this.addOnDescription = data.policyDescription;
      this.policyName = data.policyName;
      this.policyType = data.insuranceType;
      console.log(this.policyType);
      if (this.policyType === "AutoMobileInsurance") {
        this.displayedColumns = ['sumInsure', 'durations', 'premiums'];
        this.dataSource = data.policyDetails;
        this.view = false;
        this.wide = 8;
        this.carModel = 4;
        this.cars = data.modelsAllowed;
        this.differentImg = "../../assets/img/car-insurance-add-on.jpg";
        this.befnefitsImg = "../../assets/img/car.png"
      }
      else if (this.policyType === "LifeInsurance") {
        this.displayedColumns = ['sumInsure', 'durations', 'premiums', 'minSalary', 'maxSalary'];
        this.dataSource = data.policyDetails;
        this.wide = 12;
        this.view = true;
        this.carModel = 0;
        this.differentImg = "../../assets/img/Health-insurance.jpg";
        this.befnefitsImg = "../../assets/img/maxresdefault.jpg"
      } else if (this.policyType === "HealthInsurance") {
        this.displayedColumns = ['sumInsure', 'durations', 'adults1', 'adults2', 'adults3', 'kids'];
        this.dataSource = data.policyDetails;
        this.wide = 12;
        this.carModel = 0;
        this.view = true;
        this.differentImg = "../../assets/img/health-Insurance.png";
        this.befnefitsImg = "../../assets/img/Benefits-Health.jpg"
      }
      this.pic = data.picByte;
      this.imageType = data.picType;
      // this.dataSource1 = data.addOnDetails;
      for (var i = 0; i < data.addOnDetails.length; i++) {
        if (data.addOnDetails[i].addOnPremiums === 0) {
          console.log("hello");
        } else {
          this.demo[this.count] = data.addOnDetails[i];
          this.count = this.count + 1;
        }
      }
      for (var j = 0; j < data.policyBenefits.length; j++) {
        if (data.policyBenefits[j].brief.length == 0) {
          console.log("hello");
        } else {
          this.demo1[this.count1] = data.policyBenefits[j];
          this.count1 = this.count1 + 1;
        }
      }
      this.dataSource1 = this.demo;
      this.dataSource2 = this.demo1;
    })
  }
  columnsToDisplay = ['addOnName', 'addOnPremiums'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: PeriodicElement1 | null;

  columnsToDisplay1 = ['brief'];
  columnsToDisplayWithExpand1 = [...this.columnsToDisplay1, 'expand'];
  expandedElement1!: PeriodicElement2 | null;
}

// @Component({
//   selector: 'calculator',
//   templateUrl: 'calculator.html',

// })
// export class DialogElementsExampleDialog {
//   selectFormControl = new FormControl('', Validators.required);
// }


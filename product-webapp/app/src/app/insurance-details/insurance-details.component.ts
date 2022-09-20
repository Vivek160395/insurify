import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, VERSION } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RecommendationServiceService } from '../recommendation-service.service';
export interface PeriodicElement {
  premiums: number;
  durations: string;
  sumInsure: string;
}
export interface PeriodicElement1 {
  addOnName: string;
  addOnPremiums: number;
  addOnDescription: string;
}
interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class InsuranceDetailsComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  images ="../../assets/img/Coronavirus-Business-Insurance.png"
  displayedColumns: string[] = ['premiums', 'durations','sumInsure'];
  addOns:any =[];
  addOnDescription:string = "";
  policyName:string ="";
  policyType:string ="";
  pic:any ="";
  imageType:any="";
  dataSource = [];
  dataSource1 = [];
  constructor(private service:RecommendationServiceService) { }
  ngOnInit(): void {
    this.getPolicy();
  }
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  getPolicy(){
    this.service.getAllPolicy("985618").subscribe(data=>{
      this.addOns = data.addOnDetails;
      console.log(data);
      this.addOnDescription = data.policyDescription;
      this.policyName = data.policyName;
      this.policyType = data.insuranceType;
      this.pic = data.picByte;
      console.log(data.picByte);
      this.dataSource = data.policyDetails;
      this.imageType = data.picType;
      this.dataSource1 = data.addOnDetails;
    })
  }
  columnsToDisplay = ['addOnName', 'addOnPremiums'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: PeriodicElement | null;
}


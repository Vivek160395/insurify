import { Component, OnInit, VERSION } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface PeriodicElement {
  position: number;
  weight: number;
  symbol: string;
  sumInsured: string;
}
export interface PeriodicElement1 {
  addOnName: number;
  addOnDescription: number;
  addOnPremiums: string;
}
interface Animal {
  name: string;
  sound: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, weight: 1.0079, symbol: 'H',sumInsured:'a'},
  {position: 2, weight: 4.0026, symbol: 'He',sumInsured:'a'},
  {position: 3, weight: 6.941, symbol: 'Li',sumInsured:'a'},
  {position: 4, weight: 9.0122, symbol: 'Be',sumInsured:'a'},
  {position: 5, weight: 10.811, symbol: 'B',sumInsured:'a'},
  {position: 6, weight: 12.0107, symbol: 'C',sumInsured:'a'},
];
const ELEMENT_DATA1: PeriodicElement1[] = [
  {addOnName: 1, addOnDescription: 1.0079, addOnPremiums: 'H'},
  {addOnName: 2, addOnDescription: 4.0026, addOnPremiums: 'He'},
  {addOnName: 3, addOnDescription: 6.941, addOnPremiums: 'Li'},
];
@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css']
})
export class InsuranceDetailsComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  images ="../../assets/img/Coronavirus-Business-Insurance.png"
  displayedColumns: string[] = ['position', 'weight', 'symbol','sumInsured'];
  dataSource = ELEMENT_DATA;
  displayedColumns1: string[] = ['addOnName', 'addOnDescription', 'addOnPremiums'];
  dataSource1 = ELEMENT_DATA1;
  constructor() { }

  ngOnInit(): void {
  }
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
}

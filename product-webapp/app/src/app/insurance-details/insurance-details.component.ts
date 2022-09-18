import { Component, OnInit, VERSION } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface PeriodicElement {
  position: number;
  weight: number;
  symbol: string;
  sumInsured: string;
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
  constructor() { }

  ngOnInit(): void {
  }
  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
}

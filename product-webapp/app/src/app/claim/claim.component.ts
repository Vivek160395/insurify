import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface Policy {
  name: string;
 
}
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  animalControl = new FormControl<Policy | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Policy[] = [
    {name: 'Motor Insurance'},
    {name: 'Health Insurance' },
    {name: 'Life Insurance'},
  ];

}

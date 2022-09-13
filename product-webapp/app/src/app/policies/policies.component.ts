import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  constructor() { }
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  ngOnInit(): void {
  }

  title = 'policies-details';
  searchedKeyword!: string;

  policies = [
    {
      name:'Motor Insurance',
      policyNo: '013298',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$3000'
    },
    {
      name:'Health Insurance',
      policyNo: '0169182',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2027',
      sumInsured:'$5000'
    },
    {
      name:'Life Insurance',
      policyNo: '2132951',
      purchaseDate: '21-11-2022',
      endDate: '20-11-2042',
      sumInsured:'$10000'
    },
    {
      name:'Crop Insurance',
      policyNo: '5132911',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$2000'
    },
    {
      name:'ABC Insurance',
      policyNo: '011291',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$3000'
    },
    {
      name:'XYZ Insurance',
      policyNo: '7132981',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$3000'
    },
    {
      name:'Motor Insurance',
      policyNo: '013298',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$3000'
    }
  ]
}

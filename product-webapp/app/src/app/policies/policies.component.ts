import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent {

  constructor(public dialog: MatDialog, private router: Router) {}

  

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
      sumInsured:'$3000',
      status:'claimed'
    },
    {
      name:'Health Insurance',
      policyNo: '0169182',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2027',
      sumInsured:'$5000',
      status:"active"
    },
    {
      name:'Life Insurance',
      policyNo: '2132951',
      purchaseDate: '21-11-2022',
      endDate: '20-11-2042',
      sumInsured:'$10000',
      status:"active"
    },
    {
      name:'Crop Insurance',
      policyNo: '5132911',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$2000',
      status:"active"
    },
    {
      name:'ABC Insurance',
      policyNo: '011291',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$3000',
      status:"active"
    },
    {
      name:'XYZ Insurance',
      policyNo: '7132981',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$3000',
      status:"active"
    },
    {
      name:'Motor Insurance',
      policyNo: '013298',
      purchaseDate: '28-01-2022',
      endDate: '27-01-2023',
      sumInsured:'$3000',
      status:"active"
    }
  ]

  openDialog() {
    // console.log(data);
    this.router.navigateByUrl('/details');
    localStorage.setItem('policy',"motor");
    // const dialogRef = this.dialog.open(DetailsComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}

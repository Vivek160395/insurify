import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  {

  email:any;
  avatarUrl:any;
  name:any;

  motors: string[] = [
    'Motor Insurance',
    'Bike Insurance',
    'Car Insurance',
    ];

    healths: string[] = [
      'Health Insurance',
      'Health Booster',
      'Personal Protect',
      ];

      renewals: string[] = [
        'Car Policy',
        'Bike Policy',
        'Health Policy',
        ];

        claims: string[] = [
          'Health Claims',
          'Motor Claims'
          ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XLarge)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver,private router: Router) { }

 

  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renew-completion',
  templateUrl: './renew-completion.component.html',
  styleUrls: ['./renew-completion.component.css']
})
export class RenewCompletionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // ok(){
  //   this.router.navigateByUrl('localhost:4200/renewal-home')
  // }

}

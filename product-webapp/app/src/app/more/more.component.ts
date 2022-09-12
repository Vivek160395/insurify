import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

  @Input() text:string='';
  @Input() limit:number=0;
showMore:boolean;
  constructor() {
    this.showMore=false;
   }

  ngOnInit(): void {
  }

}

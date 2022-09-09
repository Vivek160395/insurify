import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-rec',
  templateUrl: './search-rec.component.html',
  styleUrls: ['./search-rec.component.css']
})
export class SearchRecComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
enteredSearchValue:string='';

@Output()
searchTextChanged:EventEmitter<string>=new EventEmitter<string>();

onSearchTextChanged(){
  this.searchTextChanged.emit(this.enteredSearchValue);
}
}

import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-preview-markup',
  templateUrl: './preview-markup.component.html',
  styleUrls: ['./preview-markup.component.css']
})
export class PreviewMarkupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}

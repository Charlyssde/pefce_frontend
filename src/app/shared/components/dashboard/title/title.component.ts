import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'shared-dashboard-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements  OnChanges {

  @Input() title: string = "";

  constructor(
  ) { }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.title.currentValue) {


    }
  }

  

}

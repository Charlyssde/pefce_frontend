import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-area-section',
  templateUrl: './title-area-section.component.html',
  styleUrls: ['./title-area-section.component.css']
})
export class TitleAreaSectionComponent implements OnInit {
  @Input() background: String = null;
  @Input() title: String = null;
  @Input() subtitle: String = null;
  @Input() description: String = null;

  constructor() { }

  ngOnInit() {
  }

}

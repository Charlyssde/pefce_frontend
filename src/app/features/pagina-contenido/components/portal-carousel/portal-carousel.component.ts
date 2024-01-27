import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal-carousel',
  templateUrl: './portal-carousel.component.html',
  styleUrls: ['./portal-carousel.component.css']
})
export class PortalCarouselComponent implements OnInit {

  @Input() slidesData: any = [];
  @Input() title: any = null;

  constructor() { }

  ngOnInit() {
  }

}

import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-links-section',
  templateUrl: './internal-links-section.component.html',
  styleUrls: ['./internal-links-section.component.css']
})
export class InternalLinksSectionComponent implements OnInit {
  @Input() links = [];

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }

  redirectLink(link:any):void{
    if(link.internalRedirect){
      this.route.navigate([link.url]);
    }
    else{
      window.open(link.url,'_BLANK');
    }
  }

}

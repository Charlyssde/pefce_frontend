import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.css']
})
export class SocialNetworksComponent implements OnInit {
  @Input() socialNetworks: any;

  constructor() { }

  ngOnInit() {
  }

  openSite(url: string):void{
    window.open(url,'_BLANK');
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.css']
})
export class ContactSectionComponent implements OnInit {
  @Input() title = null;
  @Input() contactos = [];

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interesting-sites-section',
  templateUrl: './interesting-sites-section.component.html',
  styleUrls: ['./interesting-sites-section.component.css']
})
export class InterestingSitesSectionComponent implements OnInit {

  interestingSites: any = [
    { pathfile: './assets/images/default/veracruz_c.png', url:'http://www.veracruz.gob.mx/', alt:'Gobierno del Estado de Veracruz' },
    { pathfile: './assets/images/default/relaciones_exteriores_c.jpeg', url:'https://www.gob.mx/sre/', alt:'Secretaría de Relaciones Exteriores' },
    { pathfile: './assets/images/default/secretaria_economia_c.jpeg', url:'https://www.gob.mx/se', alt:'Secretaría de Economía' },
    { pathfile: './assets/images/default/ventanilla_unica_c.jpeg', url:'https://www.ventanillaunica.gob.mx/vucem/index.html', alt:'Ventanilla única' },
    { pathfile: './assets/images/default/data_mexico_c.jpeg', url:'https://datamexico.org/', alt:'Data Mexico' },
    { pathfile: './assets/images/default/inegi_c.jpeg', url:'https://www.inegi.org.mx/', alt:'INEGI' },
  ];

  constructor() { }

  ngOnInit() {
  }

  openSite(url: string):void{
    window.open(url,'_BLANK');
  }
}

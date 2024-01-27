import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ContenidoComponent } from 'src/app/layouts/contenido/contenido.component';
import { PaginaContenidoService } from '../../../features/pagina-contenido/services/pagina-contenido.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'site-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {
  actualYear: number = new Date().getFullYear();

  // Capsula Section
  capsules: any = [];
  srcCapsula: string = null;
  titleCapsula: string = null;
  playVid: number = null;

  lang: string = null;
  actYear: number = new Date().getFullYear();

  footer: any = null;

  multimedia: any = {};

  pefceInfo: any = {
    "empresas": 0,
    "proyectos": 0,
    "eventos": 0,
    "capacitaciones": 0
  };
  capacitaciones: any = null;
  eventos: any = null;

  dataMexico: any = {
    "poblacion": { "Year": 0, "Population": 0 },
    "ECI": { "Year": 0, "ECI": 0 },
    "Ventas": { "Year": 0, "Trade": 0 },
    "Compras": { "Year": 0, "Trade": 0 },
    "EconAct": { "Year": 0, "Workforce": 0 },
    "TasaDesem": { "Year": 0, "Workforce": 0 },
    "InformLab": { "Year": 0, "Workforce": 0 },
    "IngMensTrim": { "Year": 0, "Income": 0 },
    "InvExtr": { "Year": 0, "Investment": 0 }
  };

  // Mapas
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;

  lat = 19.5156579;
  lng = -96.8779806;
  zoom = 17;
  marker: mapboxgl.Marker;


  constructor(
    public layout: ContenidoComponent,
    private pCService: PaginaContenidoService,
    private router: Router
  ) {
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  ngOnInit() {
    this.getDatosPefce();
    this.getDataMexicoInfo();
    setTimeout(() => { this.getContent(); }, 200);
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.scrollZoom.disable();
    this.marker = new mapboxgl.Marker({ color: '#af3f36' })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
    this.map.addControl(new mapboxgl.NavigationControl());
  }


  // Backend
  async getContent() {
    await this.pCService.getPageContent('footer').subscribe((data) => {
      this.footer = data.contenido;
      this.multimedia = data.contenido.multimedia;
      this.capsules = data.contenido.capsulas;
      this.buildMap();
      this.getMultimedia();
      this.getCapsules();
    });
  }

  async getMultimedia() {
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val].pathfile = environment.apiUrl + '/files/getUrl?pathfile=' + this.multimedia[val].pathfile;
    });
  }

  async getCapsules() {
    this.capsules.forEach((val, i) => {
      this.capsules[i].pathfile = environment.apiUrl + '/files/getUrl?pathfile=' + this.capsules[i].pathfile;
    });
  }

  openTab(url: string) {
    if (url !== "/inicio") window.open(url, "_BLANK");
    else this.router.navigate(['/' + url]);
  }

  // Datos PEFCE
  async getDatosPefce() {
    await this.pCService.getAllPefceNumbers().subscribe((resp) => {
      this.pefceInfo = {
        "empresas": 0,
        "proyectos": 0,
        "eventos": 0,
        "capacitaciones": 0
      }
      resp.map((value) => {
        this.pefceInfo[value.name] = value.number;
      });      
    });
  }

  // DataMexico disparador
  getDataMexicoInfo() {
    this.getDMPopulationInfo();
    this.getDMECIInfo();
    this.getDMVentas();
    this.getDMCompras();
    this.getDMEconAct();
    this.getDMInformLab();
    this.getDMIngMensTrim();
    this.getDMInvExtr();
  }
  // Población
  getDMPopulationInfo() {
    let uri = 'https://api.datamexico.org/tesseract/data.jsonrecords?State=30&cube=inegi_population_total&drilldowns=Year&locale=es&measures=Population&parents=false&sparse=false';
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp = data.data;
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      this.dataMexico.poblacion = resp[0];
    });
  }
  // Complejidad económica
  getDMECIInfo() {
    let uri = 'https://api.datamexico.org/tesseract/data.jsonrecords?State=30&cube=complexity_eci&drilldowns=Year&locale=es&measures=ECI&parents=false&sparse=false';
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp = data.data;
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      this.dataMexico.ECI = resp[0];
    });
  }
  // Ventas internacionales
  getDMVentas() {
    let uri = 'https://api.datamexico.org/tesseract/data.jsonrecords?Flow=2&Product+Level=4&State=30&cube=economy_foreign_trade_ent&drilldowns=State%2CDate+Year&locale=es&measures=Trade+Value&parents=false&sparse=false';
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp: any = [];
      (data.data).forEach((val, i) => { resp.push({ "Year": val['Date Year'], "Trade": val["Trade Value"] }); });
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      this.dataMexico.Ventas = resp[0];
    });
  }
  // Compras internacionales
  getDMCompras() {
    let uri = "https://api.datamexico.org/tesseract/data.jsonrecords?Flow=1&Product+Level=4&State=30&cube=economy_foreign_trade_ent&drilldowns=State%2CFlow%2CDate+Year&locale=es&measures=Trade+Value&parents=false&sparse=false";
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp: any = [];
      (data.data).forEach((val, i) => { resp.push({ "Year": val['Date Year'], "Trade": val["Trade Value"] }); });
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      this.dataMexico.Compras = resp[0];
    });
  }
  // Población económicamente activa
  getDMEconAct() {
    let uri = "https://api.datamexico.org/tesseract/data.jsonrecords?Economically+Active+Population=1&State=30&cube=inegi_enoe&drilldowns=Economically+Active+Population%2CQuarter%2CState&locale=es&measures=Workforce&parents=false&sparse=false";
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp: any = [];
      (data.data).forEach((val, i) => { resp.push({ "Year": (val['Quarter']).replace('-Q', '-T'), "Workforce": val["Workforce"] }); });
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      this.dataMexico.EconAct = resp[0];

      this.getDMTasaDesemp(resp[0].Workforce);
    });
  }
  // Tasa de desempleo
  getDMTasaDesemp(EconAct: any) {
    let uri = "https://api.datamexico.org/tesseract/data.jsonrecords?Economically+Active+Population=1&Population+Classification=2&State=30&cube=inegi_enoe&drilldowns=Economically+Active+Population%2CQuarter%2CState&locale=es&measures=Workforce&parents=false&sparse=false";
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp: any = [];
      (data.data).forEach((val, i) => { resp.push({ "Year": (val['Quarter']).replace('-Q', '-T'), "Workforce": val["Workforce"] }); });
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      resp[0].Workforce = (resp[0].Workforce / EconAct) * 100;
      this.dataMexico.TasaDesem = resp[0];
    });
  }
  // Informalidad laboral
  getDMInformLab() {
    let uri = "https://api.datamexico.org/tesseract/data.jsonrecords?Population+Classification=1&State=30&cube=inegi_enoe&drilldowns=State%2CQuarter&locale=en&measures=Workforce&parents=false&sparse=false";
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp: any = [];
      (data.data).forEach((val, i) => { resp.push({ "Year": (val['Quarter']).replace('-Q', '-T'), "Workforce": val["Workforce"] }); });
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      let total = resp[0];

      let uri = "https://api.datamexico.org/tesseract/data.jsonrecords?Classification+of+Formal+and+Informal+Jobs+of+the+First+Activity=1&Economically+Active+Population=1&State=30&cube=inegi_enoe&drilldowns=State%2CQuarter&measures=Workforce&parents=false&sparse=false";
      this.pCService.getDataMexicoInfo(uri).subscribe((data2) => {
        let resp2: any = [];
        (data2.data).forEach((val, i) => { resp2.push({ "Year": (val['Quarter']).replace('-Q', '-T'), "Workforce": val["Workforce"] }); });
        resp2.sort((a, b) => (a.Year > b.Year ? -1 : 1));
        let tasa = resp2[0];
        tasa.Workforce = (tasa.Workforce / total.Workforce) * 100;
        this.dataMexico.InformLab = tasa;
      });
    });
  }
  // Ingreso corriente trimestral
  getDMIngMensTrim() {
    let uri = "https://api.datamexico.org/tesseract/cubes/inegi_enigh_income/aggregate.jsonrecords?cuts%5B%5D=State.State.State.30&cuts%5B%5D=Year.Year.Year.2020&drilldowns%5B%5D=State.State.State&drilldowns%5B%5D=Year.Year.Year&measures%5B%5D=Quarterly+Income&parents=false&sparse=false";
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp: any = [];
      (data.data).forEach((val, i) => { resp.push({ "Year": val['Year'], "Income": val["Quarterly Income"] }); });
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      this.dataMexico.IngMensTrim = resp[0];
    });
  }
  // Inversión extranjera
  getDMInvExtr() {
    let uri = "https://api.datamexico.org/tesseract/data.jsonrecords?State=30&cube=fdi_2_state_investment&drilldowns=State%2CYear&measures=Investment&parents=false&sparse=false";
    this.pCService.getDataMexicoInfo(uri).subscribe((data) => {
      let resp: any = [];
      (data.data).forEach((val, i) => { resp.push({ "Year": val['Year'], "Investment": val["Investment"] }); });
      resp.sort((a, b) => (a.Year > b.Year ? -1 : 1));
      this.dataMexico.InvExtr = resp[0];
    });
  }
}

import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ContenidoComponent } from 'src/app/layouts/contenido/contenido.component';
import { PaginaContenidoService } from '../../services/pagina-contenido.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-atraccion-inversiones',
  templateUrl: './atraccion-inversiones.component.html',
  styleUrls: ['./atraccion-inversiones.component.css']
})
export class AtraccionInversionesComponent implements OnInit {
  filesEndpoint: String = environment.apiUrl + '/files/getUrl?pathfile=';

  links: any = [];
  
  contactos: any = [
    { "position": "Director para la atracción de inversiones", "name": "Lic. Salvador Alcántara Solórzano", "email":"salcantaras@veracruz.gob.mx", "phone":"2288 418500 ext. 1600" },
    { "position": "Jefa de departamento de análisis y consultoría para la atracción de inversiones", "name": "Arq. Xóchitl Soto Torres", "email":"xsotot@veracruz.gob.mx", "phone":"2288 418500 ext. 2230" },
    { "position": "Jefe de departamento de Promoción y Atención a las Inversiones", "name": "Lic. Luis Edwin Bernal Upton", "email":"lebernal@veracruz.gob.mx", "phone":"2288 418500 ext 3617" }
  ];

  capacitaciones: any = [];
  eventos: any = [];

  url: any = (window.location.pathname).split("/");
  pageName: string = this.url[this.url.length - 1] === 'atraccionInversiones' ? 'atraccionInversiones' : this.url[this.url.length - 1];

  data: any = null;
  labels: any = null;
  multimedia: any = null;
  videos: any = null;

  capsulas: any = [];

  constructor(
    public layout: ContenidoComponent,
    private pCService: PaginaContenidoService,
    private app_master: AppComponent,
    public translate: TranslateService
  ) {
    this.app_master.cargando = true;
    this.app_master.cargandoTexto = 'Cargando';
    this.translate.stream(["atraccion_inversiones.oportunidades","atraccion_inversiones.capacitacion","atraccion_inversiones.parks","atraccion_inversiones.dian"]).subscribe(dataset => {
      this.links = [
        { icon: 'waving_hands', label: dataset["atraccion_inversiones.oportunidades"], internalRedirect: true, url: '/auth/login' },
        { icon: 'school', label: dataset["atraccion_inversiones.capacitacion"], internalRedirect: true, url: '/auth/login' },
        { icon: 'factory', label: dataset["atraccion_inversiones.parks"], internalRedirect: false, url: 'http://plataformadigitalindustrial.veracruz.gob.mx/' },
        { icon: 'support_agent', label: dataset["atraccion_inversiones.dian"], internalRedirect: true, url: '/auth/login' },
      ];
    });
  }

  ngOnInit() {
    this.layout.pageName = this.pageName;
    this.getDatosPefce();
    this.getContenido();
    setTimeout(() => { this.app_master.cargando = false; }, 2000);
  }

  async getContenido() {
    await this.pCService.getPageContent('atraccionInversiones').subscribe((resp) => {
      this.data = resp;
      this.labels = resp.contenido.lang;
      this.multimedia = resp.contenido.multimedia;
      this.videos = resp.contenido.videos;
      this.getMultimedia();
      this.getVideos();
    });
  }

  async getDatosPefce() {
    await this.pCService.getDatosPefce().subscribe((resp) => {
      let
        eventos = (resp.eventos).filter((x) => new Date(x.fechaInicio).getFullYear() == new Date().getFullYear() && new Date(x.fechaInicio) >= new Date() && (x.subarea === 'atraccionInversiones')),
        capacitaciones = (resp.capacitaciones).filter((x) => new Date(x.fechaInicio).getFullYear() == new Date().getFullYear() && new Date(x.fechaInicio) >= new Date() && (x.subarea === 'atraccionInversiones')) ;

        this.capacitaciones = this.prepareCoursesCarouselData(capacitaciones);
        this.eventos = this.prepareEventsCarouselData(eventos);
    });
  }

  prepareCoursesCarouselData(courses:any): any{
    let courseCarousel =[];
    courses.forEach(course => {
      courseCarousel.push({
        name: course.nombre,
        desc: course.descripcion,
        cover: (course.portada === null || course.portada === '' ? './assets/img/eventos-ferias/background_e.jpeg' : this.filesEndpoint+course.portada),
        subarea: course.subarea
      });
    });
    return courseCarousel;
  }

  prepareEventsCarouselData(events:any): any{
    let eventsCarousel = [];
    events.forEach(event => {
      eventsCarousel.push({
        name: event.nombreEvento,
        desc: event.descripcion,
        cover: (event.pathfileCover !== null && event.pathfileCover !== '' ? this.filesEndpoint+event.pathfileCover : './assets/img/eventos-ferias/background_e.jpeg'),
        subarea: event.subarea
      });
    });
    return eventsCarousel;
  }

  async getMultimedia() {
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val].pathfile = this.filesEndpoint + this.multimedia[val].pathfile;
    });
  }
  async getVideos(){
    Object.keys(this.videos).forEach((val) => {
      this.videos[val].pathfile = environment.apiUrl+'/files/getUrl?pathfile='+this.videos[val].pathfile
    });
  }

}

import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ContenidoComponent } from 'src/app/layouts/contenido/contenido.component';
import { PaginaContenidoService } from '../../services/pagina-contenido.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proyectos-estrategicos',
  templateUrl: './proyectos-estrategicos.component.html',
  styleUrls: ['./proyectos-estrategicos.component.css']
})
export class ProyectosEstrategicosComponent implements OnInit {
  filesEndpoint: String = environment.apiUrl + '/files/getUrl?pathfile=';
  links: any = [];
  contactos: any = [
    { "position": "Coordinador de Proyectos Estratégicos y del Istmo de Tehuantepec ", "name": "Lic. Víctor Gonzalo Romero Sánchez", "email":"victor.romero.sedecop@gmail.com | vgromero@veracruz.gob.mx", "phone":"2288418500 ext.2250" },
    { "position": "Ejecutiva de Proyectos de Gestión y Acompañamiento", "name": "Lic. Inés Eugenia Ramírez Cabrera", "email":"iramirezc@veracruz.gob.mx", "phone":"2288418500 ext. 2120" },
    { "position": "Ejecutivo de Proyectos de Logística y Operación", "name": "C. Óscar Miguel Nava Fernández ", "email":"omnava@veracruz.gob.mx", "phone":"2281418500 ext. 2120" }
  ]

  socialNetworks: any = [
    { "icon": "fab fa-facebook-square", "title": "Facebook", "url":"https://www.facebook.com/pages/category/Show/Programa-Istmo-1276683332492010/"  },
    { "icon": "fab fa-twitter-square", "title": "Twitter", "url":"https://twitter.com/Programa_Istmo?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"  },
    { "icon": "fab fa-instagram-square", "title": "Instagram", "url":"https://www.instagram.com/programaistmo"  },
    { "icon": "fab fa-youtube", "title": "Youtube", "url":"https://www.youtube.com/channel/UCxrpvZFO5GeO7biQ_6s5h-A"  }
  ];

  capacitaciones: any = [];
  eventos: any = [];

  url: any = (window.location.pathname).split("/");
  pageName: string = this.url[this.url.length -1] === 'proyectosEstrategicos' ? 'proyectosEstrategicos' : this.url[this.url.length -1];

  data:any = null;
  labels:any = null;
  multimedia:any = null;
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
      this.translate.stream(["proyectos_estrategicos.importadores","proyectos_estrategicos.exportadores","proyectos_estrategicos.embajadas","proyectos_estrategicos.promocion"]).subscribe(dataset => {
        this.links = [
          { icon: 'move_to_inbox', label: dataset['proyectos_estrategicos.importadores'], internalRedirect: true, url: '/loginEmpresas' },
          { icon: 'outbox', label: dataset['proyectos_estrategicos.exportadores'], internalRedirect: true, url: '/loginEmpresas' },
          { icon: 'flag', label: dataset['proyectos_estrategicos.embajadas'], internalRedirect: true, url: '/loginEmpresas' },
          { icon: 'flight', label: dataset['proyectos_estrategicos.promocion'], internalRedirect: true, url: '/loginEmpresas' },
        ];
      });
    }

  ngOnInit() {
    this.layout.pageName = this.pageName;
    this.getDatosPefce();
    this.getContenido();
    setTimeout(()=>{this.app_master.cargando = false;}, 2000);
  }

  async getDatosPefce() {
    await this.pCService.getDatosPefce().subscribe((resp) => {
      let
        eventos = (resp.eventos).filter((x) => new Date(x.fechaInicio).getFullYear() == new Date().getFullYear() && new Date(x.fechaInicio) >= new Date() && (x.subarea === 'proyectosEstrategicos')),
        capacitaciones = (resp.capacitaciones).filter((x) => new Date(x.fechaInicio).getFullYear() == new Date().getFullYear() && new Date(x.fechaInicio) >= new Date() && (x.subarea === 'proyectosEstrategicos')) ;

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

  async getContenido(){
    await this.pCService.getPageContent('proyectosEstrategicos').subscribe((resp)=>{
      this.data = resp;
      this.labels = resp.contenido.lang;
      this.multimedia = resp.contenido.multimedia;
      this.videos = resp.contenido.videos;
      this.getMultimedia();
      this.getVideos();
    });
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

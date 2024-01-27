import { environment } from '@env/environment';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ContenidoComponent } from 'src/app/layouts/contenido/contenido.component';
import { PaginaContenidoService } from '../../services/pagina-contenido.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comercio-exterior',
  templateUrl: './comercio-exterior.component.html',
  styleUrls: ['./comercio-exterior.component.css']
})
export class ComercioExteriorComponent implements OnInit {
  filesEndpoint: String = environment.apiUrl + '/files/getUrl?pathfile=';
  links: any = [];
  contactos: any = [
    { "position": "Dirección de Comercio Exterior", "name": "Mtro. Luis Manuel Cuevas Padilla ", "email":"lcuevas.sedecop@gmail.com ", "phone":"2288418500 ext. 1500 y 3201" },
    { "position": "Jefatura del Departamento de Promoción de Exportaciones e Internacionalización", "name": "Mtro. Roberto Sánchez Ceballos", "email":"rsanchez@veracruz.gob.mx", "phone":" 2288418500 ext. 3204" },
    { "position": "Jefatura del Departamento de Relaciones Institucionales y Eventos Internacionales", "name": "Lic. Álvaro García Hernández", "email":"agarciah@@veracruz.gob.mx", "phone":"2288418500 ext. 2260" }
  ];

  capacitaciones: any = [];
  eventos: any = [];

  url: any = (window.location.pathname).split("/");
  pageName: string = this.url[this.url.length -1] === 'comercioExterior' ? 'comercioExterior' : this.url[this.url.length -1];

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
      this.translate.stream(["comercio_exterior.asesoria","comercio_exterior.capacitacion","comercio_exterior.internacional","comercio_exterior.vinculacion"]).subscribe(dataset => {
        this.links = [
          { icon: 'explore', label: dataset['comercio_exterior.asesoria'], internalRedirect: true, url: '/auth/login' },
          { icon: 'school', label: dataset['comercio_exterior.capacitacion'], internalRedirect: true, url: '/auth/login' },
          { icon: 'travel_explore', label: dataset['comercio_exterior.internacional'], internalRedirect: true, url: '/auth/login' },
          { icon: 'handshake', label: dataset['comercio_exterior.vinculacion'], internalRedirect: true, url: '/auth/login' },
        ];
      });
    }

  ngOnInit() {
    this.layout.pageName = this.pageName;
    this.getDatosPefce();
    this.getContenido();
    setTimeout(()=>{this.app_master.cargando = false;}, 2000);
  }

  async getContenido(){
    await this.pCService.getPageContent('comercioExterior').subscribe((resp)=>{
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
        eventos = (resp.eventos).filter((x) => new Date(x.fechaInicio).getFullYear() == new Date().getFullYear() && new Date(x.fechaInicio) >= new Date() && (x.subarea === 'comercioExterior')),
        capacitaciones = (resp.capacitaciones).filter((x) => new Date(x.fechaInicio).getFullYear() == new Date().getFullYear() && new Date(x.fechaInicio) >= new Date() && (x.subarea === 'comercioExterior')) ;

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

  async getMultimedia(){
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val].pathfile = this.filesEndpoint+this.multimedia[val].pathfile;
    });
  }
  async getVideos(){
    Object.keys(this.videos).forEach((val) => {
      this.videos[val].pathfile = environment.apiUrl+'/files/getUrl?pathfile='+this.videos[val].pathfile
    });
  }

}

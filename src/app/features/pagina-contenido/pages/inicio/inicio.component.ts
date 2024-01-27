import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';


import { ContenidoComponent } from 'src/app/layouts/contenido/contenido.component';
import { AppComponent } from 'src/app/app.component';
import { PaginaContenidoService } from '../../services/pagina-contenido.service';
import { environment } from '@env/environment';


type NewType = PaginaContenidoService;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, AfterViewInit {
  filesEndpoint: String = environment.apiUrl + '/files/getUrl?pathfile=';

  url: any = (window.location.pathname).split("/");
  pageName: string = this.url[this.url.length -1] === '' ? 'inicio' : this.url[this.url.length -1];

  inicio: any = null;
  labels: any = null;
  multimedia: any = null;
  videos: any = null;
  languages: any = null;

  capacitaciones: any = [];
  eventos: any = [];

  // WelcomeVideo
  welcomePlay = true;
  welcomeVolume = true;

  capsulas: any = [];

  constructor(
    public dialog: MatDialog,
    public layout: ContenidoComponent,
    public sanitizer: DomSanitizer,
    private app_master: AppComponent,
    private pCService: PaginaContenidoService
    ) {
      this.app_master.cargando = true;
      this.app_master.cargandoTexto = 'Cargando';
    }

    ngOnInit() {
      this.layout.pageName = this.pageName;
      setTimeout(()=>{this.app_master.cargando = false;}, 2000);
      this.getDatosPefce();
      this.getContent();
      //this.getEventos();
  }

  ngAfterViewInit(){
  }

  async getDatosPefce() {
    await this.pCService.getDatosPefce().subscribe((resp) => {
      let
        eventos = resp.eventos,
        capacitaciones = resp.capacitaciones;

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
        cover: (event.archivo.length > 0  ? this.filesEndpoint+event.archivo[0].url : './assets/img/eventos-ferias/background_e.jpeg'),
        subarea: event.subarea
      });
    });
    return eventsCarousel;
  }

  playPauseWelcome(){
    this.welcomePlay = !this.welcomePlay;
    let welcomeVideo:any = document.querySelector('#video');
    (this.welcomePlay) ? welcomeVideo.play() : welcomeVideo.pause();
  }

  muteUnmuteWelcome(){
    this.welcomeVolume = !this.welcomeVolume;
    let welcomeVideo:any = document.querySelector('#video');
  }


  async getContent(){
    await this.pCService.getPageContent('inicio').subscribe((resp)=>{
      this.inicio = resp.contenido.data;
      this.labels = resp.contenido.lang;
      this.multimedia = resp.contenido.multimedia;
      this.videos = resp.contenido.videos;
      this.getMultimedia();
      this.getVideos();
    },error =>{

    });
  }

  async getMultimedia(){
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val].pathfile = environment.apiUrl+'/files/getUrl?pathfile='+this.multimedia[val].pathfile
    });
  }

  async getVideos(){
    Object.keys(this.videos).forEach((val) => {
      this.videos[val].pathfile = environment.apiUrl+'/files/getUrl?pathfile='+this.videos[val].pathfile
    });
  }

  // async getEventos(){
  //   this.pCService.getEventos().subscribe((resp)=>{
  //     if(resp.length > 0){
  //       let eventos = resp.filter(d => new Date(d.fechaInicio) >= new Date() && new Date(d.fechaFin) > new Date());
  //       this.eventos = eventos;
  //     }
  //   },(error)=>{

  //   });
  // }
}

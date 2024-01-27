import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {z
  isLogin = false;
  lang:string = localStorage.getItem('lang') === null ? 'es' : localStorage.getItem('lang');
  url:any = (window.location.pathname).split("/");
  pageName:string = this.url[this.url.length -1];
  arrContents:any = ['inicio','atraccionInversiones','comercioExterior','proyectosEstrategicos'];
  actYear:number = new Date().getFullYear();

  ngOnInit() {

  }

  changeLang(lang:string){
    this.lang = lang;
  }

  get isLoginUrl() {
    let url = (window.location.pathname).split("/"), arrContents = ['loginEmpresas', 'loginPersonal' ,'recuperarAcceso', 'registrarEmpresa'];
    if (arrContents.indexOf(url[url.length - 1]) > -1) {
      return true;
    } else {
      return false;
    }
  }
}

import { Component, OnDestroy } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { ScriptsGlobalService } from '../../common/scripts-global.service';
import { AppComponent } from '../../app.component';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {
  opened = true;
  over = 'side';
  expandHeight = '42px';
  collapseHeight = '42px';
  displayMode = 'flat';
  // overlap = false;
  dataUsuario: any;
  selectedLanguage = 'es';
  watcher: Subscription;
  rolesModulos: any;
  finishToken = null;
  constructor(
    media: ObservableMedia,
    private router: Router,
    private scriptGL: ScriptsGlobalService,
    public appC: AppComponent
  ) {
    this.watcher = media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.opened = false;
        this.over = 'over';
      } else {
        this.opened = true;
        this.over = 'side';
      }
    });
  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.dataUsuario = this.scriptGL.getUserSessionData();
    let data: Array<any> = new Array<any>();
    for (let rol of this.dataUsuario.roles) {
      //rol.subModulos = rol.subModulos ? JSON.parse(rol.subModulos) : null;
      //rol.subModulos = rol.subModulos ? JSON.parse(rol.subModulos) : null;
      data.push(rol);
    }
    this.rolesModulos = data;
    this.rolesModulos.sort((a, b) => (a.nombreEtiqueta > b.nombreEtiqueta) ? 1 : -1);
    let quitarModulos = ['/contactos','/ferias','/seguimiento','/solicitudes-page','/solicitudesAGC','/solicitudGva','/logsChat','/rolesUsuario'];//mediante urlModulo se quita u oculta modulos
    this.rolesModulos = this.rolesModulos.filter((item) => !quitarModulos.includes(item.urlModulo))
    const token = localStorage.getItem('token');
    const tokenSub = token.substring(7, token.length);
    const tokenDecode: any = jwt_decode(tokenSub);
    const dateExp = new Date(1000 * tokenDecode.exp);
    //this.finishToken = dateExp.toLocaleDateString('es-MX', {weekday: "long", year: "numeric", month: "long", day: "numeric"}).concat(', ' + dateExp.toLocaleTimeString() + ' HRS.').toUpperCase();
    //this.finishToken = dateExp.toLocaleTimeString() + ' HRS.';
    this.finishToken = dateExp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' HRS.';
  }

  async exit() {
    const userData = this.scriptGL.getUserSessionData();
    this.appC.cargandoTexto = 'Cerrando sesión, espere';
    this.appC.cargando = true;
    localStorage.clear();
    this.router.navigate(["inicio"]);
    await this.scriptGL.closeSesionLog(userData).subscribe(async data => {
      const dataR = data;
      this.appC.cargando = false;
      // location.href="inicio";
    }, error => {
      this.appC.cargando = false;
      this.scriptGL.printErrorSnackBar(error);
    });
    await location.reload();
  }

  goToUrl(url) {
    if (this.scriptGL.getOnResize() == 1) {
      this.opened = false;
    }
    this.router.navigateByUrl(url);
    // window.location.href=url;
  }

  getEtiqueta(data: any) {
    return data.nombreEtiqueta;
  }

  toogleLanguage(lang: string) {
    localStorage.setItem('lang', lang);
  }
}

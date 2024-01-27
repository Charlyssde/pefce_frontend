import { AfterContentChecked, ChangeDetectorRef, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  cargando = false;
  title = 'feria-virtual';
  cargandoTexto = '';
  isLoading = false;

  constructor(
    private cdRef: ChangeDetectorRef) { }

  get isAuthenticate() {
    
    if (!localStorage.getItem('session')) {
      return false;
    } else {
      //localStorage.removeItem('toLogin');
      return true;
    }
  }

  /* get isContent() {
    let url = (window.location.pathname).split("/"), arrContents = ['', 'inicio', 'atraccionInversiones', 'comercioExterior', 'proyectosEstrategicos'];
    if ((arrContents.indexOf(url[url.length - 1]) > -1) && (!localStorage.getItem('toLogin')) && (!localStorage.getItem('session'))) {
      return true;
    } else {
      return false;
    }
  } */

/*   get isLogin() {
    if (!localStorage.getItem('toLogin')) {
      return false;
    } else {
      return true;
    }
  } */

  get isValidateQR() {
    let url = (window.location.pathname).split("/"), arrContents = ['validarQR'];
    if (arrContents.indexOf(url[url.length - 2]) > -1) {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if (!localStorage.getItem('session')) {
      //localStorage.clear();
    }
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }

  cancelarCargando() {
    this.cargando = false;
  }

}

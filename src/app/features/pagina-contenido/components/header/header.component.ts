import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { ContenidoComponent } from 'src/app/layouts/contenido/contenido.component';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { PaginaContenidoService } from '../../services/pagina-contenido.service';
import { Router } from "@angular/router"
import { environment } from '@env/environment';

@Component({
  selector: 'app-content-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filesEndpoint = environment.apiUrl+'/files/getUrl?pathfile=';
  lang: string = "es";
  languages:any = null;

  url: any = (window.location.pathname).split("/");
  pageName: string = this.url[this.url.length - 1] === '' ? 'inicio' : this.url[this.url.length - 1];

  header: any = null;

  multimedia:any = null;

  showMenu = false;
  @ViewChild('menuButton') menuButton: ElementRef;
  @ViewChild('menuContainer') menuContainer: ElementRef;

  constructor(
    public layout: ContenidoComponent,
    private cService: CatalogoService,
    private pCService: PaginaContenidoService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    console.log("Aqui");
    this.getLanguages();
    this.lang = localStorage.getItem('lang') == null ? 'es' : localStorage.getItem('lang');
  }

  async getContent(){
    await this.pCService.getPageContent('header').subscribe((resp)=>{
      console.log(resp.contenido);
      if(resp){
        
        this.header = resp.contenido;
        this.multimedia = resp.contenido.multimedia;
        this.multimedia.logotipo.pathfile = this.filesEndpoint+this.multimedia.logotipo.pathfile
      }
    });
  }

  async getLanguages(){
    await this.cService.readIdiomas().subscribe((resp) => {
      if(resp.length > 0){
        this.languages = resp;
        this.getContent();
      }
    },(error)=>{});
  }

  // Interaction
  toggleMenu(page: string) {
    this.pageName = page != 'null' ? page : this.pageName;
    if (window.innerWidth < 993) {
      this.showMenu = !this.showMenu;
      document.getElementById('menuContainer').style.display = this.showMenu ? 'block' : 'none';
    }
    else {
      document.getElementById('menuContainer').style.display = 'block';
    }
  }

  openTab(url: string) {
    if (url !== "inicio") window.open(url, "_BLANK");
    else this.router.navigate(['/' + url]);
  }

  changeLang(val: string) { this.layout.changeLang(val); }
}

import { environment } from '@env/environment';
import { PaginaContenidoService } from './../../services/pagina-contenido.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal-video-player',
  templateUrl: './portal-video-player.component.html',
  styleUrls: ['./portal-video-player.component.css']
})
export class PortalVideoPlayerComponent implements OnInit {
  @Input() title: String = null;
  @Input() pagename: String = null;

  // Capsula Section
  capsulas: any = [];
  srcCapsula: string = null;
  titleCapsula:string = null;
  playVid:number = null;

  constructor(
    private pCService: PaginaContenidoService,
  ) { }

  ngOnInit() {
    this.getContent();
  }

  async getContent(){
    await this.pCService.getPageContent('footer').subscribe((data)=>{
      this.capsulas = data.contenido.capsulas;
      this.capsulas.forEach((val, i) => {
        this.capsulas[i].pathfile = environment.apiUrl+'/files/getUrl?pathfile='+this.capsulas[i].pathfile;
      });
    });
  }


  watchVideo(src:string,title:string,order:number,el:any){
    this.srcCapsula = src;
    this.titleCapsula = title;
    this.playVid = order;

    let videoEl:any = document.querySelector("#videoPlayer");
    videoEl.pause();


    let allVidElem:any = document.querySelectorAll(".titleCapsule");

    for(let i=0;i<allVidElem.length;i++){
      if(allVidElem[i].classList.contains("playing")){allVidElem[i].classList.remove("playing");}
    }

    let selVidEl:any = document.querySelector("#titleCapsule_"+order);
    selVidEl.classList.add("playing");

    if (videoEl.paused){
      setTimeout(()=>{videoEl.play();},200);
    }
    else{
      setTimeout(()=>{videoEl.pause();},200);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Alerts } from 'src/app/core/utils/alerts';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';

@Component({
  selector: 'shared-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})  
export class TranslationComponent implements OnInit {

  public activeLang = 'es';
  public langs = [];

  constructor(
    private translate: TranslateService,
    private catalogosService: CatalogoService,
    private alerts: Alerts
  ) { 
    this.pages();
  }

  ngOnInit(){
    
  }

  pages(){
    this.catalogosService.readIdiomas().subscribe((response) => {
      if(response){
        this.langs = response;
        let 
          spanish = response.filter((item) => item.tag === 'es' )[0],
          spanishObject = JSON.parse(spanish.translationObject);
        this.translate.setTranslation(spanish.tag,spanishObject,true);
        this.translate.use('es');
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  public toggleLanguage(lang) {
    let langObject = JSON.parse(lang.translationObject);
    this.translate.setTranslation(lang.tag,langObject,true);
    this.translate.use(lang.tag);
  }
}

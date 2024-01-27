import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { CatalogoService } from '../../services/catalogo.service';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { CatalogosFormComponent } from '../../components/catalogos-form/catalogos-form.component';

@Component({
  selector: 'app-catalogo-idiomas-etiquetas',
  templateUrl: './catalogo-idiomas-etiquetas.component.html',
  styleUrls: ['./catalogo-idiomas-etiquetas.component.css']
})
export class CatalogoIdiomasEtiquetasComponent implements OnInit {

  hasChildren: any = { 'status' : false, 'url' : null };
  pageRequestParams: PageRequestParams = new PageRequestParams();
  pageDataset: PageModel;
  tableSettings: any = {
    "headers": [
      { "label" : "Etiquetas de idioma", "key" : "Idioma" }
    ],
    "actions": true,
    "type": "Etiquetas"
  };
  helpsSettings: any = {
    'module_name': 'Catálogo de etiquetas del idioma',
    'description': 'Módulo encargado de gestionar las etiquetas del idioma',
    'details': [
      { 'detail': 'Buscar (<span class="material-symbols-outlined">search</span>)' , 'description' : 'Filtro dinámico ' },
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)' , 'description' : 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)' , 'description' : 'Mostrar formulario para editar un registro existente' }
    ]
  };
  tipoCatalogo = 'Etiquetas';
  padreId: string;

  language;
  templateLabels = [];
  languageLabels = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private catalogosService: CatalogoService,
    private alerts: Alerts,
  ) { }

  ngOnInit() {
    this.padreId = this.route.snapshot.paramMap.get('padreId');
    this.readIdiomasTemplate();
    this.findById();
  }

  readIdiomasTemplate(){
    this.catalogosService.readIdiomasTemplate().subscribe((response) => {
      this.templateLabels = response;
    });
  }

  findById(){
    this.catalogosService.findIdiomaById(this.padreId).subscribe((response) => {
      if(response){
        this.language = response;
        this.languageLabels = JSON.parse(response.translationObject);
      }
    });
  }

  async setQueryParamsRequest(pageRequestParams : PageRequestParams){
    this.pageRequestParams = pageRequestParams;
    await this.findById();
  }

  updateLanguage(){
    this.language.translationObject = JSON.stringify(this.languageLabels);
    this.catalogosService.updateIdioma(this.language).subscribe((response) => {
      if(response){
        this.language = response;
        this.languageLabels = JSON.parse(response.translationObject);
        this.alerts.printSnackbar(15,null,null,"Etiqueta guardada",5,false,null,null);
      }
    }, (error) => {  this.alerts.printErrorSnackBar(error); });
  }
}

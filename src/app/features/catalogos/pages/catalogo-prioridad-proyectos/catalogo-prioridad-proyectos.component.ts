import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { CatalogosFormComponent } from '../../components/catalogos-form/catalogos-form.component';

@Component({
  selector: 'app-catalogo-prioridad-proyectos',
  templateUrl: './catalogo-prioridad-proyectos.component.html',
  styleUrls: ['./catalogo-prioridad-proyectos.component.css']
})
export class CatalogoPrioridadProyectosComponent implements OnInit {

  hasChildren: any = { 'status' : false, 'url' : null };
  pageRequestParams: PageRequestParams = new PageRequestParams();
  pageDataset: PageModel;
  tableSettings: any = {
    "headers": [
      { "label" : "Prioridad de proyecto", "key" : "nombre" }
    ],
    "actions": true,
    "type": "PRIORIDADES DE PROYECTO"
  };
  helpsSettings: any = {
    'module_name': 'Catálogo de prioridades de proyecto',
    'description': 'Módulo encargado de gestionar los datos base relacionados a las prioridades de proyecto',
    'details': [
      { 'detail': 'Buscar (<span class="material-symbols-outlined">search</span>)' , 'description' : 'Filtro dinámico ' },
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)' , 'description' : 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)' , 'description' : 'Mostrar formulario para editar un registro existente' }
    ]
  };
  tipoCatalogo = 'PRIORIDAD_PROYECTO';

  constructor(
    private dialog: MatDialog,
    private catalogosService: CatalogoService,
    private alerts: Alerts
  ) { }

  ngOnInit(){
    this.pages();
  }

  async pages(){
    await this.catalogosService.getPagesByTipoCatalogo(this.tipoCatalogo, this.pageRequestParams).subscribe((response) => {
      if(response){
        this.pageDataset = response;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  async setQueryParamsRequest(pageRequestParams : PageRequestParams){
    this.pageRequestParams = pageRequestParams;
    await this.pages();
  }
  newRegistration(catalogo: CatalogoModel){
    this.saveRegistration(catalogo,"Nuevo");
  }
  editRegistration(catalogo: CatalogoModel){
    this.saveRegistration(catalogo,"Editar");
  }
  deleteRegistration(catalogo: CatalogoModel){
    
  }
  saveRegistration(catalogo,action){
    let dialogRef = this.dialog.open(CatalogosFormComponent, {
      width: '80%',
      data: { 'action':action, 'tableSettings': this.tableSettings, 'dataset': catalogo},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result.event === 'submit'){
        this.catalogosService.postCatalogo(result.catalogo).subscribe((response) => {
          if(response){
            this.alerts.printSnackbar(15,null,null,((action=='Editar' ? 'Edición exitosa' : 'Registro exitoso')),5,false,null,null);
            this.pages();
          }
        }, (error) => {
          this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
        });
      }
    });
  }
}

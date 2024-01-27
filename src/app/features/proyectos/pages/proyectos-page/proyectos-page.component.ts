import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatDialog, MatBottomSheet, PageEvent } from '@angular/material';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { EstatusProyectoEnum } from 'src/app/core/enums/estatus-proyecto.enum';
import { PrioridadProyectoEnum } from 'src/app/core/enums/prioridad-proyecto.enum';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { Alerts } from 'src/app/core/utils/alerts';
import { MainRequestFilter } from 'src/app/core/utils/requests/filters/main-request-filter.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { ProyectosService } from '../../services/proyectos.service';
import { ActivatedRoute } from '@angular/router';
import { ReportesModalComponent } from 'src/app/shared/components/modals/reportes-modal/reportes-modal.component';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';

@Component({
  selector: 'app-proyectos-page',
  templateUrl: './proyectos-page.component.html',
  styleUrls: ['./proyectos-page.component.css']
})
export class ProyectosPageComponent implements OnInit {

  mainRequestFilter: MainRequestFilter = new MainRequestFilter();
  pageDataset: PageModel;
  helpsSettings: any = {
    'module_name': 'Listado de perfiles de usuario',
    'description': 'Módulo encargado de gestionar perfiles de usuario de la plataforma',
    'details': [
      { 'detail': 'Buscar (<span class="material-symbols-outlined">account_tree</span>)', 'description': 'Mostrar organigrama general de perfiles' },
      { 'detail': 'Buscar (<span class="material-symbols-outlined">search</span>)', 'description': 'Filtro dinámico' },
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)', 'description': 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Menú de acciones (<span class="material-symbols-outlined">menu</span>)', 'description': 'Mostrar las acciones disponibles para cada registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)', 'description': 'Mostrar formulario para editar un registro existente' },
      { 'detail': 'Inactivar/Activar registro (<span class="material-symbols-outlined">change_circle</span>)', 'description': 'Cambia el estatus del registro de activo a inactivo y viceversa' },
      { 'detail': 'Eliminar registro (<span class="material-symbols-outlined">delete</span>)', 'description': 'Mostrar ventana de confirmación de eliminación de un registro existente' }
    ]
  };

  areaEnum: any = AreasEnum;
  prioridadEnum: any = PrioridadProyectoEnum;
  estatusEnum: any = EstatusProyectoEnum;
  dataset: ProyectosModel[];

  filtro: string = null;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  titulo: any;
  empresaid: any;
  isEnterprise: boolean = false;

  constructor(
    private proyectosService: ProyectosService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private alerts: Alerts,
    private route: ActivatedRoute,
    private coreAuthService: CoreAuthService,
    private encuestasService: AdministracionEncuestasService
  ) { }

  ngOnInit() {
    this.route.data 
      .subscribe(data => {        
        this.titulo = data.titulo;        
        this.empresaid = data.empresaid;
      });    
      if (this.coreAuthService.getUserSessionData().perfil.tipo == "empresa" ){
        this.isEnterprise = true;
      }
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  pageEvent: PageEvent;

  setRequestFilter(mainRequestFilter: MainRequestFilter){
    this.mainRequestFilter = mainRequestFilter;
    this.mainRequestFilter.size = this.pageSize;
    this.setQueryParamsRequest(this.mainRequestFilter);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.mainRequestFilter.page = this.pageIndex;
    this.mainRequestFilter.size = this.pageSize;

    this.setQueryParamsRequest(this.mainRequestFilter);
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  async pages() {
    await this.proyectosService.getPages(this.mainRequestFilter, this.empresaid).subscribe((response) => {
      if (response) {
        this.pageDataset = response;
        this.length = this.pageDataset.totalItems
        this.pageIndex = this.pageDataset.currentPage;

        this.dataset = this.pageDataset.dataset;

      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }

  async setQueryParamsRequest(mainRequestFilter: MainRequestFilter) {
    this.mainRequestFilter = mainRequestFilter;
    this.mainRequestFilter.fechaInicio = this.mainRequestFilter.fechaInicio === null ? null : new Date(this.mainRequestFilter.fechaInicio).toISOString();
    this.mainRequestFilter.fechaFin = this.mainRequestFilter.fechaFin === null ? null : new Date(this.mainRequestFilter.fechaFin).toISOString();
    await this.pages();
  }


  getInstitutionResponsible(colaborators: any): string{
    if(colaborators.length>0){
      let colaborator = colaborators.filter(colaborator => colaborator.rol === 'responsable');
      return colaborator.length > 0 ? (colaborator[0].usuarioId ? colaborator[0].usuarioId.nombre : '-' ) : '-';
    }
    return '-';
  }
  getEnterpriseResponsible(colaborators: any): string{
    if(colaborators.length>0){
      let colaborator = colaborators.filter(colaborator => colaborator.rol === 'interesado');
      return colaborator.length > 0 ? (colaborator[0].usuarioId ? colaborator[0].usuarioId.nombre : '-' ) : '-';
    }
    return '-';
  }

  showEditAction(): boolean{
    let show = true;
    return show;
  }

  async crearReporte(){
    await this.proyectosService.reportesolicitudes().subscribe((response) => {
      if (response) {
        let datos: Array<any> = [],
            colores: string[] = ["#498B94", "#F8C622", "#747474", "#EC972D" ];
              
        datos.push( new Array() );
  
        response["sexo"].forEach( (element, index) => {
          datos[0].push( element[1] )        
        });
  
        datos.push( new Array() );
        datos[1].push( new Array() );
        datos[1].push( new Array() );
  
        response["municipio"].forEach( (element, index) => {
          datos[1][0].push( element[0])        
          datos[1][1].push( element[1])        
        });
        
        datos.push( new Array() );
        datos[2].push( new Array() );
        datos[2].push( new Array() );
  
        response["sector"].forEach( (element, index) => {
          datos[2][0].push( element[0] )        
          datos[2][1].push( element[1] )        
        });
  
        const dialogRef = this.dialog.open(ReportesModalComponent, {
          width: '80%',
          data: {
            datos: datos,
            titulo: "Reporte de solicitudes recibidas"
          }
          }); 
          
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  
  }
   

  descargarEncuesta(/*pdfURI: string*/) {
    this.encuestasService.getEncuesta(21).subscribe((response) => {
      this.dialog.open(PdfPreviewComponent, {
        width: '70vw',
        data: {
          titulo: "Encuesta de satisfacción",
          pdf: response.archivo[0].url
        }
      });
    });
  }  
     
  
}

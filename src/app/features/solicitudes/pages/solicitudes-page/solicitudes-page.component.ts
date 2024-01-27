import { SolicitudesModel } from './../../../../core/models/solicitudes/solicitudes-model';
import { TiposSolicitud } from 'src/app/core/constants/tipos-solicitud';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, PageEvent, MatBottomSheet  } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ModalSolicitudesHistoricoComponent } from '../../components/modal-solicitudes-historico/modal-solicitudes-historico.component';
//import { UsuariosService } from 'src/app/features/usuarios/services/usuarios.service';
import { ModalSolicitudesFinalizarComponent } from '../../components/modal-solicitudes-finalizar/modal-solicitudes-finalizar.component';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { Alerts } from 'src/app/core/utils/alerts';
import { ReportesModalComponent } from 'src/app/shared/components/modals/reportes-modal/reportes-modal.component';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';


@Component({
  selector: 'app-solicitudes-page',
  templateUrl: './solicitudes-page.component.html',
  styleUrls: ['./solicitudes-page.component.css']
})
export class SolicitudesPageComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Listado de tareas',
    'description': 'Módulo encargado de gestionar las tareas de la plataforma',
    'details': [
      { 'detail': 'Buscar (<span class="material-symbols-outlined">search</span>)', 'description': 'Filtro dinámico ' },
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)', 'description': 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Menú de acciones (<span class="material-symbols-outlined">menu</span>)', 'description': 'Mostrar las acciones disponibles para cada registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)', 'description': 'Mostrar formulario para editar un registro existente' },
      { 'detail': 'Eliminar registro (<span class="material-symbols-outlined">delete</span>)', 'description': 'Mostrar ventana de confirmación de eliminación de un registro existente' },
      { 'detail': 'Pendiente/Termada registro (<span class="material-symbols-outlined">change_circle</span>)', 'description': 'Cambia el estatus del registro de activo a terminado y viceversa' },
    ]
  };

  displayedColumns: string[] = ['folio', 'tipoSolicitudId','descripcion','usuarioEncargadoId','usuarioSolicitanteId','estatus','createdAt','acciones'];
  // displayerColumnsFilter = [
  //   {etiqueta: 'Todo', valor: 'all', tipo: 'string'},
  //   {etiqueta: 'Folio', valor: 'folio', tipo: 'string'}
  // ];
  // titleColumns: string[] = ['Folio','Tipo de solicitud','Solicitante','Responsable','Estatus','Acciones'];
  dataSource = null;
  isCharge = false;
  dataSourceByService = [];
  usuarioSesion = null

  pageRequestParams: any = {};
  pageDataset: PageModel;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];
  dataset: any;

  descripcion: string = null;
  disabled = false;

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;

  perfilUsuario: string = null;

  tiposSolicitud: [] = new TiposSolicitud().dataSet

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private solicitudesService: SolicitudesService,
    public lib: ScriptsGlobalService,
    
    //public usuariosService: UsuariosService,
    private alerts: Alerts,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private encuestasService: AdministracionEncuestasService
  ) { }

  ngOnInit() {        
    this.perfilUsuario = this.lib.getUserSessionData().perfil.nombre;
    this.pages();
    //this.getUsuarioSesion(this.lib.getUserSessionData().idUsuario);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filtrado(resultados) {
    this.setMatDataSource(resultados);
  }

  setMatDataSource(data: any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  pageEvent: PageEvent;



  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //this.pageRequestParams.tarea = this.descripcion;

    this.pageRequestParams.page = this.pageIndex;
    this.pageRequestParams.size = this.pageSize;

    this.setQueryParamsRequest(this.pageRequestParams);
  }

  async setQueryParamsRequest(pageRequestParams: PageRequestParams) {
    this.pageRequestParams = pageRequestParams;
    await this.pages();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }  

  async pages() {
    await this.solicitudesService.getPages(this.pageRequestParams, this.perfilUsuario).subscribe((response) => {
      if (response) {
        this.pageDataset = response;
        this.length = this.pageDataset.totalItems
        this.pageIndex = this.pageDataset.currentPage;
        this.pageDataset.dataset.forEach(element => {
          let 
            fechaActual = new Date(),
            fechaInicio = new Date(element.fechaInicio),
            fechaTermino = new Date(element.fechaTermino),                                
            diasTranscurridos = Math.floor( (Date.UTC(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() ) ) / (1000 * 60 * 60 * 24) ),
            diasTotal =         Math.floor( (Date.UTC(fechaTermino.getFullYear(), fechaTermino.getMonth(), fechaTermino.getDate()) - Date.UTC(fechaInicio.getFullYear(), fechaInicio.getMonth(), fechaInicio.getDate() ) ) / (1000 * 60 * 60 * 24) ),
            dias = ((diasTotal - diasTranscurridos) / diasTotal);
          element.semaforo =  dias >= 0.66 ? "green-color" : dias >= 0.33 ? "yellow-color" : "red-color";
        });
        this.dataset = this.pageDataset.dataset;        
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });

  }

  async pageAll(){
    await this.solicitudesService.pageAll().subscribe((solicitudes) => {      
      if (solicitudes.length > 0) {
        this.dataSource = new MatTableDataSource(solicitudes);
        // this.dataSourceByService = solicitudes;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.lib.printSnackbar(2, 1, 'solicitudes', null, 5, false, null, null);
      }
    }, (error) => {
      
    });
  }

  openSolicitudesHistoricoModal(solicitud: SolicitudesModel){
    const dialogRef = this.dialog.open(ModalSolicitudesHistoricoComponent, {
      width: '80%',
      data: {
        solicitud: solicitud,
        usuarioSesion: this.usuarioSesion,
      },
      }).afterClosed().subscribe(resp=>{this.pageAll();});
  }

  openSolicitudesFinalizar(solicitud: SolicitudesModel, cancelar: boolean){
    const dialogRef = this.dialog.open(ModalSolicitudesFinalizarComponent,{
      width: '80%',
      data: {
        solicitud: solicitud,
        usuarioSesion: this.usuarioSesion,
        cancelar: cancelar
      },
    }).afterClosed().subscribe(resp=>{this.pageAll();});
  }

  handleFilter() {
    this.pageRequestParams.descripcion = this.descripcion;
    this.pageRequestParams.page = 0;
    this.pageRequestParams.size = this.pageSize;
    this.setQueryParamsRequest(this.pageRequestParams);
  }

async crearReporte(){
  await this.solicitudesService.reportesolicitudes().subscribe((response) => {
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

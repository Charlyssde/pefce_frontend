import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { ReportesModalComponent } from 'src/app/shared/components/modals/reportes-modal/reportes-modal.component';
import { EnterpriseAccessRequestHistoryComponent } from '../../components/enterprise-access-request-history/enterprise-access-request-history.component';
import { EnterpriseAccessRequestComponent } from '../../components/enterprise-access-request/enterprise-access-request.component';
import { EnterpriseDetailsComponent } from '../../components/enterprise-details/enterprise-details.component';
import { EnterprisesService } from '../../services/enterprises.service';
import { AutodiagnosticoComponent } from 'src/app/shared/components/modals/autodiagnostico/autodiagnostico.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-enterprises-page',
  templateUrl: './enterprises-page.component.html',
  styleUrls: ['./enterprises-page.component.css']
})
export class EnterprisesPageComponent implements OnInit {
  
  pageRequestParams: any = {};
  pageDataset: PageModel;
  helpsSettings: any = {
    'module_name': 'Listado de empresas',
    'description': 'Módulo encargado de gestionar el directorio empresarial de la plataforma',
    'details': [
      { 'detail': 'Buscar (<span class="material-symbols-outlined">search</span>)', 'description': 'Filtro dinámico ' },
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)', 'description': 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Menú de acciones (<span class="material-symbols-outlined">menu</span>)', 'description': 'Mostrar las acciones disponibles para cada registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)', 'description': 'Mostrar formulario para editar un registro existente' },
      { 'detail': 'Eliminar registro (<span class="material-symbols-outlined">delete</span>)', 'description': 'Mostrar ventana de confirmación de eliminación de un registro existente' },
      { 'detail': 'Inactivar/Activar registro (<span class="material-symbols-outlined">change_circle</span>)', 'description': 'Cambia el estatus del registro de activo a inactivo y viceversa' },
      { 'detail': 'Solicitud de acceso (<span class="material-symbols-outlined">change_circle</span>)', 'description': 'Enviar respuesta a solicitud de acceso al contacto principal de la empresa' },
      { 'detail': 'Mostrar detalles (<span class="material-symbols-outlined">more</span>)', 'description': 'Mostrar detalles de la empresa' },
      { 'detail': 'Histórico de solicitudes (<span class="material-symbols-outlined">history</span>)', 'description': 'Mostrar el histórico de solicitudes de acceso' },
      { 'detail': 'Contactos (<span class="material-symbols-outlined">group</span>)', 'description': 'Mostrar los contactos de la empresa' },
    ]
  };

  dataset: any;

  showSpecialFilters: boolean = false;

  nombre: string = null;
  regimenFiscal: string = null;
  regimenFiscalList: any = null;
  categoria: string = null;
  categoriaList:any = null;
  sector: string = null;
  sectorList:any = null;
  subsector: string = null;
  subsectorDataset:any = null;
  subsectorList:any = null;
  estatus: any = null;
  estatusList: any = [{estatus:true,label:'Activo'},{estatus:false,label:'Inactivo'}];
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  isEnterprise: Boolean = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    private enterpriseService: EnterprisesService,
    private alerts: Alerts,
    public dialog: MatDialog,
    public lib: ScriptsGlobalService,
  ) { }

  ngOnInit() {

    this.isEnterprise = this.lib.getUserSessionData().perfil.nombre == "Empresa" ? true : false;

    this.enterpriseFiltersCatalogs();
    this.pages();
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

    this.pageRequestParams.nombre = this.nombre;
    this.pageRequestParams.page = this.pageIndex;
    this.pageRequestParams.size = this.pageSize;

    this.setQueryParamsRequest(this.pageRequestParams);
  }

  handleFilter() {
    this.pageRequestParams.nombre = this.nombre;
    this.pageRequestParams.regimenFiscal = this.regimenFiscal;
    this.pageRequestParams.categoria = this.categoria;
    this.pageRequestParams.sector = this.sector;
    this.pageRequestParams.subsector = this.subsector;
    this.pageRequestParams.estatus = this.estatus;
    this.pageRequestParams.page = 0;
    this.pageRequestParams.size = this.pageSize;
    
    this.subsectorList = [];
    if(this.sector !== null){
      this.subsector = null;
      let subsectores: any = JSON.parse(JSON.stringify(this.subsectorDataset));
      this.subsectorList = subsectores.filter(subsector => subsector.idCatalogoPadre === this.sector);
    }

    this.setQueryParamsRequest(this.pageRequestParams);
  }

  onChangeSpecialFilters(status){
    if(!status){
      this.pageRequestParams.regimenFiscal = null;
      this.pageRequestParams.categoria = null;
      this.pageRequestParams.sector = null;
      this.pageRequestParams.subsector = null;
      this.pageRequestParams.estatus = null;

      this.setQueryParamsRequest(this.pageRequestParams);
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  async enterpriseFiltersCatalogs(){
    await this.enterpriseService.showEnterpriseRegistration().subscribe((response) => {
      if (response) {
        this.regimenFiscalList = response.regimenesFiscales;
        this.categoriaList = response.categorias;
        this.sectorList = response.sectores;
        this.subsectorDataset = response.subsectores;
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }

  async pages() {
    await this.enterpriseService.getPages(this.pageRequestParams).subscribe((response) => {
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

  checkIfRootUser(profiles: any): Boolean{
    return profiles.find(profile => profile.tipo === 'root' && profile.nombre === 'Superadministrador');
  }

  async setQueryParamsRequest(pageRequestParams: PageRequestParams) {
    this.pageRequestParams = pageRequestParams;
    await this.pages();
  }

  onClickDelete(enterprise: any) {
    let data = {};
    data['id'] = enterprise.id;
    data['title'] = "Eliminar empresa " + enterprise.empresa;
    data['content'] = "¿Realmente desea eliminar a la empresa <b>" + enterprise.empresa + "</b> de los registros de la plataforma?";
    data['alerts'] = "Al eliminar a esta empresa, toda su actividad dentro de la plataforma será eliminada y estas acciones son irreversibles.";
    this.dialog.open(DeleteModalComponent, {
      width: '70vw',
      data: data
    }).afterClosed().subscribe((result) => {
      if(result !== undefined && result !== ""){
        this.enterpriseService.deleteEnterprise(result).subscribe((response) => {
          this.alerts.printSnackbar(15, null, null, "Empresa eliminada", 5, false, null, null);
          this.pages();
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    })
  }

  onClickShowDetails(enterprise: any){
    this.dialog.open(EnterpriseDetailsComponent,{
      width:'80vw',
      height: '90vh',
      data: {enterprise:enterprise}
    });
  }

  async switchRegistrationStatus(id: number, status: boolean, index: number) {
    await this.enterpriseService.updateStatusEnterprise(id, status).subscribe((response) => {
      if (response) {
        this.dataset[index] = response;
        this.alerts.printSnackbar(15, null, null, "Estatus actualizado", 5, false, null, null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }
  
  async onClickAccessRequest(enterprise, index:number) {
    this.dialog.open(EnterpriseAccessRequestComponent,{
      width:'70vw',
      data:{ enterprise: enterprise }
    }).afterClosed().subscribe((response)=>{
      if(response !== null && response !== undefined){
        this.enterpriseService.saveAccessRequest(response).subscribe((response) => {
          if(response){
            this.dataset[index] = response;
            this.alerts.printSnackbar(15, null, null, "Se ha enviado la respuesta al contacto principal de esta empresa", 5, false, null, null);
          }
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    });
  }

  async onClickHistoryAccessRequest(enterprise) {
    this.dialog.open(EnterpriseAccessRequestHistoryComponent,{
      width:'80vw',
      data:{ enterprise: enterprise }
    });
  }

  async crearReporte(){
    await this.enterpriseService.reportesolicitudes().subscribe((response) => {
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

  openNewAutodiagnosticoModal(enterpriseId: any){
    const dialogRef = this.dialog.open(AutodiagnosticoComponent, {
      width: '80%',
      data: {enterpriseId: enterpriseId}
      }); 
  }  
}

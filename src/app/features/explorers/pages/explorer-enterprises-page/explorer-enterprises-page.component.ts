import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { environment } from '@env/environment';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { VideoPreviewComponent } from 'src/app/shared/components/modals/video-preview/video-preview.component';
import { ExplorersService } from '../../services/explorers.service';
import { ModalSolicitarMesaComponent } from '../../components/modal-solicitar-mesa/modal-solicitar-mesa.component';
import { SesionModel } from 'src/app/core/models/auth/session-model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';

@Component({
  selector: 'app-explorer-enterprises-page',
  templateUrl: './explorer-enterprises-page.component.html',
  styleUrls: ['./explorer-enterprises-page.component.css']
})
export class ExplorerEnterprisesPageComponent implements OnInit {
  helpsSettings: any = {
    'module_name': 'Explorador de empresas',
    'description': 'Módulo encargado de presentar a las empresas aprobadas para participar en exploradores y ferias virtuales dentro de la plataforma.',
    'details': [
      { 'detail': 'Categoría', 'description': 'Filtrar empresas por categoría ' },
      { 'detail': 'Régimen fiscal', 'description': 'Filtrar empresas por régimen fiscal ' },
      { 'detail': 'Sector', 'description': 'Filtrar empresas por sector ' },
      { 'detail': 'Subsector', 'description': 'Filtrar empresas por subsector ' },
    ]
  };

  pageRequestParams: any = {};
  pageDataset: PageModel;
  dataset: any;

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
  pageSize = 12;
  pageIndex = 0;
  pageSizeOptions = [6,12];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  
  constructor(
    private bottomSheet: MatBottomSheet,
    private explorersService: ExplorersService,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts,
    public dialog: MatDialog,
    private coreAuth: CoreAuthService,
  ) { }

  ngOnInit() {
    this.enterpriseFiltersCatalogs();
    this.pages();

  }

  setURI(pathfile: string) : string{
    return environment.apiUrl+"/files/getUrl?pathfile="+pathfile;
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

      this.setQueryParamsRequest(this.pageRequestParams);
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  async enterpriseFiltersCatalogs(){
    await this.enterprisesService.showEnterpriseRegistration().subscribe((response) => {
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
    await this.explorersService.getPages(this.pageRequestParams,"enterprises").subscribe((response) => {
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

  onClickVideoPreview(videoURI: string) {
    this.dialog.open(VideoPreviewComponent, {
      width: '70vw',
      data: {
        video: videoURI
      }
    });
  }

  openSolicitarMesa(enterpriseId: any, interesado: any){
    let userData = localStorage.getItem('session');
    const dialogRef = this.dialog.open(ModalSolicitarMesaComponent,{
      width: '80%',
      data: {
        enterpriseId: enterpriseId,
        interesado: interesado
      },
    });
  }  


}

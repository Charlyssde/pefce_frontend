import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatDialog, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { error, log } from 'console';
import { DspService } from 'src/app/common/dsp.service';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { EstatusProyectoEnum } from 'src/app/core/enums/estatus-proyecto.enum';
import { PrioridadProyectoEnum } from 'src/app/core/enums/prioridad-proyecto.enum';
import { DspModel } from 'src/app/core/models/dsp/dsp-model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { MainRequestFilter } from 'src/app/core/utils/requests/filters/main-request-filter.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';

@Component({
  selector: 'app-dsp',
  templateUrl: './dsp.component.html',
  styleUrls: ['./dsp.component.css']
})
export class DspComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
  dataset: DspModel[];

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

  dataSource = null;


  constructor(
    private dspService: DspService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private alerts: Alerts,
    private route: ActivatedRoute,
    private coreAuthService: CoreAuthService,
  ) { 


  }

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

   pages() {
    this.dspService.getAll().subscribe((response) => {
      if (response) {
        this.pageDataset = response;
        this.length = response.length
        this.pageIndex = this.pageDataset.currentPage;

        this.dataset = response;        

      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }

  async setQueryParamsRequest(mainRequestFilter: MainRequestFilter) {
    this.mainRequestFilter = mainRequestFilter;
    await this.pages();
  }


  showEditAction(): boolean{
    let show = true;
    return show;
  }

  public formatDate(value :  number) : String { 
    return new Date(value).toLocaleDateString()
  }
  
  public handleClickDelete(element : any){
    this.dspService.delete(element.id).subscribe((response) => {
      console.log(response);
      this.pages()
    }, error => this.pages())
  }
     
}



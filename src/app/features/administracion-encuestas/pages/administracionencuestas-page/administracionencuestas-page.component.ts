import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { AdministracionEncuestasService } from '../../services/administracionencuestas.service';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { PreguntaModalComponent } from 'src/app/shared/components/modals/pregunta-modal/pregunta-modal.component';


@Component({
  selector: 'app-administracionencuestas-page',
  templateUrl: './administracionencuestas-page.component.html',
  styleUrls: ['./administracionencuestas-page.component.css']
})
export class AdministracionEncuestasPageComponent implements OnInit {

  idUsuario: number = null;
  usuario: UsuarioModel = null;

  pageRequestParams: any = {};
  pageDataset: PageModel;
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

  dataset: any;

  showSpecialFilters: boolean = false;

  tarea: string = null;

  entregable: any = null;
  fechaInicio: string = null;
  fechaTermino:any = null;
  estatus: any = null;
  estatusList: any = [{estatus:true,label:'Terminada'},{estatus:false,label:'Pediente'}];
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    private administracionEncuestasService: AdministracionEncuestasService,
    private alerts: Alerts,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //this.pages();
    this.administracionEncuestasService.getAllEncuestas().subscribe((response) => {
      if(response){
        this.dataset = response;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  // Modales Tareas
  /*
  openNewTareaModal(administracionEncuestas?: any){
    const dialogRef = this.dialog.open(AdministracionEncuestasModalComponent, {
      width: '80%',
      data: {administracionEncuestas: administracionEncuestas}
      }).afterClosed().subscribe((result) => {
        this.pages();
      });
  }
  */

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.pageRequestParams.tarea = this.tarea;
    this.pageRequestParams.categoria = this.entregable;
    this.pageRequestParams.sector = this.fechaInicio;
    this.pageRequestParams.subsector = this.fechaTermino;
    this.pageRequestParams.estatus = this.estatus;

    this.pageRequestParams.page = this.pageIndex;
    this.pageRequestParams.size = this.pageSize;

    this.setQueryParamsRequest(this.pageRequestParams);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  async pages() {
    await this.administracionEncuestasService.getPages(this.pageRequestParams).subscribe((response) => {
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




  onClickDelete(administracionEncuestas: any) {
    let data = {};
    data['id'] = administracionEncuestas.id;
    data['title'] = "Eliminar tarea " + administracionEncuestas.tarea;
    data['content'] = "¿Realmente desea eliminar la tarea <b>" + administracionEncuestas.tarea + "</b> de los registros de la plataforma?";
    data['alerts'] = "Al eliminar esta tarea, toda su actividad dentro de la plataforma será eliminada y estas acciones son irreversibles.";
    this.dialog.open(DeleteModalComponent, {
      width: '70vw',
      data: data
    }).afterClosed().subscribe((result) => {
      if(result !== undefined && result !== ""){
        this.administracionEncuestasService.deleteAdministracionEncuestas(result).subscribe((response) => {
          this.alerts.printSnackbar(15, null, null, "Tarea eliminada", 5, false, null, null);
          this.pages();
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    })
  }

  onClickedit(administracionEncuestas: any) {
    const dialogRef = this.dialog.open(PreguntaModalComponent, {
      width: '80%',
      data: {
        //encuestasdata: this.encuesta,
      },
    });
  }

  checkIfRootUser(profiles: any): Boolean{
    return profiles.find(profile => profile.tipo === 'root' && profile.nombre === 'Superadministrador');
  }

  async switchRegistrationStatus(id: number, status: boolean, index: number) {
    await this.administracionEncuestasService.updateStatusAdministracionEncuestas(id, status).subscribe((response) => {
      if (response) {
        this.dataset[index] = response;
        this.alerts.printSnackbar(15, null, null, "Estatus actualizado", 5, false, null, null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }

  handleFilter() {
    this.pageRequestParams.tarea = this.tarea;
    this.pageRequestParams.categoria = this.entregable;
    this.pageRequestParams.sector = this.fechaInicio;
    this.pageRequestParams.subsector = this.fechaTermino;
    this.pageRequestParams.estatus = this.estatus;
    this.pageRequestParams.page = 0;
    this.pageRequestParams.size = this.pageSize;

    this.setQueryParamsRequest(this.pageRequestParams);
  }

  async setQueryParamsRequest(pageRequestParams: PageRequestParams) {
    this.pageRequestParams = pageRequestParams;
    await this.pages();
  }


}

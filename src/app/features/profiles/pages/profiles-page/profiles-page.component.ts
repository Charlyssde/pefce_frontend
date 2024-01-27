import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { DeleteModalInterface } from 'src/app/shared/interfaces/modals/delete-modal.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profiles-page',
  templateUrl: './profiles-page.component.html',
  styleUrls: ['./profiles-page.component.css']
})
export class ProfilesPageComponent implements OnInit {

  pageRequestParams: PageRequestParams = new PageRequestParams();
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

  dataset: ProfileModel[];

  areasList: any = AreasEnum;

  nombre: string = null;
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
    private profileService: ProfileService,
    private alerts: Alerts,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pages();
  }

  findProfileNameById(id: number): String {
    return this.dataset[this.dataset.findIndex(data => data.id == id)].nombre;
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
    this.pageRequestParams.page = 0;
    this.pageRequestParams.size = this.pageSize;

    this.setQueryParamsRequest(this.pageRequestParams);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onClickDelete(profile: ProfileModel) {
    let data = {};
    data['id'] = profile.id;
    data['title'] = "Eliminar perfil " + profile.nombre;
    data['content'] = "¿Realmente desea eliminar al perfil <b>" + profile.nombre + "</b> de los registros de la plataforma?";
    data['alerts'] = "Al eliminar este perfil, sus perfiles descendientes también serán eliminados y estas son irreversibles.";
    this.dialog.open(DeleteModalComponent, {
      width: '70vw',
      data: data
    }).afterClosed().subscribe((result) => {
      if(result !== undefined && result !== ""){
        this.profileService.deleteProfile(result).subscribe((response) => {
          this.alerts.printSnackbar(15, null, null, "Perfil eliminado", 5, false, null, null);
          this.pages();
  
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    })
  }

  async pages() {
    await this.profileService.getPages(this.pageRequestParams).subscribe((response) => {
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

  async switchRegistrationStatus(id: number, status: boolean, index: number) {
    await this.profileService.updateStatusProfile(id, status).subscribe((response) => {
      if (response) {
        this.dataset[index] = response;
        this.alerts.printSnackbar(15, null, null, "Estatus actualizado", 5, false, null, null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }

  async setQueryParamsRequest(pageRequestParams: PageRequestParams) {
    this.pageRequestParams = pageRequestParams;
    await this.pages();
  }

}

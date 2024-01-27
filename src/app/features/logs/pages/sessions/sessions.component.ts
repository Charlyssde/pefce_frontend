import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  pageRequestParams: PageRequestParams = new PageRequestParams();
  pageDataset: PageModel;
  helpsSettings: any = {
    'module_name': 'Logs de sesiones',
    'description': 'Módulo encargado de presentar el listado de las sesiones de los usuarios de la plataforma.',
    'details': [
      // { 'detail': 'Buscar (<span class="material-symbols-outlined">account_tree</span>)', 'description': 'Mostrar organigrama general de perfiles' },
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
    private logsService: LogsService,
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

  async pages() {
    await this.logsService.getSessionsPages(this.pageRequestParams).subscribe((response) => {
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

  async setQueryParamsRequest(pageRequestParams: PageRequestParams) {
    this.pageRequestParams = pageRequestParams;
    await this.pages();
  }

}

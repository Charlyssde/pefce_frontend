import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatBottomSheet, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from '../../bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';

@Component({
  selector: 'shared-page-form-table',
  templateUrl: './page-form-table.component.html',
  styleUrls: ['./page-form-table.component.css']
})
export class PageFormTableComponent implements OnChanges {
  @Input() pageDataset: PageModel;
  @Input() tableSettings: any;
  @Input() helpsSettings: any;
  @Input() create: boolean;
  @Input() update: boolean;
  @Input() deleteIn: boolean;
  @Input() report: boolean;
  @Input() hasChildren: any;
  
  @Output() queryParamsOut = new EventEmitter<PageRequestParams>();
  @Output() newRegistrationOut = new EventEmitter<CatalogoModel>();
  @Output() editRegistrationOut = new EventEmitter<CatalogoModel>();
  @Output() deleteRegistrationOut = new EventEmitter<CatalogoModel>();
  queryParams: PageRequestParams = new PageRequestParams();

  helperDataset: CatalogoModel[];
  dataset: any;

  nombre: string = null;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 15, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  padreId: string;
  backUrl: string;

  constructor(
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) { 
    this.padreId = this.route.snapshot.paramMap.get('padreId');
    if(this.padreId != null){
      this.backUrl = window.location.pathname.split('/'+this.padreId)[0];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pageDataset.currentValue) {
      this.length = this.pageDataset.totalItems
      this.pageIndex = this.pageDataset.currentPage;

      let dataset = [];

      if (this.tableSettings.headers.length == 1) {
        (this.pageDataset.dataset).forEach((value, index) => {
          dataset.push(value);
        });
      }

      if (this.tableSettings.headers.length > 1) {
        (this.pageDataset.dataset).forEach((value, index) => {
          let data = {};
          (this.tableSettings.headers).forEach((value2, index2) => {
            data[value2.key] = (value.nombre).split('-')[index2];
          });
          dataset.push(data);
        });
      }

      this.dataset = dataset;
      this.helperDataset = this.pageDataset.dataset;
    }
  }
  
  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent,{data:this.helpsSettings});
  }

  descriptionItem(): boolean {
    let typeExceptions = ["AREAS"];
    return (typeExceptions.indexOf(this.tableSettings.type) > -1)
  }

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.queryParams.nombre = this.nombre;
    this.queryParams.page = this.pageIndex;
    this.queryParams.size = this.pageSize;

    this.setQueryParamsRequest();
  }

  handleFilter() {
    this.queryParams.nombre = this.nombre;
    this.queryParams.page = 0;
    this.queryParams.size = this.pageSize;

    this.setQueryParamsRequest();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  onClickBack(){}

  // Event emmiters
  setQueryParamsRequest() {
    this.queryParamsOut.emit(this.queryParams);
  }
  newRegistrationEvent(): void{
    this.newRegistrationOut.emit(new CatalogoModel());
  }
  editRegistrationEvent(catalogo: CatalogoModel): void{
    this.editRegistrationOut.emit(catalogo);
  }
  deleteRegistrationEvent(catalogo: CatalogoModel):void {
    this.deleteRegistrationOut.emit(catalogo);
  }

}

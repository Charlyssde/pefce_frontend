import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatBottomSheet, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { HelpBottomSheetComponent } from '../../bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';

@Component({
  selector: 'shared-page-table',
  templateUrl: './page-table.component.html',
  styleUrls: ['./page-table.component.css']
})
export class PageTableComponent implements OnChanges {

  @Input() pageDataset: PageModel;
  @Input() tableSettings: any;
  @Input() helpsSettings: any;
  @Input() create: boolean;
  @Input() newUrl: string;
  @Input() update: boolean;
  @Input() updateUrl: string;
  @Input() deleteIn: boolean;
  @Input() report: boolean;
  @Input() hasChildren: any;
  
  @Output() queryParamsOut = new EventEmitter<PageRequestParams>();
  @Output() newRegistrationOut = new EventEmitter<ProfileModel>();
  @Output() editRegistrationOut = new EventEmitter<ProfileModel>();
  @Output() deleteRegistrationOut = new EventEmitter<ProfileModel>();
  queryParams: PageRequestParams = new PageRequestParams();

  helperDataset: ProfileModel[];
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

      this.dataset = this.pageDataset.dataset;
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
    this.newRegistrationOut.emit(new ProfileModel());
  }
  editRegistrationEvent(catalogo: ProfileModel): void{
    this.editRegistrationOut.emit(catalogo);
  }
  deleteRegistrationEvent(catalogo: ProfileModel):void {
    this.deleteRegistrationOut.emit(catalogo);
  }

}

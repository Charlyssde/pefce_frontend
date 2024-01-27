import { OnInit, Component } from '@angular/core';
import { MatBottomSheet, MatDialog, PageEvent } from '@angular/material';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { CatalogoModel } from '../../../../core/models/catalogos/catalogo-model';
import { Alerts } from 'src/app/core/utils/alerts';
import { PageRequestParams } from 'src/app/core/utils/requests/catalogos/page-request-params.model';
import { PageModel } from 'src/app/core/utils/responses/page.model';
import { CatalogosIdiomasFormComponent } from '../../components/catalogos-idiomas-form/catalogos-idiomas-form.component';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';

@Component({
  selector: 'app-catalogo-idiomas',
  templateUrl: './catalogo-idiomas.component.html',
  styleUrls: ['./catalogo-idiomas.component.css']
})

export class CatalogoIdiomasComponent implements OnInit {
  hasChildren: any = { 'status': true, 'url': '/catalogos/idiomas/{padreId}/etiquetas' };
  pageRequestParams: PageRequestParams = new PageRequestParams();
  pageDataset: PageModel;
  tableSettings: any = {
    "headers": [
      { "label": "Idioma", "key": "idioma" },
      { "label": "ISO", "key": "tag" },
    ],
    "actions": true,
    "type": "IDIOMAS"
  };
  helpsSettings: any = {
    'module_name': 'Catálogo de idiomas',
    'description': 'Módulo encargado de gestionar los datos base relacionados a los idiomas',
    'details': [
      { 'detail': 'Buscar (<span class="material-symbols-outlined">search</span>)', 'description': 'Filtro dinámico ' },
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)', 'description': 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)', 'description': 'Mostrar formulario para editar un registro existente' },
      { 'detail': 'Editar etiquetas (<span class="material-symbols-outlined">account_tree</span>)', 'description': 'Mostrar formulario para editar las etiquetas del idioma' }
    ]
  };
  tipoCatalogo = 'IDIOMAS';
  update: boolean = true;
  create: boolean = true;

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

  templateLabels: any = [];

  constructor(
    private dialog: MatDialog,
    private catalogosService: CatalogoService,
    private alerts: Alerts,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.readIdiomasTemplate();
    this.setQueryParamsRequest(this.pageRequestParams);
  }

  readIdiomasTemplate() {
    this.catalogosService.readIdiomasTemplate().subscribe((response) => {
      this.templateLabels = response;
    });
  }

  async pages() {
    await this.catalogosService.pageIdiomas(this.pageRequestParams).subscribe((response) => {
      if (response) {
        this.pageDataset = response;
        this.length = this.pageDataset.totalItems;
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
  handleFilter() {
    this.queryParams.nombre = this.nombre;
    this.queryParams.page = 0;
    this.queryParams.size = this.pageSize;

    this.setQueryParamsRequest(this.queryParams);
  }
  newRegistration() {
    this.saveRegistration(null, "Nuevo");
  }
  editRegistration(idioma) {
    this.saveRegistration(idioma, "Editar");
  }
  saveRegistration(idioma, action) {
    let dialogRef = this.dialog.open(CatalogosIdiomasFormComponent, {
      width: '80%',
      data: { 'action': action, 'tableSettings': this.tableSettings, 'dataset': idioma },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'submit') {
        if (action == 'Nuevo') {
          result.idioma.translationObject = JSON.stringify(this.templateLabels);
          this.catalogosService.createIdioma(result.idioma).subscribe((response) => {
            if (response) {
              this.alerts.printSnackbar(15, null, null, ((action == 'Editar' ? 'Edición exitosa' : 'Registro exitoso')), 5, false, null, null);
              this.pages();
            }
          }, (error) => {
            this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
          });
        }
        if (action == 'Editar') {
          this.catalogosService.updateIdioma(result.idioma).subscribe((response) => {
            if (response) {
              this.alerts.printSnackbar(15, null, null, ((action == 'Editar' ? 'Edición exitosa' : 'Registro exitoso')), 5, false, null, null);
              this.pages();
            }
          }, (error) => {
            this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
          });
        }
      }
    });
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent,{data:this.helpsSettings});
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

    this.setQueryParamsRequest(this.queryParams);
  }
}

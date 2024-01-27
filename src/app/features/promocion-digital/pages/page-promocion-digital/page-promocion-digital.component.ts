import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { EmailService } from 'src/app/common/email.service';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EliminarModalComponent } from 'src/app/shared/components/modals/eliminar-modal/eliminar-modal.component';
//import { PlantillaCorreoModel } from 'src/app/core/models/plantilla-correo/plantilla-correo-model';
import { PromocionDigitalModel } from 'src/app/core/models/promocion-digital/promocion-digital-model';
import { UsuarioEmpresaModel } from 'src/app/core/models/usuario-empresa/usuario-empresa-model';
import { PromocionDigitalService } from '../../service/promocion-digital.service';

@Component({
  selector: 'app-page-promocion-digital',
  templateUrl: './page-promocion-digital.component.html',
  styleUrls: ['./page-promocion-digital.component.css']
})
export class PagePromocionDigitalComponent implements OnInit {

  cargandoTexto: string = "Cargando";

  displayedColumns: string[] = ['nombre', 'updatedAt', 'acciones'];
  dataSource = null;
  cargando = false;
  enviadosCorrectamente = true;
  isCharge = false;
  isSending = false;
  displayedColumnsDestinatarios: string[] = ['select', 'nombreLegal', 'giroComercial', 'nombreCompleto', 'correo', 'estado', 'municipio', 'codigoPostal', 'recibirCorreos'];
  dataSourceDestinatarios = null;
  isChargeDestinatarios = false;
  selectionDSDestinatarios = null;
  displayedColumnsDestinatariosCorreo: string[] = ['nombreLegal', 'giroComercial', 'nombreCompleto', 'correo', 'estado', 'municipio', 'codigoPostal' , 'recibirCorreos'];
  dataSourceDestinatariosCorreo = null;
  isChargeDestinatariosCorreo = false;

  @Output() goUpdate: EventEmitter<any> = new EventEmitter();
  @ViewChild("tlPlantillaSeleccionada") tlPlantillaSeleccionada: ElementRef;
  @ViewChild("tlAdminDestinatarios") tlAdminDestinatarios: ElementRef;
  @ViewChild("tlListaDestinatarios") tlListaDestinatarios: ElementRef;

  //sort y paginator cuando hay ngif
  @ViewChild('sort') set sort(sorter: MatSort) {
    if (this.dataSource && sorter) this.dataSource.sort = sorter;
  }
  @ViewChild('paginator') set paginator(pager: MatPaginator) {
    if (this.dataSource && pager) this.dataSource.paginator = pager;
  }
  @ViewChild('sortDestinatarios') set sortDestinatarios(sorter: MatSort) {
    if (this.dataSourceDestinatarios && sorter) this.dataSourceDestinatarios.sort = sorter;
  }
  @ViewChild('paginatorDestinatarios') set paginatorDestinatarios(pager: MatPaginator) {
    if (this.dataSourceDestinatarios && pager) this.dataSourceDestinatarios.paginator = pager;
  }
  @ViewChild('sortDestinatariosCorreo') set sortDestinatariosCorreo(sorter: MatSort) {
    if (this.dataSourceDestinatariosCorreo && sorter) this.dataSourceDestinatariosCorreo.sort = sorter;
  }
  @ViewChild('paginatorDestinatariosCorreo') set paginatorDestinatariosCorreo(pager: MatPaginator) {
    if (this.dataSourceDestinatariosCorreo && pager) this.dataSourceDestinatariosCorreo.paginator = pager;
  }

  nombrePreview = "";
  plantillaPreview = "";
  editorStyles = {
    height: '400px',
  }
  modules = {};

  filterValues = {};//para filtrarcolumnastabla
  filterSelectObj = [//para filtrarcolumnastabla
    {
      name: 'Nombre legal',
      columnProp: 'nombreLegal',
      options: [],
      modelValue: undefined,
    }, {
      name: 'Giro comercial',
      columnProp: 'giroComercial',
      options: [],
      modelValue: undefined,
    }, {
      name: 'Nombre (contacto)',
      columnProp: 'nombreCompleto',
      options: [],
      modelValue: undefined,
    }, {
      name: 'Correo',
      columnProp: 'correo',
      options: [],
      modelValue: undefined,
    }, {
      name: 'Estado',
      columnProp: 'estado',
      options: [],
      modelValue: undefined,
    }, {
      name: 'Municipio',
      columnProp: 'municipio',
      options: [],
      modelValue: undefined,
    }, {
      name: 'Codigo postal',
      columnProp: 'codigoPostal',
      options: [],
      modelValue: undefined,
    },
  ];

  constructor(
    public appC: AppComponent,
    private service: PromocionDigitalService,
    public scriptGL: ScriptsGlobalService,
    private dialog: MatDialog,
    private router: Router,
    private emailService: EmailService,
  ) { }

  ngOnInit() {
    this.getPage();
  }

  //para filtrarcolumnastabla Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      var objKey = getDataObjectKey(obj, key);
      if (!uniqChk.includes(objKey)) {
        uniqChk.push(objKey);
      }
      return obj;
    });
    uniqChk.sort();
    return uniqChk;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getPage() {
    await this.service.page().subscribe(data => {
      if (data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.scriptGL.printSnackbar(2, 1, 'plantillas', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
    
    await this.service.pageDestinatarios().subscribe(data => {
      if (data.length > 0) {
        this.selectionDSDestinatarios = new SelectionModel<UsuarioEmpresaModel>(true, []);
        this.dataSourceDestinatarios = data; //new MatTableDataSource<UsuarioEmpresaModel>(data);
        this.dataSourceDestinatarios.paginator = this.paginatorDestinatarios;
        this.dataSourceDestinatarios.sort = this.sortDestinatarios;
        this.isChargeDestinatarios = true;
        
        this.filterSelectObj.filter((o) => {//para filtrarcolumnastabla
          o.options = this.getFilterObject(data, o.columnProp);
        });
        
        this.dataSourceDestinatarios.filterPredicate = this.createFilter(); //para filtrarcolumnastabla Overrride default filter behaviour of Material Datatable

        //destinatariosCorreo
        this.dataSourceDestinatariosCorreo = new MatTableDataSource<UsuarioEmpresaModel>([]);
        this.dataSourceDestinatariosCorreo.paginator = this.paginatorDestinatariosCorreo;
        this.dataSourceDestinatariosCorreo.sort = this.sortDestinatariosCorreo;
        this.isChargeDestinatariosCorreo = true;
      } else {
        this.dataSourceDestinatarios = null;
        this.isChargeDestinatarios = true;
        //destinatariosCorreo
        this.dataSourceDestinatariosCorreo = null;
        this.isChargeDestinatariosCorreo = true;

        this.scriptGL.printSnackbar(2, 1, 'contactos', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isChargeDestinatarios = true;
      //destinatariosCorreo
      this.isChargeDestinatariosCorreo = true;
    });
  }

  editar(data) {
    this.goUpdate.emit(data);
  }

  async eliminar(data) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      data: {
        id: data.id,
        etiqueta: 'plantilla',
        nombre: data.nombreCompleto
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(data.id).subscribe(data => {
          if (data) {
            this.scriptGL.printEliminarSnackBar(data);
            this.getPage();
          } else {
            this.scriptGL.printSnackbar(3, 1, 'plantilla', null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
          this.getPage();
        });
      }
    });
  }

  preview(data: PromocionDigitalModel) {
    //console.log(data);
    this.appC.isLoading = true;
    this.nombrePreview = data.nombre;
    this.plantillaPreview = data.plantilla;
    this.appC.isLoading = false;
  }

  enviar(data: PromocionDigitalModel) {
    this.preview(data);
    this.isSending = true;
  }

  notSending() {
    this.isSending = false;
  }

  // #region para filtrarcolumnastabla
  filterChange(filter, event) {// Called on Filter change
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSourceDestinatarios.filter = JSON.stringify(this.filterValues);
    this.selectionDSDestinatarios.clear();//para limpiarseleccion antes de seleccionar todo
    this.masterToggle(true);//para limpiar y seleccionartodo
  }

  createFilter() {// Custom filter method fot Angular Material Datatable
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
      let nameSearch = () => {
        let found = true;
        if (isFilterSet) {
          for (const col in searchTerms) {
            var auxFound = false;
            var dataCol = getDataObjectKey(data, col);
            if (dataCol != null) {
              if (dataCol.toString().toLowerCase().indexOf(searchTerms[col].toLowerCase()) != -1 && isFilterSet) {
                auxFound = true;
              }
            }
            if (!auxFound) {
              found = auxFound;
              break;
            }
          }
        }
        return found;
      }
      return nameSearch();
    }
    return filterFunction;
  }

  resetFilters() {// Reset table filters
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSourceDestinatarios.filter = "";
    this.selectionDSDestinatarios.clear();//para limpiarSeleccion
  }

  addRemoveSelectedDestinatarios(isAdding: boolean) {
    var dataAux = this.dataSourceDestinatariosCorreo.data;
    this.selectionDSDestinatarios.selected.forEach((value, key) => {
      var index = this.dataSourceDestinatariosCorreo.data.indexOf(value);
      if (index != -1) {//caso dato encontrado
        if (!isAdding) {//cuando se deben borrar coincidencias
          dataAux.splice(index, 1);//borrar
        }
      } else {//caso dato no encontrado
        if (isAdding) {//cuando se deben agregar nuevos elementos
          dataAux.push(value);//agregar
        }
      }
    });
    this.dataSourceDestinatariosCorreo.data = dataAux;
    this.scriptGL.printSnackbar(15, null, null, 'Lista actualizada', 2, false, null, null);
  }

  goToInPage(idZone: string) {// Reset table filters
    switch (idZone) {
      case 'tlPlantillaSeleccionada':
        this.tlPlantillaSeleccionada.nativeElement.focus();
        break;
      case 'tlAdminDestinatarios':
        this.tlAdminDestinatarios.nativeElement.focus();
        break;
      case 'tlListaDestinatarios':
        this.tlListaDestinatarios.nativeElement.focus();
        break;
    }
  }

  enviarCorreoDestinatarios() {
    var listaCorreos = []; 
    var listaPlantillas = []; 

    this.dataSourceDestinatariosCorreo.data.forEach((value, key) => {
      console.log( value );
      if (value['contactos'][0]['recibirPublicidad']) {
        listaCorreos.push( value['contactos'][0]['email'] );      
        listaPlantillas.push( obtenerPlantillaCorreo(value, this.plantillaPreview ) );  
      }
    });

    //envio de correos
    //this.enviadosCorrectamente = true;
    //listaCorreos.forEach(plantillaCorreo => {
    this.envioMasivoIndependiente( listaCorreos, this.nombrePreview, listaPlantillas );
    //});
    // if (this.enviadosCorrectamente) {
    this.scriptGL.printSnackbar(15, null, null, 'Correos enviados con éxito.', 5, false, null, null);
    // } else {
    //   this.scriptGL.printSnackbar(15, null, null, 'Error al enviar los correos.', 5, false, null, null);
    // }
  }

  async envioMasivoIndependiente( correos: any, asunto: string, plantilla: any ) {
    this.cargando = true;
    await this.emailService.sendMasiveMail(correos, asunto, plantilla).subscribe(data => {
      if (!data) { this.enviadosCorrectamente = false; }
      this.cargando = false;
    });
    //await this.emailService.sendEmailWithDestinosAndMensajeToFrontEnd([plantillaCorreo.destinatario], 'PEFCE - Promoción digital', plantillaCorreo.plantilla, true).subscribe(() => { this.cargando = false; });
  }

  // #endregion para filtrarcolumnastabla

  // #region para seleccionartabla
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if( this.selectionDSDestinatarios.selected ){
      const numSelected = this.selectionDSDestinatarios.selected.length;
      console.log( this.dataSourceDestinatarios );
      const numRows = this.dataSourceDestinatarios.length;
      return numSelected === numRows;  
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(doCleanAndSelectAll: boolean) {
    if (doCleanAndSelectAll) {
      this.selectionDSDestinatarios.clear();
      this.dataSourceDestinatarios.filteredData.forEach(row => this.selectionDSDestinatarios.select(row));
    } else {
      this.isAllSelected() ? this.selectionDSDestinatarios.clear() :
        this.dataSourceDestinatarios.filteredData.forEach(row => this.selectionDSDestinatarios.select(row));
    }
  }
  // #endregion para seleccionartabla

}

//obtener datos del objeto
function getDataObjectKey(obj, key) {
  var objKey = 'valorNoExiste';
  if (obj != null) {
    switch (key) {
      case 'nombreLegal':
        objKey = obj['empresa'] != null ? obj['empresa'].nombreLegal : 'valorNoExiste';
        break;
      case 'giroComercial':
        objKey = obj['empresa'] != null ? obj['empresa'].giroComercial : 'valorNoExiste';
        break;
      case 'nombreCompleto':
        objKey = obj['usuario'] != null ? obj['usuario'].nombreCompleto : 'valorNoExiste';
        break;
      case 'correo':
        objKey = obj['usuario'] != null ? obj['usuario'].correo : 'valorNoExiste';
        break;
      case 'estado':
        objKey = obj['usuario'] != null ? (obj['usuario']['estado'] != null ? obj['usuario']['estado'].estado : null) : 'valorNoExiste';
        break;
      case 'municipio':
        objKey = obj['usuario'] != null ? (obj['usuario']['municipio'] != null ? obj['usuario']['municipio'].municipio : null) : 'valorNoExiste';
        break;
      case 'codigoPostal':
        objKey = obj['usuario'] != null ? obj['usuario'].codigoPostal : 'valorNoExiste';
        break;
    }
  }
  if ([null, '', undefined].includes(objKey)) {
    objKey = '--Sin especificar--';
  } else if (objKey == 'valorNoExiste') {
    objKey = null;
  }
  return objKey;
}

//se obtiene la plantilla personalizada y el destinatario
function obtenerPlantillaCorreo(destinatario: UsuarioEmpresaModel, plantilla: string) {

  var result: String = plantilla;
  var arrayKeyWords = [];
  arrayKeyWords['nombreLegal'] = '{nombreLegalEmpresaDestinatario}';
  arrayKeyWords['giroComercial'] = '{giroComercialEmpresaDestinatario}';
  arrayKeyWords['nombreCompleto'] = '{nombreCompletoContactoDestinatario}';
  arrayKeyWords['correo'] = '{correoContactoDestinatario}';
  arrayKeyWords['estado'] = '{estadoContactoDestinatario}';
  arrayKeyWords['municipio'] = '{municipioContactoDestinatario}';
  arrayKeyWords['codigoPostal'] = '{codigoPostalContactoDestinatario}';
  Object.entries(arrayKeyWords).forEach(([key, value]) => {
    var reemplazo = getDataObjectKey(destinatario, key);
    result = result.replace(new RegExp(value, 'g'), reemplazo);
  });
  return result;
}

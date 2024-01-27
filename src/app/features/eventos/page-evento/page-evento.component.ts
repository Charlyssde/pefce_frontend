import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EliminarModalComponent } from 'src/app/shared/components/modals/eliminar-modal/eliminar-modal.component';
//import { VerEventoEmpresaComponent } from 'src/app/modals/ver-evento-empresa/ver-evento-empresa.component';
import { PageEventoContactosComponent } from 'src/app/features/eventos/page-evento-contactos/page-evento-contactos.component';
import { EventosService } from '../service/eventos.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { EventoComponent } from '../evento/evento.component';
import { FormControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { ExcelService } from 'src/app/common/excel.service';
import { ReportesModalComponent } from 'src/app/shared/components/modals/reportes-modal/reportes-modal.component';
import { Alerts } from 'src/app/core/utils/alerts';

@Component({
  selector: 'app-page-evento',
  templateUrl: './page-evento.component.html',
  styleUrls: ['./page-evento.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PageEventoComponent implements OnInit {

  displayedColumns: string[] = ['nombreEvento', 'tipoId', 'privacidad', 'modalidad', 'sede', 'responsableId', 'estatus', 'fechaInicio', 'fechaFin', 'acciones'];
  titleColumns: string[] = ['Evento', 'Tipo', 'Privacidad','Modalidad','Sede|Reunión','Responsable', 'Estatus', 'Inicio','Término','Acciones'];
  eSubarea: any = [];
  eTipoEvento: any = [];
  eModalidadEvento: any = [];
  ePrivacidadEvento: any = [];
  eTipoSolicitud: any = [];
  eEstatus: any = [];
  displayerColumnsFilter = [
    {etiqueta: 'Todo', valor: 'all', tipo: 'string'},
    {etiqueta: 'Evento', valor: 'nombreEvento', tipo: 'string'},
    {etiqueta: 'Privacidad', valor: 'privacidad', tipo: 'string'},
    {etiqueta: 'Modalidad', valor: 'modalidad', tipo: 'string'}
  ];
  dataSource = null;
  dataSourceByService = null;
  isCharge = false;
  selectSearch = new FormControl('');
  valueSearch = new FormControl('');

  @Output() goUpdate: EventEmitter<any> = new EventEmitter();
  @Output() goEventosEmpresas: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: EventosService,
    public scriptGL: ScriptsGlobalService,
    private dialog: MatDialog,
    private master: EventoComponent,
    private appC: AppComponent,
    private alerts: Alerts,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.eSubarea = this.scriptGL.eSubarea;
    this.eModalidadEvento = this.scriptGL.eModalidadEvento;
    this.ePrivacidadEvento = this.scriptGL.ePrivacidadEvento;
    this.eTipoEvento = this.master.eTipoEvento;
    this.eTipoSolicitud = this.master.eTipoSolicitud;
    this.eEstatus = this.master.eEstatus;


    this.getPage();
    this.selectSearch.valueChanges.subscribe(data=>{
      this.valueSearch.reset();
      this.setMatDataSource(this.dataSourceByService);
    });
  }

  applyFilter() {
    const valorBusqueda = this.valueSearch.value;
    const filtro =  this.selectSearch.value;
    if(filtro && filtro.valor != 'all') {
      let resultadoBusqueda = this.scriptGL.getDatosPorFiltro(this.dataSourceByService, filtro.tipo, filtro.valor, valorBusqueda);
      this.setMatDataSource(resultadoBusqueda);
    } else {
      this.dataSource.filter = valorBusqueda.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  async getPage(){
    await this.service.page().subscribe(data=> {
      if(data.length>0){
        this.setMatDataSource(data);
        this.isCharge = true;
        this.dataSourceByService = data;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.scriptGL.printSnackbar(2,1,'eventos',null,5,false,null,null);
      }
    },error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

  setMatDataSource(data: any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(data) {
    this.goUpdate.emit(data);
  }

  registrarEmpresas(data){
    this.goEventosEmpresas.emit(data);
  }

  async eliminar(data) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      data: {
        id: data.id,
        etiqueta: 'evento',
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
            this.scriptGL.printSnackbar(3, 1, 'evento', null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
          this.getPage();
        });
      }
    });
  }

  /*
  verDirectorios(data) {
    this.dialog.open(VerEventoEmpresaComponent, {
      data: {
        evento: data,
      }
    });
  }
  */
  
  verContactos(data) {
    this.dialog.open( PageEventoContactosComponent, {
      data: {
        evento: data,
      }
    });
  }

  getEstatus(key){
    var data = null;
    this.eEstatus.forEach((val,i) => {
      if(val.key == key) data = val.value;
    });
    return data;
  }

  async pageExcel(){
    this.appC.cargandoTexto = 'Generando reporte';
    this.appC.cargando = true;
    await this.excelService.downloadPageEventos();
    this.appC.cargando = false;
  }


  async crearReporte(){
    await this.service.reportesolicitudes().subscribe((response) => {
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

   
  async enviarEncuestas(evento: any){
    await this.service.enviarEncuestas(evento).subscribe((response) => {
      this.alerts.printSnackbar(15, null, null, "Encuestas enviadas", 5, false, null, null);
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  
  }  


}

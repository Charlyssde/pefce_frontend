import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EliminarModalComponent } from 'src/app/shared/components/modals/eliminar-modal/eliminar-modal.component';
import { CapacitacionesService } from '../../service/capacitaciones.service';
import { VerCapacitacionContactoModalComponent } from '../../components/ver-capacitacion-contacto-modal/ver-capacitacion-contacto-modal.component';
import { ConfirmarModalComponent } from 'src/app/features/audiencia-capacitaciones/confirmar-modal/confirmar-modal.component';
import { AppComponent } from 'src/app/app.component';
import { ExcelService } from 'src/app/common/excel.service';
import { FormControl } from '@angular/forms';
import { ReportesModalComponent } from 'src/app/shared/components/modals/reportes-modal/reportes-modal.component';
import { Alerts } from 'src/app/core/utils/alerts';

@Component({
  selector: 'app-page-capacitacion',
  templateUrl: './page-capacitacion.component.html',
  styleUrls: ['./page-capacitacion.component.css']
})

export class PageCapacitacionComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'subarea', 'fechaInicio', 'fechaFin', 'tipo', 'activo', 'acciones'];
  displayerColumnsFilter = [
    {etiqueta: 'Todo', valor: 'all', tipo: 'string'},
    {etiqueta: 'Nombre', valor: 'nombre', tipo: 'string'},
    {etiqueta: 'Descripción', valor: 'descripcion', tipo: 'string'},
    {etiqueta: 'Subarea', valor: 'subarea', tipo: 'string'}
  ];
  dataSource = null;
  dataSourceByService = null;
  isCharge = false;
  selectSearch = new FormControl('');
  valueSearch = new FormControl('');

  @Output() goUpdate: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private service: CapacitacionesService,
    public scriptGL: ScriptsGlobalService,
    private dialog: MatDialog,
    private appC: AppComponent,
    private alerts: Alerts,
    private excelService: ExcelService
  ) { }
  
  ngOnInit() {
   
    this.getPage();
    // this.selectSearch.valueChanges.subscribe(data=>{
    //   this.valueSearch.reset();
    //   this.setMatDataSource(this.dataSourceByService);
    // });
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

  filtrado(resultados) {
    this.setMatDataSource(resultados);
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
        this.scriptGL.printSnackbar(2,1,'capacitaciones',null,5,false,null,null);
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

  async eliminar(data) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      data: {
        id: data.id,
        etiqueta: 'capacitacion',
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
            this.scriptGL.printSnackbar(3, 1, 'capacitacion', null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
          this.getPage();
        });
      }
    });
  }
 
  verContactos(data) {
    this.dialog.open(VerCapacitacionContactoModalComponent, {
      data: {
        capacitacion: data,
      }
    });
  }

  verModulos(id) {
    this.router.navigate(['capacitaciones/'+id+'/modulos']);
  }

  async activarDesactivar(data){
    /*
    const dialogRef = this.dialog.open(ConfirmarModalComponent, {
      data: {
        etiqueta: (data.activo ? 'desactivar':'activar') + ' la capacitación',
        nombre: data.nombre
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if (result) {*/
        data.activo = !data.activo;
        this.service.update(data).subscribe(data => {
          if (data) {
            this.scriptGL.printSnackbar(15, null, null, 'Se ha actualizado el estado de la capacitación', 5, false, null, null)
            this.getPage();
          } else {
            this.scriptGL.printSnackbar(1, null, null, null, 5, false, null, null);
          }
          
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
        });
      /*}
    });*/
  }

  printArea(key: String){
    switch (key) {
      case 'atraccionInversiones':
        return 'Atracción de inversiones';
      case 'comercioExterior':
        return 'Comercio Exterior';
      case 'proyectosEstrategicos':
        return 'Proyectos Estratégicos';
      default:
        return '';
    }
  }

  printTipo(tipo: number){
    switch (tipo) {
      case 1: return 'Virtual asíncrona por invitación';
      case 2: return 'Virtual asíncrona pública';
      case 3: return 'Virtual síncrona por invitación';
      case 4: return 'Virtual síncrona pública';
      case 5: return 'Presencial por invitación';
      case 6: return 'Presencial pública';
      default: return '';
    }
  }

  async pageExcel(){
    this.appC.cargandoTexto = 'Generando reporte';
    this.appC.cargando = true;
    await this.excelService.downloadPageCapacitaciones();
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

}

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EliminarModalComponent } from 'src/app/shared/components/modals/eliminar-modal/eliminar-modal.component';
import { MinutasService } from 'src/app/features/minutas/service/minutas.service';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
//import { FeriasService } from 'src/app/features/ferias/service/ferias.service';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';
//import { EventosService } from 'src/app/features/eventos/service/eventos.service';
//import { SolicitudesService } from 'src/app/features/solicitudes/services/solicitudes.service';
import { DatePipe } from '@angular/common';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ProyectosService } from 'src/app/features/proyectos/services/proyectos.service';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';
import { ProjectRequest } from 'src/app/core/utils/requests/projects/project.request';
@Component({
  selector: 'app-page-minuta',
  templateUrl: './page-minuta.component.html',
  styleUrls: ['./page-minuta.component.css']
})
export class PageMinutaComponent implements OnInit {

  displayedColumns: string[] = ['seleccionar','folio', 'asunto', 'objetivo', 'sede', 'categoria', 'tipo', 'fecha', 'acciones'];
  dataSource = null;
  isCharge = false;

  elementsZip = [];

  proyecto: ProjectRequest = new ProjectRequest();

  @Output() goUpdate: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: MinutasService,
    public scriptGL: ScriptsGlobalService,
    private dialog: MatDialog,
    //private feriasService: FeriasService,
    private capacitacionesService: CapacitacionesService,
    //private eventosService: EventosService,
    private proyectosService: ProyectosService,
    //private solicitudeService: SolicitudesService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
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
        this.scriptGL.printSnackbar(2, 1, 'minutas', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

  editar(data) {
    this.goUpdate.emit(data);
  }

  async eliminar(data) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      data: {
        id: data.id,
        etiqueta: 'minuta',
        nombre: data.folio
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(data.id).subscribe(data => {
          if (data) {
            this.scriptGL.printEliminarSnackBar(data);
            this.getPage();
          } else {
            this.scriptGL.printSnackbar(3, 1, 'minuta', null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
          this.getPage();
        });
      }
    });
  }

  promover(minuta: MinutaModel){
    this.proyecto.project = new ProyectosModel();
    this.proyecto.project.nombre = minuta.asunto;
    this.proyecto.project.descripcion = minuta.objetivo;
    this.proyecto.project.fechaInicio = minuta.fecha;
    this.proyecto.enterpriseResponsible = this.obtenerResponsableEmpresa(minuta);
    const usuario = JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('session')))));
    this.proyecto.institutionResponsible = usuario.idUsuario;

    this.proyectosService.create( this.proyecto ).subscribe(data=>{
      console.log(data);
    });
  }

  obtenerResponsableEmpresa(minuta: MinutaModel){
    let usuarioId: number = 0;
    minuta.minutaUsuarios.forEach(element => {
        element.perfiles.forEach(perfil => {
          if( perfil.tipo === "empresa" ){
            usuarioId = element.id;
          }
        });
    });
    return usuarioId;
  }

/*   async getClase(tipo: String, id: number) {
    switch (tipo) {
      case "Feria":
        return await this.feriasService.findById(id).toPromise();
      case "Proyecto":
        return await this.proyectosService.findById(id).toPromise();
      case "Capacitación":
        return await this.capacitacionesService.findById(id).toPromise();
      case "Evento":
        return await this.eventosService.findById(id).toPromise();
      case "Solicitud":
          return await this.solicitudeService.show(id);
    }
  } */

  getNombreClase(clase,element){
    switch (clase) {
      case "Feria":
      case "Capacitación":
        return element.nombre;
      case "Proyecto":
        return element.nombreProyecto;
      case "Evento":
        return element.nombreEvento
      case "Solicitud":
        return element.descripcion
    }
  }

  // async generarPdf(element,tipo){
  //   var currentY = 10;
  //   //var clase = await this.getClase(element.claseMinuta.nombre, element.idClase);
  //   const doc = new jsPDF({
  //     orientation: "v",
  //     format: "letter"
  //   });

  //   var pageHeight = doc.internal.pageSize.height;

  //   doc.setFontSize(16);
  //   doc.text("Secretaría de Desarrollo Económico y Portuario", 107.54, currentY,{align: 'center'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   doc.setFontSize(14);
  //   doc.text("Minuta " + (element.folio != null ? element.folio : ''), 107.54, currentY,{align: 'center'});
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   doc.setFontSize(12);
  //   doc.text("Fecha: " + this.datePipe.transform(element.fecha,'fullDate'), 200, currentY,{align: 'right'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   doc.text("Tipo de Minuta: " + (element.tipoMinuta.nombre != null ? element.tipoMinuta.nombre : ''), 200, currentY,{align: 'right'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   /*
  //   doc.text(element.claseMinuta.nombre+": " + this.getNombreClase(element.claseMinuta.nombre,clase), 200, currentY,{align: 'right'});
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }*/
  //   doc.text("Asunto: " + (element.asunto != null ? element.asunto : ''), 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   doc.text("Objetivo: " + (element.objetivo != null ? element.objetivo : ''), 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   doc.setFontSize(14);
  //   doc.text("Sede:", 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   doc.setFontSize(12);
  //   doc.text((element.sede != null ? element.sede : '') +" - "+ (element.ciudad != null ? element.ciudad : '') + " ("+ (element.estado != null ? element.estado.estado : '') +"," + (element.municipio != null ? element.municipio.municipio : '') +") Código postal: " + (element.codigoPostal != null ? element.codigoPostal : ''), 15, currentY,{align: 'left'});
  //   //doc.text(element.sede +" - "+ element.ciudad + " ("+ element.estado.estado +"," + element.municipio.municipio +") Código postal: " + element.codigoPostal, 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }

  //   var rows = [];
  //   element.minutaTemas.forEach(mt => {
  //     rows.push([mt.temaMinuta.nombre]);
  //   });
  //   autoTable(doc, {
  //     head: [['Temas tratados']],
  //     body: rows,
  //     startY: currentY
  //   });
  //   currentY = doc.lastAutoTable.finalY;
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }

  //   doc.setFontSize(14);
  //   doc.text('Usuarios Participantes:', 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   var rows = [];
  //   element.minutaUsuarios.forEach(mu => {
  //     rows.push([mu.usuario.nombreCompleto,mu.usuario.puesto,mu.usuario.perfilUsuario.nombre]);
  //   });
  //   autoTable(doc, {
  //     head: [['Usuario','Puesto','Tipo de Participante']],
  //     body: rows,
  //     startY: currentY
  //   });
  //   currentY = doc.lastAutoTable.finalY;
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }

  //   doc.setFontSize(14);
  //   doc.text('Tareas:', 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   var rows = [];
  //   element.tareas.forEach(mtr => {
  //     rows.push([mtr.tarea,mtr.entregable,this.datePipe.transform(mtr.fechaTermino,'mediumDate'),mtr.usuarioId.nombreCompleto]);
  //   });
  //   autoTable(doc, {
  //     head: [['Tarea','Entregable','Fecha de entrega','Responsable']],
  //     body: rows,
  //     startY: currentY
  //   });
  //   currentY = doc.lastAutoTable.finalY;
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }

  //   doc.setFontSize(14);
  //   doc.text('Archivos:', 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   var rows = [];
  //   element.minutaArchivos.forEach(ma => {
  //     rows.push([ma.nombre, (ma.archivo == null) ? 'Archivo sin cargar': 'Archivo cargado', this.datePipe.transform(ma.updatedAt,'mediumDate'),ma.responsable.nombreCompleto]);
  //   });
  //   autoTable(doc, {
  //     head: [['Archivo','Estado','Fecha de carga','Responsable']],
  //     body: rows,
  //     startY: currentY
  //   });
  //   currentY = doc.lastAutoTable.finalY;
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }

  //   doc.addPage();
  //   currentY = 20;
  //   doc.setFontSize(14);
  //   doc.text('Puntos tratados:', 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }
  //   doc.setFontSize(12);
  //   doc.fromHTML(element.puntosTratados, 15, currentY,{align: 'left'});
  //   currentY += 7;
  //   currentY += 7;
  //   currentY += 7;
  //   currentY += 7;
  //   currentY += 7;
  //   currentY += 7;
  //   currentY += 7;
  //   currentY += 7;
  //   if (currentY >= pageHeight ) {
  //     doc.addPage();
  //     currentY = 10;
  //   }


  //   if (tipo == 'singular') {
  //     doc.save("minuta_"+element.folio+".pdf");
  //   }else{
  //     return doc.output('blob');
  //   }
  // }
descargarZip(tipo) {
    let idsSeleccionados: number[] = [];
    if (tipo === 'singular') {
      const idsSeleccionados = this.elementsZip.map(element => element.id);
      this.service.listaminutas(idsSeleccionados).subscribe(
          (data: Blob) => {
              this.openPdf(data); // Abre un PDF que contiene todos los elementos
              this.snackBar.open('Creado Correctamente.', 'Entendido', { duration: 3000 });
          },
          error => {
              this.snackBar.open('Error al crear PDF.', 'Entendido', { duration: 3000 });
          }
      );

    } else {
        this.elementsZip.forEach(element => {
            idsSeleccionados.push(element.id);
        });
    }

}

  generarPdfbl(dato: any) {
    console.log("id de la minuta", dato.id)
    this.service.getminutaPdf(dato.id).subscribe(
      (data: Blob) => {
        this.openPdf(data);
        this.snackBar.open('Creado Correctamente.', 'Entendido', {duration : 3000 });
      },
      error => {
        this.snackBar.open('Error al crear PDF.', 'Entendido', { duration: 3000 });
      }
    );
  }

  private openPdf(data: Blob) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  ejecutarAddDel($e,element){
    if($e.checked){
      this.agregarElementZip(element);
    }else{
      this.eliminarElementZip(element);
    }
  }

  eliminarElementZip(element){
    this.elementsZip.forEach( (item, index) => {
      if(item === element) this.elementsZip.splice(index,1);
    });
  }

  agregarElementZip(element){
    this.elementsZip.push(element);
  }
}

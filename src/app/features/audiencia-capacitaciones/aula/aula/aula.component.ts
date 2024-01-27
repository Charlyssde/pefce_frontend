import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ConfirmarModalComponent } from 'src/app/features/audiencia-capacitaciones/confirmar-modal/confirmar-modal.component';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';
import { ModulosService } from 'src/app/features/capacitaciones/modulos/service/modulos.service';
import { AulaService } from '../service/aula.service';
import * as jsPDF from 'jspdf';
import * as qrcode from "qrcode";
import { DatePipe } from '@angular/common'
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';


@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {
  idCapacitacion: number = 0;
  capacitacion: CapacitacionModel = new CapacitacionModel;
  modulos: any;

  verModulos = true;
  verTema = false;
  temaActual = null;
  permitirResponder = true;
  estaTerminada = false;
  usuarioCapacitacion: any;
  faltaUUID = true;
  constancia = false;

  constructor(
    public scriptGL: ScriptsGlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AulaService,
    private ModulosService: ModulosService,
    private capacitacionService: CapacitacionesService,
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private encuestasService: AdministracionEncuestasService,
  ) { }

  ngOnInit() {
    this.idCapacitacion = parseInt(this.route.snapshot.paramMap.get('id_capacitacion'));
    this.service.validarAcceso(this.idCapacitacion,this.scriptGL.getUserSessionData().idUsuario).subscribe(data => {
      if (data) {
        this.usuarioCapacitacion = data;
        this.capacitacion = data.capacitacion;
        
        var endDate = new Date(data.capacitacion.fechaFin);
        var today = new Date();
        if (today.getTime() > endDate.getTime()) {
          this.permitirResponder = false;
        }
        if(data.concluyo == true){
          this.permitirResponder = false;
        }
        if (data.uuidFinalizado != null) {
          this.faltaUUID = false;
        }
        this.cargarModulos();
      }else{
        this.scriptGL.printSnackbar(15, 1, null, 'Usted no cuenta con acceso a esta capacitación', 2, false, null, null);
        this.router.navigate(['/audienciaCapacitaciones']);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
    });
    this.validarCapacitacionTerminada();
  }

  validarCapacitacionTerminada(){
    this.capacitacionService.validarCapacitacionTerminada(this.idCapacitacion,this.scriptGL.getUserSessionData().idUsuario).subscribe(data=>{
      this.estaTerminada = data;
    });
  }

  cargarModulos() {
    this.ModulosService.page(this.capacitacion.id).subscribe(data => {
      if (data) {
        this.modulos = data;
      }else{
        this.scriptGL.printSnackbar(2, 1, 'modulos', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
    });
  }

  cambiarATema(tema: any){
    this.verModulos = false;
    this.verTema = true;
    this.temaActual = tema;
  }

  cambiarAModulos(){
    this.verModulos = true;
    this.verTema = false;
  }

  async finalizarCurso(){
    
    const dialogRef = this.dialog.open(ConfirmarModalComponent,{
      data: {
        id: '',
        etiqueta: "terminar la capacitación",
        nombre: '"' + this.capacitacion.nombre + '"',
        isRechazar: false,
        isVerMotivo: false,
        motivoRechazo: ''
      }
    });
    await dialogRef.afterClosed().subscribe(async result=>{
      if(result){
        //this.usuarioCapacitacion.uuidFinalizado = uuidv4();
        this.service.finalizarCapacitacion(this.usuarioCapacitacion).subscribe(data => {
          if (data.uuidFinalizado != null) {
            this.faltaUUID = false;
          }
          this.usuarioCapacitacion = data;
          this.scriptGL.printSnackbar(15, 1, null, 'Se ha finalizado correctamente la capacitación, ahora puede generar su constancia de participación.', 5, false, null, null);
        });
      }
    });    
    this.lanzarEncuesta( this.capacitacion.encuesta.archivo[0].url );
  }

  lanzarEncuesta(pdfURI: string) {
    this.encuestasService.getEncuesta(21).subscribe((response) => {
      this.dialog.open(PdfPreviewComponent, {
        width: '70vw',
        data: {
          titulo: "Encuesta de satisfacción",
          pdf: response.archivo[0].url
        }
      });
    });
  }   

  descargarConstancia(){    

    qrcode.toDataURL(window.location.origin  + '/capacitaciones/validarQR/' + this.usuarioCapacitacion.uuidFinalizado)
    .then(url => {
      const doc = new jsPDF({
        orientation: "l",
        format: "letter"
      });
      doc.setFontSize(20);
      doc.text( 139.5, 15,"La Secretaría de Desarrollo Económico y Portuario",{align: 'center'});
      
      doc.text( 139.5, 24,"y",{align: 'center'});
      doc.text( 139.5, 33,"La subsecretaría de Industria, Atracción de Inversiones, Comercio Exterior y Proyectos Estratégicos",{align: 'center',maxWidth: 230});
      doc.setFontSize(17);
      doc.text( 139.5, 60,"Otorgan la presente",{align: 'center'});
      doc.setFontSize(55);
      doc.text( 139.5, 80,"CONSTANCIA",{align: 'center'});
      doc.setFontSize(17);
      doc.text(139.5, 92,"A:", {align: 'center'});
      doc.setFontSize(25);      
      
      doc.text( 139.5, 105,this.usuarioCapacitacion.usuario.nombre,{align: 'center'});
      
      doc.setFontSize(17);
      doc.text( 139.5, 117, "Por haber concluido satisfactoriamente la capacitación virtual:",{align: 'center', maxWidth: 230})
      doc.setFontSize(25);
      doc.text( 139.5, 132, this.usuarioCapacitacion.capacitacion.nombre,{align: "center", maxWidth: 230});
      doc.setFontSize(17);
      doc.text(139.5, 145, "Impartida a través de la Plataforma Electrónica para el Fomento del Comercio Exterior del Estado de Veracruz entre el "+ this.datepipe.transform(this.usuarioCapacitacion.capacitacion.fechaInicio, 'd \'de\' MMMM \'de\' yyyy') +" y el "+ this.datepipe.transform(this.usuarioCapacitacion.capacitacion.fechaFin, 'd \'de\' MMMM \'de\' yyyy'),  {align: 'center', maxWidth: 230})
      doc.setFontSize(17);
      doc.text( 139.5, 165, "Xalapa, Ver. a "+ this.datepipe.transform(this.usuarioCapacitacion.updatedAt, 'd \'de\' MMMM \'de\' yyyy'),{align: 'center', maxWidth: 230})
      doc.text( 69.75, 200, "Firmante uno",{align: 'center', maxWidth: 230})
      doc.text(209.25, 200, "Firmante dos", {align: 'center', maxWidth: 230})
      doc.setFontSize(8);
      doc.text(260.5, 178,"Validación",  {align: 'center'});
      doc.addImage(url,"JPG",243,180,35,35);
      
      doc.save("constancia.pdf");
    })
    .catch(err => {
      console.error(err)
    })
  }
}

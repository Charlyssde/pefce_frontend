import { environment } from '../../../../environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { CapacitacionesService } from '../../capacitaciones/service/capacitaciones.service';
import { MatDialog } from '@angular/material';
//import { ConfirmarModalComponent } from 'src/app/shared/components/modals/confirmar-modal/confirmar-modal.component';
import { Router } from '@angular/router';
import { AulaService } from '../aula/service/aula.service';
import { DatePipe } from '@angular/common';
import jsPDF from "jspdf";
import QRCode from "qrcode";

@Component({
  selector: 'app-card-capacitacion',
  templateUrl: './card-capacitacion.component.html',
  styleUrls: ['./card-capacitacion.component.css']
})
export class CardCapacitacionComponent implements OnInit {
  fileEndpoint: String = environment.apiUrl+'/files/getUrl?pathfile=';

  dataSave = null;
  pathPerfil = '';
  pathPortada = '';

  today = new Date();
  startDate: Date;
  endDate: Date;
  show = true;
  showCancel = false;


  usuarioCapacitacion: any = null;
  terminada: Boolean = false;
  textoBoton = 'Continuar';

  @Input() capacitacion: CapacitacionModel;
  //Tipo 1 = Capacitación disponible, Tipo 2 = Capacitación registrada
  @Input() tipo: Number;
  @Output() reload: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private router: Router,
    private capacitacionesService: CapacitacionesService,
    public scriptGL: ScriptsGlobalService,
    private dialog: MatDialog,
    private aulaService: AulaService,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.getMultimedia();
    this.startDate = new Date(this.capacitacion.fechaInicio);
    this.endDate = new Date(this.capacitacion.fechaFin);

    //if(this.tipo == 2){
      this.recuperarEstado();
    //}
  }

  async recuperarEstado(){
    this.aulaService.validarAcceso(this.capacitacion.id,this.scriptGL.getUserSessionData().idUsuario).subscribe(data => {      
      if (data) {
        this.show = false;
        this.showCancel = true;
        this.usuarioCapacitacion = data;
        if (this.usuarioCapacitacion.concluyo == true) {
          this.textoBoton = 'Consultar';
          this.terminada = true;
        }else if (this.today.getTime() > this.endDate.getTime()) {
          this.textoBoton = 'Consultar';
        }
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
    });
  }

  async confirmarRegistro(){
    // const dialogRef = this.dialog.open(ConfirmarModalComponent,{
    //   data: {
    //     id: '',
    //     etiqueta: "registrarse en la capacitación",
    //     nombre: '"' + this.capacitacion.nombre + '"',
    //     isRechazar: false,
    //     isVerMotivo: false,
    //     motivoRechazo: ''
    //   }
    // });
    // await dialogRef.afterClosed().subscribe(async result=>{
    //   if(result){
        this.registrarUsuarioACapacitacion();
    //   }
    // });
  }

  registrarUsuarioACapacitacion() {
    this.show = false;
    //this.usuariosService.findById(this.scriptGL.getUserSessionData().idUsuario).subscribe(
      //data=>{
        //if(data){
          this.dataSave = {};
          //this.dataSave.usuario = data;
          this.dataSave.capacitacion = this.capacitacion;
          this.dataSave.fechaRegistro = new Date();
          this.dataSave.createdAt = new Date();
          this.capacitacionesService.createUsuarioCapacitacion(this.dataSave).subscribe(data => {
            if (data) {
              if (data == "Capacitación Registrada") {
                this.scriptGL.printSnackbar(15, 1, null, data, 5, false, null, null);
              }else{
                this.scriptGL.printGuardarSnackBar(data);              
                //TODO: SEND TO CAPACITACION IF IS ACTIVE
                // window.location.reload();
                this.reload.emit(true);
              }              
            } else {
              this.show = true;
              this.scriptGL.printSnackbar(12, null, null, null, 5, false, null, null);
            }
          }, error => {
            this.show = true;
            this.scriptGL.printErrorSnackBar(error);
          });
        //} else {
        //  this.show = true;
        //  this.scriptGL.printSnackbar(15,1,null,'Error al consultar los datos, intentelo de nuevo',2,false,null,null);
        //}
      //},error=> {
        //this.show = true;
        //this.scriptGL.printErrorSnackBar(error);
      //}
    //);
  }

  async cancelarRegistro(){
    // const dialogRef = this.dialog.open(ConfirmarModalComponent,{
    //   data: {
    //     id: '',
    //     etiqueta: "cancelar el registro en la capacitación",
    //     nombre: '"' + this.capacitacion.nombre + '"',
    //     isRechazar: false,
    //     isVerMotivo: false,
    //     motivoRechazo: ''
    //   }
    // });
    // await dialogRef.afterClosed().subscribe(async result=>{
    //   if(result){
        this.cancelarUsuarioACapacitacion();
    //   }
    // });
  }

  cancelarUsuarioACapacitacion() {
    this.show = false;
          this.capacitacionesService.cancelUsuarioCapacitacion(this.usuarioCapacitacion ).subscribe(data => {
            if (data) {
              this.show = true;
              this.showCancel = false;
              this.reload.emit(true);           
              this.scriptGL.printSnackbar(15, 1, null, "Registro en la cacpcitación cancelada!", 5, false, null, null);            
            }
          }, error => {
            this.show = true;
            this.scriptGL.printErrorSnackBar(error);
          });

  }  

  getMultimedia(){
    if(this.capacitacion.portada != ''){
      this.pathPortada = this.fileEndpoint+this.capacitacion.portada;
    }
    if(this.capacitacion.imagenPerfil != ''){
      this.pathPerfil = this.fileEndpoint+this.capacitacion.imagenPerfil;
    }
  }

  irAAula() {
    this.router.navigate(['/audienciaCapacitaciones/aula/'+this.capacitacion.id]);
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
      case 1: return 'Capacitación virtual asíncrona por invitación';
      case 2: return 'Capacitación virtual asíncrona pública';
      case 3: return 'Capacitación virtual síncrona por invitación';
      case 4: return 'Capacitación virtual síncrona pública';
      case 5: return 'Capacitación presencial por invitación';
      case 6: return 'Capacitación presencial pública';
      default: return '';
    }
  }

  descargarConstancia(){

    QRCode.toDataURL(window.location.origin  + '/capacitaciones/validarQR/' + this.usuarioCapacitacion.uuidFinalizado)
    .then(url => {
      const doc = new jsPDF({
        orientation: "l",
        format: "letter"
      });
      doc.setFontSize(20);
      doc.text("La Secretaría de Desarrollo Económico y Portuario", 139.5, 15,{align: 'center'});
      doc.text("y", 139.5, 24,{align: 'center'});
      doc.text("La subsecretaría de Industria, Atracción de Inversiones, Comercio Exterior y Proyectos estratégicos", 139.5, 33,{align: 'center',maxWidth: 230});
      doc.setFontSize(17);
      doc.text("Otorgan la presente", 139.5, 60,{align: 'center'});
      doc.setFontSize(55);
      doc.text("CONSTANCIA", 139.5, 80,{align: 'center'});
      doc.setFontSize(17);
      doc.text("A:", 139.5, 92,{align: 'center'});
      doc.setFontSize(25);
      doc.text(this.usuarioCapacitacion.usuario.nombreCompleto, 139.5, 105,{align: 'center'});
      doc.setFontSize(17);
      doc.text("Por haber concluido satisfactoriamente la capacitación virtual intitulada:", 139.5, 117, {align: 'center', maxWidth: 230})
      doc.setFontSize(25);
      doc.text(this.usuarioCapacitacion.capacitacion.nombre, 139.5, 132, {align: "center", maxWidth: 230});
      doc.setFontSize(17);
      doc.text("Impartida a través de la Plataforma Electrónica para el Fomento del Comercio Exterior del Estado de Veracruz entre el "+ this.datepipe.transform(this.usuarioCapacitacion.capacitacion.fechaInicio, 'd \'de\' MMMM \'de\' yyyy') +" y el "+ this.datepipe.transform(this.usuarioCapacitacion.capacitacion.fechaFin, 'd \'de\' MMMM \'de\' yyyy'), 139.5, 145, {align: 'center', maxWidth: 230})
      doc.setFontSize(17);
      doc.text("Xalapa, Ver. a "+ this.datepipe.transform(this.usuarioCapacitacion.updatedAt, 'd \'de\' MMMM \'de\' yyyy'), 139.5, 165, {align: 'center', maxWidth: 230})
      doc.text("Firmante uno", 69.75, 200, {align: 'center', maxWidth: 230})
      doc.text("Firmante dos", 209.25, 200, {align: 'center', maxWidth: 230})
      doc.setFontSize(8);
      doc.text("Validación", 260.5, 178, {align: 'center'});
      doc.addImage(url,"JPG",243,180,35,35);
      doc.save("constancia.pdf");
    })
    .catch(err => {
      console.error(err)
    })
  }
}

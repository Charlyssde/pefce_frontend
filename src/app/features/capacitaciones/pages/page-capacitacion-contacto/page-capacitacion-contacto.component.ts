import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';
import { EmailService } from 'src/app/common/email.service';
@Component({
  selector: 'app-page-capacitacion-contacto',
  templateUrl: './page-capacitacion-contacto.component.html',
  styleUrls: ['./page-capacitacion-contacto.component.css']
})
export class PageCapacitacionContactoComponent implements OnInit {

  @Input() idCapacitacion: number;
  @Output() contactos: EventEmitter<Array<any>> = new EventEmitter();

  displayedColumns: string[] = [ 'nombre', 'correo', 'notificado', 'termino', 'fechaRegistro', 'fechaTermino', 'constancia'];
  dataSource = null;
  isCharge = false;
  cargando = false;
  cargandoTexto = 'Enviando correo, por favor espere.';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: CapacitacionesService,
    public scriptGL: ScriptsGlobalService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    if(this.idCapacitacion && this.idCapacitacion != 0){
      this.getPage(this.idCapacitacion);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getPage(idCapacitacion: number) {
    await this.service.pageUsuariosByIdCapacitacion(idCapacitacion).subscribe(data => {

      if (data.length > 0) {
        this.contactos.emit(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.scriptGL.printSnackbar(2, 1, 'capacitaciones', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }
  
  async actualizarConstancia(idContacto: any){
    await this.service.actualizaConstancia(idContacto).subscribe(data => {
      if (data.length > 0) {

      } else {

        this.scriptGL.printSnackbar(2, 1, 'capacitaciones', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }
  /*
  async enviarCorreo(correo: string){
    this.cargando = true;
    if(correo){
      await this.emailService.sendEmailWithDestinosAndMensajeToFrontEnd([correo], 'PEFCE - Recuperación de contraseña', this.mensajeCorreo()).subscribe(async data2=> {
        this.scriptGL.printSnackbar(15,null,null,'Se envió el correo con éxito.',5,false,null,null);
        this.cargando = false;
      });
      this.cargando = false;
    } else {
      this.scriptGL.printSnackbar(15, null, null, 'No hay un correo para enviar', 5, false, null, null);
      this.cargando = false;
    }
  }

  
  mensajeCorreo(){
    return "Estimado usuario:" +
    "\n\nEstás recibiendo este correo porque hiciste una solicitud de recuperación de contraseña para tu cuenta." +
    "\nA continuación le adjuntamos su contraseña temporal, favor de actualizarla después de acceder a la plataforma en el apartado 'Mi Perfil'.";
  }
  */
}

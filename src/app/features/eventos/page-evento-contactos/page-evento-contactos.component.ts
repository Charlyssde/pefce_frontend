import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EventosService } from 'src/app/features/eventos/service/eventos.service';
import { EmailService } from 'src/app/common/email.service';

@Component({
  selector: 'app-page-evento-contactos',
  templateUrl: './page-evento-contactos.component.html',
  styleUrls: ['./page-evento-contactos.component.css']
})
export class PageEventoContactosComponent implements OnInit {

  @Input() idEvento: number;
  @Output() contactos: EventEmitter<Array<any>> = new EventEmitter();

  //displayedColumns: string[] = [ 'nombre', 'correo', 'notificado', 'termino', 'fechaRegistro', 'fechaTermino', 'enviarCorreo'];
  displayedColumns: string[] = [ 'nombre', 'correo', 'enviarCorreo'];
  dataSource = null;
  isCharge = false;
  cargando = false;
  cargandoTexto = 'Enviando correo, por favor espere.';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialogRef: MatDialogRef<PageEventoContactosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,       
    private service: EventosService,
    public scriptGL: ScriptsGlobalService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
    this.idEvento = this.data.evento.id;

    if(this.idEvento && this.idEvento != 0){
      this.getPage(this.idEvento);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getPage(idEvento: number) {    
    //await this.service.pageUsuariosByIdEvento(idEvento).subscribe(data => {
    this.service.findById(idEvento).subscribe(data => {

      if (data.usuarios.length > 0) {
        this.contactos.emit(data.usuarios);
        this.dataSource = new MatTableDataSource(data.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.scriptGL.printSnackbar(2, 1, 'eventos', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

  async enviarCorreo(correo: string){
    const formData = new FormData();
        
    formData.append("evento", JSON.stringify(this.data.evento) );
    formData.append("correo", this.mensajeCorreo() );

    this.service.enviarCorreo(formData).subscribe(data => {
      this.scriptGL.printSnackbar(15,null,null,'Se envió el correo con éxito.',5,false,null,null);
      this.cargando = false;
      this.cargando = false;
    });
    // this.cargando = true;
    // if(correo){      
    //   this.emailService.sendEmailWithDestinosAndMensajeToFrontEnd([correo], 'PEFCE - Registro al evento - ' + this.data.nombreEvento , this.mensajeCorreo()).subscribe(async data2=> {
    //     this.scriptGL.printSnackbar(15,null,null,'Se envió el correo con éxito.',5,false,null,null);
    //     this.cargando = false;
    //   });
    //   this.cargando = false;
    // } else {
    //   this.scriptGL.printSnackbar(15, null, null, 'No hay un correo para enviar', 5, false, null, null);
    //   this.cargando = false;
    // }
  }

  mensajeCorreo(){
    return "Estimado usuario:" +
    "\n\nEstás recibiendo este correo porque realizaste el registro al evento: " + this.data.nombreEvento +
    "\n A continuación enviamos los datos del evento. <br><br>" +
    "\n Evento: " + this.data.nombreEvento + 
    "\n Fecha y hora: " + new Date(this.data.fechaInicio) + 
    "\n Modalidad: " + this.data.modalidad +
    "\n Sede: " + this.data.sede;
  }
}
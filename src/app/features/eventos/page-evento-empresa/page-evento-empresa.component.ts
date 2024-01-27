import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EmailService } from 'src/app/common/email.service';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EventosService } from '../service/eventos.service';

@Component({
  selector: 'app-page-evento-empresa',
  templateUrl: './page-evento-empresa.component.html',
  styleUrls: ['./page-evento-empresa.component.css']
})
export class PageEventoEmpresaComponent implements OnInit {

  @Input() idEvento: number;
  @Output() directorios: EventEmitter<Array<any>> = new EventEmitter();

  displayedColumns: string[] = ['nombreLegal', 'rfc', 'correo', 'telefono', 'sectorPrincipal', 'tipoEmpresa', 'estatus','enviarCorreo'];
  dataSource = null;
  isCharge = false;
  cargando = false;
  cargandoTexto = 'Enviando correo, por favor espere.';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: EventosService,
    public scriptGL: ScriptsGlobalService,
    private emailService: EmailService
  ) { }

  ngOnInit() {
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
    await this.service.pageDirectoriosByIdEvento(idEvento).subscribe(data => {
      if (data.length > 0) {
        data = data.filter(e => e.estatus === 'aceptada');
        this.directorios.emit(data);
        this.dataSource = new MatTableDataSource(data);
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
    this.cargando = true;
    if(correo){
      /*
      await this.emailService.sendEmailWithDestinosAndMensajeToBackend([correo], 'mensaje prueba', 'prueba de mensaje').subscribe(data=>{

        if(data){
          this.scriptGL.printSnackbar(15, null, null, 'Correo enviado con éxito a ' + correo + '.', 5, false, null, null);
          this.cargando = false;
        }
        this.cargando = false;
      });
      */
    } else {
      this.scriptGL.printSnackbar(15, null, null, 'No hay un correo para enviar', 5, false, null, null);
      this.cargando = false;
    }
  }
}

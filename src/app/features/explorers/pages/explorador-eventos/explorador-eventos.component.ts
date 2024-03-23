import { environment } from 'src/environments/environment';
import { RegistroEventoComponent } from './detalles-evento/registro-evento/registro-evento.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EventosService } from 'src/app/features/eventos/service/eventos.service';
import { EventosFeriasService } from './services/eventos-ferias.service';
import { VerVideoEventoComponent } from './detalles-evento/ver-video-evento/ver-video-evento.component';
import { AppComponent } from 'src/app/app.component';
import { NavigationComponent } from 'src/app/layouts/navigation/navigation.component';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';
import { ModalRegistroEventosComponent } from '../../components/modal-registro-eventos/modal-registro-eventos.component';

@Component({
  selector: 'app-explorador-eventos',
  templateUrl: './explorador-eventos.component.html',
  styleUrls: ['./explorador-eventos.component.css']
})
export class ExploradorEventosComponent implements OnInit {
  filesEndpoint: string = environment.apiUrl + '/files/getUrl?pathfile=';
 

  listaEventos = [];
  listaUsuarioEventos = [];
  idUsuario: number = null;
  perfilUsuario: string = null;
  idDirectorioEmpresarial: number = null;
  usuarioEmpresa: any = null;

  constructor(
    private efServ: EventosFeriasService,
    private evServ: EventosService,
    public lib: ScriptsGlobalService,
    public dialog: MatDialog,
    private encuestasService: AdministracionEncuestasService,
  ) { }

  ngOnInit() {
    this.idUsuario = this.lib.getUserSessionData().idUsuario;
    this.perfilUsuario = this.lib.getUserSessionData().perfil.nombre;
    this.getEventos();
  }

  onRegisterToEvent(evento){
  }

  tabChanged(event: MatTabChangeEvent) {
    console.log('Tab changed:', event.tab.textLabel);
    // You can perform actions here when a tab is changed
  }

  async getEventos() {
    await this.evServ.page().subscribe((resp) => {
      this.listaEventos = [];
      this.listaUsuarioEventos = []
      if (resp) {
        resp.sort((a, b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime());
        resp.forEach((r) => {
            let exists = r.usuarios.some((x:any) => x.id = this.idUsuario);
            console.log(exists)
            if(exists) {
              this.listaUsuarioEventos.push(r);
            }else{
              this.listaEventos.push(r)
            }
        });
        this.listaEventos.forEach((val, i) => {
          if (val.pathfileCover !== null) {
            val.pathfileCover = val.archivo.length > 0 ? this.filesEndpoint + val.archivo[0].url : null;
          }
          if (val.pathfileVideo !== null) {
            val.pathfileVideo = this.filesEndpoint + val.pathfileVideo;
          }
        });
        this.listaUsuarioEventos.forEach((val, i) => {
          if (val.pathfileCover !== null) {
            val.pathfileCover = val.archivo.length > 0 ? this.filesEndpoint + val.archivo[0].url : null;
          }
          if (val.pathfileVideo !== null) {
            val.pathfileVideo = this.filesEndpoint + val.pathfileVideo;
          }
        });
      }
      else {
        this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar obtener la información", 5, false, null, null);
      }
    }, (error) => {
      this.lib.printSnackbar(15, null, null, "Error de servidor", 5, false, null, null);
    });
  }


  verBotonRegistro(evento): Boolean {
    let ver = false;
    let enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0 ? evento.usuarios.some((e) => e.id === this.idUsuario) : false;
    if (new Date(evento.fechaInicio).getTime() > new Date().getTime())
      if (!enEventosEmpresa)
        ver = true;
    return ver;
  }

  verBotonCancelar(evento): Boolean {
    let
      ver = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0 ? evento.usuarios.some((e) => e.id === this.idUsuario) : false;
    return ver;
  }

  verLabelPublicoIngresar(evento): Boolean {
    console.log("Evento->", evento)
    let
      ver = false,
      enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0 ? evento.usuarios.some((e) => e.id === this.idUsuario) : true;

    if (evento.privacidad === "publico")
      if (enEventosEmpresa)
        ver = true;

    return ver;
  }

  obtenerMensajeEstatus(evento): String {
    let
      estatus = "",
      data = this.listaUsuarioEventos.filter((el) => el.evento.id === evento.id)[0];
    estatus = this.lib.eEstatusEmpresaEvento[data.estatus];

    return estatus;
  }

  verBotonExplorar(evento): Boolean {
    return (evento.privacidad === "publico");
  }

  verVideo(evento, video) {
    const dialogRef = this.dialog.open(VerVideoEventoComponent, {
      width: '70%',
      data: {
        evento: evento,
        video: video
      },
    });
  }

  registroEvento(usuarioEmpresa, evento) {
      let ref = this.dialog.open(ModalRegistroEventosComponent, {
        data: {id : evento.id},
        width : '750px',
        height : '450px'
      });
      ref.afterClosed().subscribe((result) => {
        let
      eventoEmpresaModel = {
        id: null,
        evento: evento,
        directorio: null,//usuarioEmpresa.empresa,
        activo: true,
        createdAt: new Date(),
        updatedAt: null,
        estatus: "En espera",
        males: result.males,
        females: result.females,
        municipio:   result.municipio
      };
        this.evServ.createEventoDirectorio(eventoEmpresaModel).subscribe((resp) => {
          if (resp) {
            this.lib.printSnackbar(15, null, null, 'Su registro al evento ' + evento.nombreEvento + ' se realizó con éxito', 5, false, null, null);
            this.getEventos();
          }
          else {
            this.lib.printSnackbar(15, null, null, 'Ocurrió un problema al intentar crear el registro al evento', 5, false, null, null);
          }
        }, (error) => {
          console.log("error ->", error)
          this.lib.printSnackbar(15, null, null, 'Error de servidor', 5, false, null, null);
        });
      });

  }

  async cancelarEvento(usuarioEmpresa, evento) {

    let
      eventoEmpresaModel = {
        id: null,
        evento: evento,
        directorio: null,//usuarioEmpresa.empresa,
        activo: true,
        createdAt: new Date(),
        updatedAt: null,
        estatus: "en espera"
      };

    await this.evServ.cancelarEvento(eventoEmpresaModel).subscribe((resp) => {
      if (resp) {
        this.lib.printSnackbar(15, null, null, 'Su registro al evento ' + evento.nombreEvento + ' se cancelo con éxito', 5, false, null, null);
      }
      else {
        this.lib.printSnackbar(15, null, null, 'Ocurrió un problema al intentar cancelar el registro al evento', 5, false, null, null);
      }
    }, (error) => {
      this.lib.printSnackbar(15, null, null, 'Error de servidor', 5, false, null, null);
    });


  }

  descargarEncuesta(/*pdfURI: string*/) {
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

  verLabelPrivadoIngresar(evento): Boolean {
    let
      ver = false,
      enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0 ? evento.usuarios.some((e) => e.id === this.idUsuario) : true;

    if (evento.privacidad === "privado")
      if (enEventosEmpresa)
        ver = true;

    return ver;
  }

  verBotonPrivadoVirtualIngresar(evento): Boolean {
    return true;
    let
      ver = false,
      enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

    if(evento.privacidad === "privado")
      if(evento.modalidad === "virtual")
        if(enEventosEmpresa)
          ver = true;

    return ver;
  }

  verBotonPublicoVirtualRegistro(evento) : Boolean{
  let
    ver = false,
    enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

  if(evento.privacidad === "publico")
    if(evento.modalidad === "virtual")
      if(new Date(evento.fechaInicio).getTime() > new Date().getTime())
        if(!enEventosEmpresa)
          ver = true;

  return ver;
}

  verBotonPublicoVirtualIngresar(evento): Boolean{
  let
    ver = false,
    enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

  if(evento.privacidad === "publico")
    if(evento.modalidad === "virtual")
      if(enEventosEmpresa)
        ver = true;

  return ver;
}

}


// verBotonPrivadoVirtualRegistro(evento) : Boolean{
//   let
//     ver = false,
//     enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

//   if(evento.privacidad === "privado")
//     if(evento.modalidad === "virtual")
//       if(new Date(evento.fechaInicio).getTime() > new Date().getTime())
//         if(!enEventosEmpresa)
//           ver = true;

//   return ver;
// }

// verBotonPrivadoPresencialRegistrar(evento): Boolean{
//   let
//     ver = false,
//     enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

//   if(evento.privacidad === "privado")
//     if(evento.modalidad === "presencial")
//       if(new Date(evento.fechaInicio).getTime() > new Date().getTime())
//         if(!enEventosEmpresa)
//           ver = true;

//   return ver;
// }

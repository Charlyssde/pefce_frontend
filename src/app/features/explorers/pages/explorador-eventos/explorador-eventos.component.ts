import { environment } from 'src/environments/environment';
import { RegistroEventoComponent } from './detalles-evento/registro-evento/registro-evento.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EventosService } from 'src/app/features/eventos/service/eventos.service';
import { EventosFeriasService } from './services/eventos-ferias.service';
import { VerVideoEventoComponent } from './detalles-evento/ver-video-evento/ver-video-evento.component';
import { AppComponent } from 'src/app/app.component';
import { NavigationComponent } from 'src/app/layouts/navigation/navigation.component';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';

@Component({
  selector: 'app-explorador-eventos',
  templateUrl: './explorador-eventos.component.html',
  styleUrls: ['./explorador-eventos.component.css']
})
export class ExploradorEventosComponent implements OnInit {
  filesEndpoint: string = environment.apiUrl+'/files/getUrl?pathfile=';

  listaEventos = null;
  listaUsuarioEventos = null;
  idUsuario:number = null;
  perfilUsuario: string = null;
  idDirectorioEmpresarial:number = null;
  usuarioEmpresa: any = null;

  constructor(
    private efServ: EventosFeriasService,
    private evServ: EventosService,
    public lib: ScriptsGlobalService,
    public dialog: MatDialog,
    private encuestasService: AdministracionEncuestasService
  ) { }

  ngOnInit() {
    this.idUsuario = this.lib.getUserSessionData().idUsuario;
    this.perfilUsuario = this.lib.getUserSessionData().perfil.nombre;
    
    //if(this.perfilUsuario === 'Empresa'){
      //this.getDirectorioEmpresarialByUsuario(this.idUsuario);
    //}
    //else{
      this.getEventos();
    //}
  }

  /*
  async getDirectorioEmpresarialByUsuario(idUsuario){
    this.dirEmServ.findEmpresaByUsuarioId(idUsuario).subscribe((resp) => {
      if(resp){
        this.usuarioEmpresa = resp;
        this.idDirectorioEmpresarial = resp.empresa.id;
        this.getEventosByUsuario(this.idUsuario);
      }
      else{
        this.lib.printSnackbar(15,null,null,"Ocurrió un error al intentar obtener la información",5,false,null,null);
      }
    }, (error) => {
      this.lib.printSnackbar(15,null,null,"Error de servidor",5,false,null,null);
    });
  }
  */
  async getEventosByUsuario(idUsuario) {
    await this.evServ.findByIdUsuario(idUsuario).subscribe((resp) => {
      if(resp){
        this.listaUsuarioEventos = resp;
        this.getEventos();
      }
      else{
        this.lib.printSnackbar(15,null,null,"Ocurrió un error al intentar obtener la información",5,false,null,null);
      }
    }, (error) => {
      this.lib.printSnackbar(15,null,null,"Error de servidor",5,false,null,null);
    });
  }

  async getEventos() {
    await this.evServ.page().subscribe((resp) => {
      if(resp){
        resp.sort((a,b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime());
        this.listaEventos = resp;
        this.listaEventos.forEach((val, i) => {          
          if (val.pathfileCover !== null) {
            val.pathfileCover = val.archivo.length > 0 ? this.filesEndpoint+val.archivo[0].url : null;
          }
          if(val.pathfileVideo !== null){
            val.pathfileVideo = this.filesEndpoint+val.pathfileVideo;
          }
        });
      }
      else{
        this.lib.printSnackbar(15,null,null,"Ocurrió un error al intentar obtener la información",5,false,null,null);
      }
    }, (error) => {
      this.lib.printSnackbar(15,null,null,"Error de servidor",5,false,null,null);
    });
  }


  verBotonRegistro(evento): Boolean{
    let
      ver = false,
      enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : false;
        if(new Date(evento.fechaInicio).getTime() > new Date().getTime())
          if(!enEventosEmpresa)
            ver = true;
    return ver;
  }

  verBotonCancelar(evento): Boolean{
    let
      ver = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : false;
    return ver;
  }

  verLabelPublicoIngresar(evento): Boolean{
    let
      ver = false,
      enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

    if(evento.privacidad === "publico")
        if(enEventosEmpresa)
          ver = true;

    return ver;
  }

  obtenerMensajeEstatus(evento): String{
    let
      estatus = "",
      data = this.listaUsuarioEventos.filter((el) => el.evento.id === evento.id)[0];
    estatus = this.lib.eEstatusEmpresaEvento[data.estatus];

    return estatus;
  }

  verBotonExplorar(evento) : Boolean{
    return (evento.privacidad === "publico");
  }

  verVideo(evento,video){
    const dialogRef = this.dialog.open(VerVideoEventoComponent, {
      width: '70%',
      data: {
        evento:evento,
        video: video
      },
    });
  }

  registroEvento(usuarioEmpresa,evento){
    let
      eventoEmpresaModel = {
        id: null,
        evento: evento,
        directorio: null,//usuarioEmpresa.empresa,
        activo: true,
        createdAt: new Date(),
        updatedAt: null,
        estatus: "En espera"
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
      this.lib.printSnackbar(15, null, null, 'Error de servidor', 5, false, null, null);
    });

  }

  async cancelarEvento(usuarioEmpresa,evento){

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

  verLabelPrivadoIngresar(evento): Boolean{
    let
      ver = false,
      enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

    if(evento.privacidad === "privado")
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

  // verBotonPrivadoVirtualIngresar(evento): Boolean{

  //   let
  //     ver = false,
  //     enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

  //   if(evento.privacidad === "privado")
  //     if(evento.modalidad === "virtual")
  //       if(enEventosEmpresa)
  //         ver = true;

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



  // verBotonPublicoVirtualRegistro(evento) : Boolean{
  //   let
  //     ver = false,
  //     enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

  //   if(evento.privacidad === "publico")
  //     if(evento.modalidad === "virtual")
  //       if(new Date(evento.fechaInicio).getTime() > new Date().getTime())
  //         if(!enEventosEmpresa)
  //           ver = true;

  //   return ver;
  // }

  // verBotonPublicoVirtualIngresar(evento): Boolean{
  //   let
  //     ver = false,
  //     enEventosEmpresa = this.perfilUsuario === 'Empresa' && evento.usuarios.length > 0  ? evento.usuarios.some((e) => e.id === this.idUsuario ) : true;

  //   if(evento.privacidad === "publico")
  //     if(evento.modalidad === "virtual")
  //       if(enEventosEmpresa)
  //         ver = true;

  //   return ver;
  // }
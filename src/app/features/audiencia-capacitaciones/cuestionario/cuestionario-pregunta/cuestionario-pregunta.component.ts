import { environment } from '../../../../../environments/environment';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PreguntaModel } from 'src/app/core/models/capacitaciones/pregunta-model';
import { AdministracionWebService } from 'src/app/features/administracion-pagina-contenido/services/administracion-web.service';
import { PreguntasService } from 'src/app/features/capacitaciones/preguntas/service/preguntas.service';
import { UsersService } from 'src/app/features/users/services/users.service';

interface respuestas {
  value: string;
  viewValue: string;
}

interface UsuarioRespuesta {
  usuario: any;
  pregunta: any;
  respuesta: string;
  createdAt: any;
  updatedAt: any;
}

@Component({
  selector: 'app-cuestionario-pregunta',
  templateUrl: './cuestionario-pregunta.component.html',
  styleUrls: ['./cuestionario-pregunta.component.css']
})
export class CuestionarioPreguntaComponent implements OnInit {
  fileEndpoint: string = environment.apiUrl+'/files/getUrl?pathfile=';

  @Input() pregunta: PreguntaModel;
  pathRecurso: String = "";
  usuarioRespuesta: UsuarioRespuesta = null;
  valueRespuesta = '';
  nuevaRespuesta = false;
  respuestas: respuestas[] = [
    {value: 'A', viewValue: 'Pregunta A'},
    {value: 'B', viewValue: 'Pregunta B'},
    {value: 'C', viewValue: 'Pregunta C'},
    {value: 'D', viewValue: 'Pregunta D'}
  ]

  constructor(
    private awService: AdministracionWebService,
    private usuarioService: UsersService,
    private preguntasService: PreguntasService,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
    this.getMultimedia();
    //this.usuarioService.findById(this.scriptGL.getUserSessionData().idUsuario).subscribe((resp) => {
      //resp.contrasena = null;
      this.usuarioRespuesta = {
        //usuario: resp,
        usuario : null,
        pregunta: this.pregunta,
        respuesta: '',
        createdAt: null,
        updatedAt: null
      }
    //});
    this.getRespuestaAnterior();
  }

  getRespuestaAnterior(){
    this.preguntasService.findByPreguntaIdAndUsuarioId(this.pregunta.id,this.scriptGL.getUserSessionData().idUsuario).subscribe((resp) => {
      if(resp){
        this.usuarioRespuesta = resp;
        this.valueRespuesta = resp.respuesta;
      }
    });
  }

  getMultimedia(){
    if(this.pregunta.recurso != ''){
      this.pathRecurso = (this.pathRecurso && this.pathRecurso !== '') ? this.fileEndpoint+this.pathRecurso : null;
    }
  }

  actualizarRespuesta(valor){
    this.usuarioRespuesta.respuesta = valor;
    this.nuevaRespuesta = true;
  }
}

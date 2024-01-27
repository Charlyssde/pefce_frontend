import { Component, Input, OnInit } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PreguntaModel } from 'src/app/core/models/capacitaciones/pregunta-model';
import { PreguntasService } from 'src/app/features/capacitaciones/preguntas/service/preguntas.service';

@Component({
  selector: 'app-progreso-preguntas',
  templateUrl: './progreso-preguntas.component.html',
  styleUrls: ['./progreso-preguntas.component.css']
})
export class ProgresoPreguntasComponent implements OnInit {

  @Input() preguntas: Array<PreguntaModel>;
  countPreguntasRespondidas = 0;
  countPreguntasCorrectas = 0;
  countPreguntasErroneas = 0;
  progreso = 0;

  constructor(
    private preguntasService: PreguntasService,
    private scriptGL: ScriptsGlobalService,
  ) { }

  ngOnInit() {
    this.getRespuestasAnteriores();
  }

  getRespuestasAnteriores(){
    this.preguntas.forEach(pregunta => {
      this.preguntasService.findByPreguntaIdAndUsuarioId(pregunta.id,this.scriptGL.getUserSessionData().idUsuario).subscribe((resp) => {
        if(resp){
          this.countPreguntasRespondidas += 1;
          if (resp.pregunta.respuestaCorrecta == resp.respuesta) {
            this.countPreguntasCorrectas += 1;
          }else{
            this.countPreguntasErroneas += 1;
          }
        }
        this.calcularProgreso();
      });
    });
  }

  calcularProgreso(){
    this.progreso = Math.round((this.countPreguntasCorrectas * 100)/this.preguntas.length);
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {ScriptsGlobalService} from 'src/app/common/scripts-global.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AdministracionEncuestasService} from '../../../services/administracionencuestas.service';

@Component({
  selector: 'respuestas',
  templateUrl: './respuestas.html',
  styleUrls: ['./respuestas.css']
})

export class RespuestasComponent implements OnInit {

  preguntas: any[] = [];
  bdRespuestas: any[] = [];
  respuestas: any = {};
  opciones: { id: number, texto: string }[] = [
    {id: 1, texto: 'Muy buena'},
    {id: 2, texto: 'Buena'},
    {id: 3, texto: 'Deficiente'},
    {id: 4, texto: 'Muy deficiente'}];

  constructor(
    private admin: AdministracionEncuestasService,
    private scriptGL: ScriptsGlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RespuestasComponent>
  ) {
  }

  ngOnInit() {
    this.admin.getAllpreguntas(this.data.idEncuesta).subscribe(data => {
      this.preguntas = data;
    });

    this.recuperarRespuestas();
  }

  recuperarRespuestas() {
    this.admin.getRespuestasByUserAndEncuesta(this.data.idUser, this.data.idEncuesta).subscribe(data => {
      this.bdRespuestas = data;
      for (const respuesta of this.bdRespuestas) {
        const res = respuesta.respuesta.replace('_', ' ');
        console.log(res);
        const respuestaFind = this.opciones.find(opcion => opcion.texto.toUpperCase() === res);
        this.respuestas[respuesta.pregunta.id] = respuestaFind.id;
      }
    });
  }

  guardarRespuestas() {
    // Agregar las respuestas al arreglo de preguntas
    for (const pregunta of this.preguntas) {
      pregunta.respuesta = this.respuestas[pregunta.id];
    }

    // convertir el objecto de respuestas a un arreglo
    const respuestasToSave = Object.keys(this.respuestas).map(key => {
      return {
        pregunta: Number(key),
        respuesta: this.respuestas[key]
      };
    });

    // Guardar las respuestas
    this.admin.postRespuestas(this.data.idUser, this.data.idEncuesta, respuestasToSave).subscribe(data => {
      console.log({data});
    });

    this.recuperarRespuestas();
    this.dialogRef.close();
  }

}

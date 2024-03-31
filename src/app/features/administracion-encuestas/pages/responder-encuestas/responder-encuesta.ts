import { Component, OnInit } from '@angular/core';
import {ScriptsGlobalService} from '../../../../common/scripts-global.service';
import {AdministracionEncuestasService} from '../../services/administracionencuestas.service';
import {MatDialog} from '@angular/material/dialog';
import {RespuestasComponent} from './components/respuestas';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.html',
  styleUrls: ['./responder-encuesta.css']
})

export class ResponderEncuestaComponent implements OnInit {

  encuenstas: any;
  idUser: number;

  constructor(
    private scriptGL: ScriptsGlobalService,
    private service: AdministracionEncuestasService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.idUser = this.scriptGL.getUserSessionData().idUsuario;
    console.log(this.scriptGL.getUserSessionData());
    this.service.getEncuestasByUser(this.idUser).subscribe(data => {
      console.log(data);
      this.encuenstas = data;
    });
  }

  verEncuesta(idEncuesta: number) {
    console.log(idEncuesta);
    this.dialog.open(RespuestasComponent, {
      data: {
        idEncuesta: idEncuesta,
        idUser: this.idUser
      },
      width: '50%',
    });
  }
}

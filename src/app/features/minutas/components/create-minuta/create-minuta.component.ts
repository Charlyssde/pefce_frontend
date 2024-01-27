

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';
//import { SolicitudRespuestaEncuestasSatisfaccionComponent } from '../../../../features/encuestas-satisfaccion/solicitud-respuesta-encuestas-satisfaccion/solicitud-respuesta-encuestas-satisfaccion.component';
import { FormMinutaComponent } from '../form-minuta/form-minuta.component';
import { MinutasService } from '../../service/minutas.service';

const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-create-minuta',
  templateUrl: './create-minuta.component.html',
  styleUrls: ['./create-minuta.component.css']
})
export class CreateMinutaComponent implements OnInit {

  saltRounds = 10;
  dataSave: any;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormMinutaComponent) form: FormMinutaComponent;

  constructor(
    private service: MinutasService,
    public scriptGL: ScriptsGlobalService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  goToPage() {
    this.goPage.emit(true);
  }

  async save() {        
    /*if (this.form.validForm()) {
      const dialogRef = this.dialog.open(SolicitudRespuestaEncuestasSatisfaccionComponent, {
        width: '700px',
        data: 1,
      });
      dialogRef.afterClosed().subscribe(result => {*/
        //const usuarioActual = this.scriptGL.getUserSessionData();
        this.dataSave = this.form.formulario.getRawValue();
        this.dataSave.createdAt = new Date();
        this.dataSave.minutaTareas = [];
        this.dataSave.tareas = this.form.tareas;
        this.dataSave.minutaArchivos = this.form.archivos;
        this.dataSave.minutaTemas = [];
        this.dataSave.minutaUsuarios = [];

        this.form.temasPrev.forEach(element => {
          this.dataSave.minutaTemas.push(element);
        });
        delete this.dataSave.temas;

        this.form.participantesPrevSedecop.forEach(element => {
          delete element.perfiles;
          delete element.domicilios;
          this.dataSave.minutaUsuarios.push( element );
        });

        this.form.participantesPrevExternos.forEach(element => {
          delete element.perfiles;
          delete element.domicilios;
          this.dataSave.minutaUsuarios.push(element);
        });

        delete this.dataSave.participantes;
        delete this.dataSave.participante;
        delete this.dataSave.participanteSedecop;
        delete this.dataSave.participanteExternos;
        delete this.dataSave.idClase;
        delete this.dataSave.claseMinuta;

        this.service.create(this.dataSave).subscribe(data => {
          if (data) {
            this.scriptGL.printGuardarSnackBar(data);
            this.goToPage();
          } else {
            this.scriptGL.printSnackbar(1, null, null, null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
        });
   /*   });         
    } else {
      this.scriptGL.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }*/
  }

}

import { AppComponent } from 'src/app/app.component';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EventoModel } from 'src/app/core/models/eventos/eventos-model';
import { FormEventoComponent } from '../form-evento/form-evento.component';
import { EventosService } from '../service/eventos.service';

const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-create-evento',
  templateUrl: './create-evento.component.html',
  styleUrls: ['./create-evento.component.css']
})
export class CreateEventoComponent implements OnInit {

  saltRounds = 10;
  dataSave: EventoModel;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormEventoComponent) form: FormEventoComponent;

  constructor(
    private service: EventosService,
    private appC: AppComponent,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
  }

  goToPage() {
    this.goPage.emit(true);
  }

  async save() {
    this.appC.cargando = true;
    if (this.form.validForm() && this.form.validaFechasInicioYFin()) {
      this.dataSave = this.form.formulario.getRawValue();
      this.dataSave.fechaInicio = new Date(this.dataSave.fechaInicio.toString()+":00");
      this.dataSave.fechaFin = new Date(this.dataSave.fechaFin.toString()+":00");
      this.dataSave.activo = true;
      this.dataSave.createdAt = new Date();

      const formData = new FormData();
      
      
      formData.append("datosimagen", JSON.stringify( this.dataSave.archivoimagen ) );
      formData.append("archivoimagen", this.dataSave.archivo );

      this.dataSave.archivoimagen = null;
      this.dataSave.archivo = null;
      
      formData.append("evento", JSON.stringify(this.dataSave));      

      await this.service.create(formData).subscribe(data => {
        if (data) {
          this.scriptGL.printGuardarSnackBar(data);
          this.goToPage();
          this.appC.cargando = false;
        } else {
          this.scriptGL.printSnackbar(1, null, null, "Error", 5, false, null, null);
          this.appC.cargando = false;
        }
      }, (error) => {

        this.scriptGL.printSnackbar(1, null, null, "Error catch", 5, false, null, error);
        this.appC.cargando = false;
      });
    } else {
      this.scriptGL.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
      this.appC.cargando = false;
    }
  }

}

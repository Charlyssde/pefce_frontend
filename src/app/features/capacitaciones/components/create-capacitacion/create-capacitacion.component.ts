import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { FormCapacitacionComponent } from '../form-capacitacion/form-capacitacion.component';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';

const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-create-capacitacion',
  templateUrl: './create-capacitacion.component.html',
  styleUrls: ['./create-capacitacion.component.css']
})
export class CreateCapacitacionComponent implements OnInit {

  saltRounds = 10;
  dataSave: CapacitacionModel;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormCapacitacionComponent) form: FormCapacitacionComponent;

  constructor(
    private service: CapacitacionesService,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
  }

  goToPage() {
    this.goPage.emit(true);
  }

  async save() {
    if (this.form.validForm() && this.form.validaFechasInicioYFin()) {
      this.dataSave = this.form.formulario.getRawValue();
      this.dataSave.imagenPerfil = this.form.pathImagenPerfil;
      this.dataSave.portada = this.form.pathPortada;
      this.dataSave.activo = false;
      this.dataSave.createdAt = new Date();
      await this.service.create(this.dataSave).subscribe(data => {
        if (data) {
          this.scriptGL.printGuardarSnackBar(data);
          this.goToPage();
        } else {
          this.scriptGL.printSnackbar(1, null, null, null, 5, false, null, null);
        }
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
      });
    } else {
      this.scriptGL.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}

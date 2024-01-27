import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { FormCapacitacionComponent } from '../form-capacitacion/form-capacitacion.component';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';

const bcrypt = require('bcryptjs');
//prueba git
//prueba GIT
@Component({
  selector: 'app-update-capacitacion',
  templateUrl: './update-capacitacion.component.html',
  styleUrls: ['./update-capacitacion.component.css']
})
export class UpdateCapacitacionComponent implements OnInit, AfterViewInit {

  saltRounds = 10;
  dataSave: CapacitacionModel;
  formUpdate: CapacitacionModel;
  canUpdate = true;

  @Input() idForm: number;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormCapacitacionComponent) form: FormCapacitacionComponent;

  constructor(
    private service: CapacitacionesService,
    public scriptGL: ScriptsGlobalService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.idForm && this.idForm != 0) {
      this.service.findById(this.idForm).subscribe(data => {
        if (data) {
          this.formUpdate = data;
        } else {
          this.scriptGL.printSnackbar(15, 1, null, 'Error al consultar los datos, intentelo de nuevo', 2, false, null, null);
          this.canUpdate = false;
        }
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
        this.canUpdate = false;
      });
      this.cdRef.detectChanges();
    }
  }

  goToPage() {
    this.idForm = 0;
    this.goPage.emit(true);
  }

  async save() {
    if (this.form.validForm() && this.form.validaFechasInicioYFin()) {
      this.dataSave = this.form.formulario.getRawValue();
      this.dataSave.imagenPerfil = this.form.pathImagenPerfil;
      this.dataSave.portada = this.form.pathPortada;
      this.dataSave.activo = true;
      this.dataSave.updatedAt = new Date();
      await this.service.update(this.dataSave).subscribe(data => {
        if (data) {
          this.scriptGL.printEditarSnackBar(data);
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

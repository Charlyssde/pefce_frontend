import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';
import { FormModuloComponent } from '../form-modulo/form-modulo.component';
import { ModulosService } from '../service/modulos.service';

@Component({
  selector: 'app-create-modulo',
  templateUrl: './create-modulo.component.html',
  styleUrls: ['./create-modulo.component.css']
})
export class CreateModuloComponent implements OnInit {
  saltRounds = 10;
  dataSave: ModuloModel;
  
  @Input() capacitacion;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  
  @ViewChild(FormModuloComponent) form: FormModuloComponent;

  constructor(
    private service: ModulosService,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
  }

  goToPage() {
    this.goPage.emit(true);
  }

  async save() {
    if (this.form.validForm()) {
      this.dataSave = this.form.formulario.getRawValue();
      this.dataSave.capacitacion = this.capacitacion;
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

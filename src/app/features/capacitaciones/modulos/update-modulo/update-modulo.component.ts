import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';
import { FormModuloComponent } from '../form-modulo/form-modulo.component';
import { ModulosService } from '../service/modulos.service';

@Component({
  selector: 'app-update-modulo',
  templateUrl: './update-modulo.component.html',
  styleUrls: ['./update-modulo.component.css']
})
export class UpdateModuloComponent implements OnInit {
  saltRounds = 10;
  dataSave: ModuloModel;
  formUpdate: ModuloModel;
  canUpdate = true;

  @Input() idForm: number;
  @Input() capacitacion: CapacitacionModel;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormModuloComponent) form: FormModuloComponent;

  constructor(
    private service: ModulosService,
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
    if (this.form.validForm()) {
      this.dataSave = this.form.formulario.getRawValue();
      this.dataSave.capacitacion = this.capacitacion;
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

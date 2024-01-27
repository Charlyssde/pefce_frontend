import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PromocionDigitalModel } from 'src/app/core/models/promocion-digital/promocion-digital-model';
import { FormPromocionDigitalComponent } from '../form-promocion-digital/form-promocion-digital.component';
import { PromocionDigitalService } from '../../service/promocion-digital.service';

@Component({
  selector: 'app-create-promocion-digital',
  templateUrl: './create-promocion-digital.component.html',
  styleUrls: ['./create-promocion-digital.component.css']
})
export class CreatePromocionDigitalComponent implements OnInit {

  saltRounds = 10;
  dataSave: PromocionDigitalModel;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormPromocionDigitalComponent) form: FormPromocionDigitalComponent;
  isSaving: boolean = false;

  constructor(
    private service: PromocionDigitalService,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
  }

  goToPage() {
    this.goPage.emit(true);
  }

  async save() {
    if (this.form.validForm()) {
      this.isSaving = true;
      const usuarioActual = this.scriptGL.getUserSessionData();
      this.dataSave = this.form.formulario.getRawValue();
      this.dataSave.idUsuario = usuarioActual.idUsuario;
      this.dataSave.activo = true;
      this.dataSave.createdAt = new Date();
      this.dataSave.updatedAt = new Date();
      await this.service.create(this.dataSave).subscribe(data => {
        if (data) {
          this.scriptGL.printGuardarSnackBar(data);
          this.goToPage();
        } else {
          this.scriptGL.printSnackbar(1, null, null, null, 5, false, null, null);
        }
        this.isSaving = false;
      }, error => {
        this.isSaving = false;
        this.scriptGL.printErrorSnackBar(error);
      });
    } else {
      this.isSaving = false;
      this.scriptGL.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}

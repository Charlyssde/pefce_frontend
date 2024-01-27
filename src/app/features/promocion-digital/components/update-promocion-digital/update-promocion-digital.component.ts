import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PromocionDigitalModel } from 'src/app/core/models/promocion-digital/promocion-digital-model';
import { FormPromocionDigitalComponent } from '../form-promocion-digital/form-promocion-digital.component';
import { PromocionDigitalService } from '../../service/promocion-digital.service';

@Component({
  selector: 'app-update-promocion-digital',
  templateUrl: './update-promocion-digital.component.html',
  styleUrls: ['./update-promocion-digital.component.css']
})
export class UpdatePromocionDigitalComponent implements OnInit, AfterViewInit {

  saltRounds = 10;
  dataSave: PromocionDigitalModel;
  formUpdate: PromocionDigitalModel;
  canUpdate = true;
  mostrarLoader = true;

  @Input() idForm: number;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormPromocionDigitalComponent) form: FormPromocionDigitalComponent;

  constructor(
    private service: PromocionDigitalService,
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
        this.mostrarLoader = false;
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
        this.canUpdate = false;
        this.mostrarLoader = false;
      });
      this.cdRef.detectChanges();
    } else {
      this.mostrarLoader = false;
    }
  }

  goToPage() {
    this.idForm = 0;
    this.goPage.emit(true);
  }

  async save() {
    if (this.form.validForm()) {
      this.dataSave = this.form.formulario.getRawValue();
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

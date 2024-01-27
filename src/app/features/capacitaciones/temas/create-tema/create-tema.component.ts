import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { TemaModel } from 'src/app/core/models/capacitaciones/tema-model';
import { FormTemaComponent } from '../form-tema/form-tema.component';
import { TemasService } from '../service/temas.service';

@Component({
  selector: 'app-create-tema',
  templateUrl: './create-tema.component.html',
  styleUrls: ['./create-tema.component.css']
})
export class CreateTemaComponent implements OnInit {
  saltRounds = 10;
  dataSave: TemaModel;

  @Input() modulo;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(FormTemaComponent) form: FormTemaComponent;

  constructor(
    private service: TemasService,
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
      this.dataSave.recurso = this.form.pathRecurso;
      this.dataSave.modulo = this.modulo;
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

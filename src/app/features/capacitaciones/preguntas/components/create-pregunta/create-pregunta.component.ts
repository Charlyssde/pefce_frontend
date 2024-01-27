import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PreguntaModel } from 'src/app/core/models/capacitaciones/pregunta-model';
import { FormPreguntaComponent } from '../form-pregunta/form-pregunta.component';
import { PreguntasService } from '../../service/preguntas.service';

@Component({
  selector: 'app-create-pregunta',
  templateUrl: './create-pregunta.component.html',
  styleUrls: ['./create-pregunta.component.css']
})
export class CreatePreguntaComponent implements OnInit {
  saltRounds = 10;
  dataSave: PreguntaModel;

  @Input() tema;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormPreguntaComponent) form: FormPreguntaComponent;
  
  constructor(
    private service: PreguntasService,
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
      this.dataSave.tema = this.tema;
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

import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PreguntaModel } from 'src/app/core/models/capacitaciones/pregunta-model';
import { TemaModel } from 'src/app/core/models/capacitaciones/tema-model';
import { FormPreguntaComponent } from '../form-pregunta/form-pregunta.component';
import { PreguntasService } from 'src/app/features/capacitaciones/preguntas/service/preguntas.service';

@Component({
  selector: 'app-update-pregunta',
  templateUrl: './update-pregunta.component.html',
  styleUrls: ['./update-pregunta.component.css']
})
export class UpdatePreguntaComponent implements OnInit {
  saltRounds = 10;
  dataSave: PreguntaModel;
  formUpdate: PreguntaModel;
  canUpdate = true;

  @Input() idForm: number;
  @Input() tema: TemaModel;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormPreguntaComponent) form: FormPreguntaComponent;

  constructor(
    private service: PreguntasService,
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
      this.dataSave.recurso = this.form.pathRecurso;
      this.dataSave.tema = this.tema;
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

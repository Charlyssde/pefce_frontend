import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';
import { FormMinutaComponent } from '../form-minuta/form-minuta.component';
import { MinutasService } from 'src/app/features/minutas/service/minutas.service';
import { TasksService } from 'src/app/features/tasks/services/tasks.service';
import { MatSnackBar } from '@angular/material';
import { SharedServiceService } from 'src/app/shared/Shared/shared-service.service';

const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-update-minuta',
  templateUrl: './update-minuta.component.html',
  styleUrls: ['./update-minuta.component.css']
})
export class UpdateMinutaComponent implements OnInit, AfterViewInit {

  saltRounds = 10;
  dataSave: any;
  formUpdate: MinutaModel;
  canUpdate = true;

  @Input() idForm: number;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormMinutaComponent) form: FormMinutaComponent;

  constructor(
    private service: MinutasService,
    public scriptGL: ScriptsGlobalService,
    private cdRef: ChangeDetectorRef,
    private taskservice : TasksService,
    private snackBar: MatSnackBar,
    private sharedService: SharedServiceService
  ) { }

  ngOnInit() {
    this.taskservice.gettaskByminuta(this.idForm).subscribe(data => {
      if (data) {
        this.dataSave.minutaTareas = data;
      }
    }, error => {
      this.snackBar.open('Error.', 'Entendido', {duration : 3000 });
    });
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
    this.sharedService.emitGoToPage();
  }

  async save() {
    if (this.form.validForm()) {
      this.dataSave = this.form.formulario.getRawValue();
      this.dataSave.createdAt = new Date();
     // this.dataSave.minutaTareas = [];
      this.dataSave.tareas = this.form.tareas;
      this.dataSave.minutaArchivos = this.form.archivos;
      this.dataSave.minutaTemas = [];
      this.dataSave.minutaUsuarios = [];

      this.form.temasPrev.forEach(element => {
        this.dataSave.minutaTemas.push(element);
      });
      delete this.dataSave.temas;

      this.form.participantesPrevSedecop.forEach(element => {
        //delete element.perfiles;
        //delete element.domicilios;
        this.dataSave.minutaUsuarios.push( element );
      });

      this.form.participantesPrevExternos.forEach(element => {
        //delete element.perfiles;
        //delete element.domicilios;
        this.dataSave.minutaUsuarios.push(element);
      });

      delete this.dataSave.participantes;
      delete this.dataSave.participante;
      delete this.dataSave.participanteSedecop;
      delete this.dataSave.participanteExternos;
      delete this.dataSave.idClase;
      delete this.dataSave.claseMinuta;

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

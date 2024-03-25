import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alerts } from 'src/app/core/utils/alerts';
import { UsersService } from 'src/app/features/users/services/users.service';
import { Router } from '@angular/router';
import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';

@Component({
  selector: 'app-pregunta-modal',
  templateUrl: './pregunta-modal.component.html',
  styleUrls: ['./pregunta-modal.component.css']
})
export class PreguntaModalComponent implements OnInit {

  encuesta : any;
  formPregunta: FormGroup;
  idUser: number;
  constructor(
    public dialogRef: MatDialogRef<PreguntaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private alerts: Alerts,
    private usersService: UsersService,
    private router: Router,
    private administracionEncuestaService: AdministracionEncuestasService,
  ) {
    this.encuesta = data.encuestasdata;
    this.formPregunta = this.formBuilder.group({
      id: [null, []],
      pregunta: [null, [Validators.required]],
      fechaCreacion: [null, []],
      encuesta: [null, []],
      creadoPor: [null, []],
    });

  }

  ngOnInit() {
    this.formPregunta = this.formBuilder.group({
      id: [null, []],
      pregunta: [null, [Validators.required]],
      fechaCreacion: [null, []],
      encuesta: [null, []],
      creadoPor: [null, []],
    });

    let idUserString = localStorage.getItem('idusuario');
    this.idUser = idUserString ? parseInt(idUserString, 10) : null;
    this.usersService.findById(this.idUser).subscribe((response) => {
      if(response){

        this.formPregunta.get('creadoPor').setValue(response)
       }
    })
    this.formPregunta.get('encuesta').setValue(this.encuesta)
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigate(['/admEncuestas']);
  }

  onSubmitForm() {
    if (this.formPregunta.valid) {
        this.administracionEncuestaService.postpregunta(this.formPregunta.value).subscribe((response) => {
          this.alerts.printSnackbar(15,null,null,"Pregunta guardada!",2,true,('/admEncuestas'),null);
         this.closeDialog();
        }, (error) => {
          this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
        });
    }
    else {
      this.alerts.printSnackbar(15, null, null, "Verifica que el formulario fue llenado correctamente", 5, false, null, null);
    }
  }

}

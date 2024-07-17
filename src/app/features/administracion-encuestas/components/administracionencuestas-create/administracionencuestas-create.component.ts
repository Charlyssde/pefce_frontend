import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EncuestaModel } from 'src/app/core/models/encuesta/encuesta.model';
import { FileModel } from 'src/app/core/models/files/file.model';
import { Alerts } from 'src/app/core/utils/alerts';

import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';
import { PreguntaModalComponent } from 'src/app/shared/components/modals/pregunta-modal/pregunta-modal.component';

@Component({
  selector: 'app-administracionencuestas-create',
  templateUrl: './administracionencuestas-create.component.html',
  styleUrls: ['./administracionencuestas-create.component.css']
})
export class AdministracionEncuestasCreateComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Nueva encuesta',
    'description': 'Módulo encargado de registrar una nueva encuesta.',
    'details': [
      { 'detail': 'Datos generales' , 'description' : 'En esta sección se registran los datos generales de un contacto, incluye su nombre, correo electrónico y teléfono.' }
    ]
  };

  encuesta: any;
  @Input() encuestadata: any;
  encuestaId: number = 0;
  listpreguntas: Array<any> = [];
  isUpdate = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private encuestasService: AdministracionEncuestasService,
    private alerts: Alerts,
    private administracionEncuestaService: AdministracionEncuestasService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.encuestaId = parseInt(this.activatedRoute.snapshot.paramMap.get('encuestaId'));
    if( this.encuestaId ){
      this.findEncuesta();
    }

    this.allpreguntas();

  }

  allpreguntas(){
    if (this.encuestaId >= 0) {
      this.administracionEncuestaService.getAllpreguntas(this.encuestaId).subscribe((response) => {
        if(response){
         this.listpreguntas = response;
         this.isUpdate = true;
        }
      }, (error) => {
        this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
      });
    }
  }

  async findEncuesta(){
    await this.administracionEncuestaService.getone(this.encuestaId).subscribe((response) => {
      if(response){
        this.encuesta = response;
        this.encuestadata = response;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitEncuesta(formData){
    this.administracionEncuestaService.putencuesta(formData.id, formData).subscribe((response) => {
      this.alerts.printSnackbar(15,null,null,"¡Encuesta guardada!",5,true,('/admEncuestas'),null);
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });


  }




  openNew() {
    const dialogRef = this.dialog.open(PreguntaModalComponent, {
      width: '80%',
      data: {
        encuestasdata: this.encuestadata,
      },
    }).afterClosed().subscribe(resp => {
      this.allpreguntas();
    });
  }

}


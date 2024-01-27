import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EncuestaModel } from 'src/app/core/models/encuesta/encuesta.model';
import { FileModel } from 'src/app/core/models/files/file.model';
import { Alerts } from 'src/app/core/utils/alerts';

import { AdministracionEncuestasService } from 'src/app/features/administracion-encuestas/services/administracionencuestas.service';

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
  
  encuesta: EncuestaModel = new EncuestaModel();
  encuestaId: number = 0;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private encuestasService: AdministracionEncuestasService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.encuestaId = parseInt(this.activatedRoute.snapshot.paramMap.get('encuestaId'));
    if( this.encuestaId ){
      this.findEncuesta();
    }
    
  }

  async findEncuesta(){
    await this.encuestasService.getFormResources(this.encuestaId).subscribe((response) => {
      if(response){

        this.encuesta = response.encuesta;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitEncuesta(formData){
    this.encuestasService.postEncuesta(formData).subscribe((response) => {
      this.alerts.printSnackbar(15,null,null,"¡Encuesta guardada!",5,true,('/admEncuestas'),null);
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);  
    });
  }
}


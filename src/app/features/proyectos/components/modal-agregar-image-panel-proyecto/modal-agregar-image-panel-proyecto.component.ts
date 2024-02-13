import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProyectosHistoricoModel} from '../../../../core/models/proyectos/proyectos_historico-model';
import { AdministracionWebService } from 'src/app/features/administracion-pagina-contenido/services/administracion-web.service';
import { error } from 'console';

@Component({
  selector: 'app-modal-agregar-image-panel-proyecto',
  templateUrl: './modal-agregar-image-panel-proyecto.component.html',
  styleUrls: ['./modal-agregar-image-panel-proyecto.component.css']
})
export class ModalAgregarImagePanelProyectoComponent implements OnInit {

  selectedFile: File | null = null;
  imageUrl: string | null = null;

  accion: string = null;


  constructor(
      public service : AdministracionWebService,
      public dialogRef: MatDialogRef<ModalAgregarImagePanelProyectoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  async upload(): Promise<void> {
    if (this.selectedFile) {

      let headers = new Headers();
      headers.append("Content-Type","multipart/formdata");
      headers.append("Accept","application/json");

      let formData = new FormData();
      formData.append("file",this.selectedFile);
      this.service.uploadFileOriginalName(formData, headers).subscribe((res) => {
        let
          date = new Date(),
          proyectoHistorico = new ProyectosHistoricoModel();
      proyectoHistorico.tipoId = "0";
      proyectoHistorico.createdAt = date;
      proyectoHistorico.updatedAt = date;
      proyectoHistorico.accion = res;
      proyectoHistorico.file = true;
      //TODO: save file on minio and get url link to access to it
      

      this.dialogRef.close(proyectoHistorico);
      }, (error) => {
          
      });

      
    }
  }

  closeModal(): void {
    this.dialogRef.close(null);
  }

}

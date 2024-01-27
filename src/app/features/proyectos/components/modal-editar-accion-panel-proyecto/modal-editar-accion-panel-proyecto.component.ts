import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { ProyectosHistoricoModel } from 'src/app/core/models/proyectos/proyectos_historico-model';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-modal-editar-accion-panel-proyecto',
  templateUrl: './modal-editar-accion-panel-proyecto.component.html',
  styleUrls: ['./modal-editar-accion-panel-proyecto.component.css']
})
export class ModalEditarAccionPanelProyectoComponent implements OnInit {

  accion: string = null;
  proyecto: ProyectosModel;
  proyectoHistorico: ProyectosHistoricoModel;

  // Quill
  editorStyles = {};
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] },],
      ['link', 'image']
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<ModalEditarAccionPanelProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.proyectoHistorico = this.data.proyectoHistorico;
    this.accion = this.data.proyectoHistorico.accion;
   }

  ngOnInit() {

  }

  async updateProyectoHistorico(){
    this.proyectoHistorico.updatedAt = new Date();
    this.proyectoHistorico.accion = this.accion;
    this.dialogRef.close(this.proyectoHistorico);
  }

  closeModal(): void {
    this.dialogRef.close(null);
  }

}

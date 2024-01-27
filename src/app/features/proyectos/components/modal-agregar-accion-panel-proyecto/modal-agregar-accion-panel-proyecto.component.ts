import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { ProyectosHistoricoModel } from 'src/app/core/models/proyectos/proyectos_historico-model';
import { ProyectosService } from '../../services/proyectos.service';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';

@Component({
  selector: 'app-modal-agregar-accion-panel-proyecto',
  templateUrl: './modal-agregar-accion-panel-proyecto.component.html',
  styleUrls: ['./modal-agregar-accion-panel-proyecto.component.css']
})
export class ModalAgregarAccionPanelProyectoComponent implements OnInit {

  accion: string = null;

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
    public dialogRef: MatDialogRef<ModalAgregarAccionPanelProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {

  }

  async createProyectoHistorico() {
    let
      date = new Date(),
      proyectoHistorico = new ProyectosHistoricoModel();
    proyectoHistorico.accion = this.accion;
    proyectoHistorico.tipoId = null;
    proyectoHistorico.createdAt = date;
    proyectoHistorico.updatedAt = date;
    this.dialogRef.close(proyectoHistorico);
  }

  closeModal(): void {
    this.dialogRef.close(null);
  }

}

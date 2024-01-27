import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { ProyectosHistoricoModel } from 'src/app/core/models/proyectos/proyectos_historico-model';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-modal-eliminar-accion-panel-proyecto',
  templateUrl: './modal-eliminar-accion-panel-proyecto.component.html',
  styleUrls: ['./modal-eliminar-accion-panel-proyecto.component.css']
})
export class ModalEliminarAccionPanelProyectoComponent implements OnInit {

  accion: string = null;
  proyecto: ProyectosModel;
  proyectoHistorico: ProyectosHistoricoModel;

  constructor(
    public dialogRef: MatDialogRef<ModalEliminarAccionPanelProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.proyecto = this.data.proyecto;
    this.proyectoHistorico = this.data.proyectoHistorico;
    this.accion = this.data.proyectoHistorico.accion;
   }

  ngOnInit() {

  }

  async deleteProyectoHistorico(){
    this.proyectoHistorico.updatedAt = new Date();
    this.proyectoHistorico.accion = this.accion;
    this.dialogRef.close(this.proyectoHistorico);
  }

  closeModal(): void {
    this.dialogRef.close(null);
  }

}

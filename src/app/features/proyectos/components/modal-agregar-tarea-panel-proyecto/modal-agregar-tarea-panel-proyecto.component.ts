
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProyectosHistoricoModel } from 'src/app/core/models/proyectos/proyectos_historico-model';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { TareasModel } from 'src/app/core/models/tareas/tareas-model';


@Component({
  selector: 'app-modal-agregar-tarea-panel-proyecto',
  templateUrl: './modal-agregar-tarea-panel-proyecto.component.html',
  styleUrls: ['./modal-agregar-tarea-panel-proyecto.component.css']
})
export class ModalAgregarTareaPanelProyectoComponent implements OnInit {

  colaboratorsList: ProyectosColaboradorModel[] = [];
  history: ProyectosHistoricoModel = new ProyectosHistoricoModel();
  task: TareasModel = new TareasModel();

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarTareaPanelProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  ngOnInit() {
    this.colaboratorsList = this.data.colaboratorsList;
  }

  validarFormularioTarea(){
    let valido = false;

    if(this.task.descripcion !== null) {
      if(this.task.entregable !== null ) {
        if(this.task.usuarioId !== null) {
          if(this.task.fechaTermino !== null) {
            valido = true
          }
        }
      }
    }
    return valido;
  }

  async createProyectoTarea(){
    let
      date = new Date(),
      endDate = new Date(this.task.fechaTermino);

    this.task.tarea = "";
    this.task.fechaTermino = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,59,0);
    this.task.fechaInicio = date;
    this.task.estatus = false;
    this.task.createdAt = date;
    this.task.updatedAt = date;

    this.history.accion = "Se ha asignado una nueva tarea a <b>"+this.task.usuarioId.nombre+"</b> para entregar en fecha límite "+new Date(this.task.fechaTermino).toLocaleDateString('ES');
    this.history.tipoId = null;
    this.history.createdAt = date;
    this.history.updatedAt = date;
    this.history.usuarioId = this.task.usuarioId;

    this.dialogRef.close({
      task: this.task,
      history: this.history
    });
  }

  closeModal(): void { 
    this.dialogRef.close(null);
  }
}

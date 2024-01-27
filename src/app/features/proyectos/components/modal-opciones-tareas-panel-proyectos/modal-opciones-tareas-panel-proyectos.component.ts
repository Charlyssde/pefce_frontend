import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { TareasModel } from 'src/app/core/models/tareas/tareas-model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Utils } from 'src/app/core/utils/utils';



@Component({
  selector: 'app-modal-opciones-tareas-panel-proyectos',
  templateUrl: './modal-opciones-tareas-panel-proyectos.component.html',
  styleUrls: ['./modal-opciones-tareas-panel-proyectos.component.css']
})
export class ModalOpcionesTareasPanelProyectosComponent implements OnInit {

  editarRegistro: boolean = false;
  colaboratorsList: ProyectosColaboradorModel[] = [];
  task: TareasModel = new TareasModel();
  session: any = null;

  constructor(
    public dialogRef: MatDialogRef<ModalOpcionesTareasPanelProyectosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreAuth: CoreAuthService,
    public utils: Utils
  ) {
    this.colaboratorsList = this.data.colaboratorsList;
  }

  ngOnInit() {
    this.session = this.coreAuth.getUserSessionData();
    this.setValues();
  }

  setValues(){
    this.task = this.data.task;
  }

  validarFormularioTarea(){
    let valido = false;

    if(this.task.tarea !== null){
      if(this.task.entregable !== null){
        if(this.task.fechaTermino !== null){
          if(this.task.usuarioId !== null){
            valido = true;
          }
        }
      }
    }

    return valido;
  }
  async updateProyectoTarea(){
    let
      date = new Date(),
      endedDate = new Date(this.task.fechaTermino);
    this.task.updatedAt = date;
    this.task.fechaTermino = new Date(endedDate.getFullYear(),endedDate.getMonth(),endedDate.getDate(),23,0,0);
    this.dialogRef.close(this.task);
  }

  closeModal(): void {
    this.dialogRef.close(null);
  }

}

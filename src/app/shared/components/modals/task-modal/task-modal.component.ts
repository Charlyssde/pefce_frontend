import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { TasksModel } from 'src/app/core/models/tareas/tasks-model';
import { TasksService } from 'src/app/features/tasks/services/tasks.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { MinutasService } from 'src/app/features/minutas/service/minutas.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

  tarea: TasksModel = new TasksModel();
  responsables = null;
  redireccionar = '/tareas';
  
  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    
    public lib: ScriptsGlobalService,    
    private usersService: UsersService,
    private tasksService: TasksService,
    private minutasService: MinutasService,
    private alerts: Alerts
  ) {
    console.log( data );
    if( data.task ){
      this.tarea = data.task; 
      this.getUsuariosSedecop(); 
    }    

    if( data.minuta){
      this.redireccionar = null;
    }
  }

  ngOnInit() {           
    
  }

  validarFormularioTarea(){
    let valido = false;
    if(this.tarea.tarea !== null && this.tarea.entregable !== null && this.tarea.fechaTermino !== null) {
      valido = true
    }
    return valido;
  }

  createTarea(){
    if( this.tarea.id ){   
      this.tasksService.putTask( this.tarea.id, this.tarea ).subscribe((response)=>{
        if(response){
          this.alerts.printSnackbar(15,null,null,'¡Registro exitoso!',5,true, this.redireccionar ,null);  
          this.closeModal();
        }        
      },(error)=>{
        this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
      });
    }else{
      let
        date = new Date(),      
        endDate = new Date(this.tarea.fechaTermino);
      
      this.tarea.fechaTermino = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,59,0);
      this.tarea.fechaInicio = date;
      this.tarea.estatus = false;
      this.tarea.createdAt = date;
      this.tarea.updatedAt = date;


      this.tasksService.postTask( this.tarea ).subscribe((response)=>{
        if(response){
          console.log( this.data.task.usuarioId );
          if( this.data.minuta ){
            this.minutasService.createTareaByMinuta(this.data.minuta.id, response, this.data.task.usuarioId.id ).subscribe((response)=>{});
          }          
          this.alerts.printSnackbar(15,null,null,'¡Registro exitoso!',5,true, this.redireccionar ,null);  
          this.closeModal();
        }
      },(error)=>{
        this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
      });
    }
  }

  closeModal(): void {
    this.dialogRef.close();    
  }

  async getUsuariosSedecop() {
    await this.usersService.findAllUsersWhereProfileIsInstitution().subscribe(resp => {
      if (resp.length > 0) {
        this.responsables =  resp;
      } 
    });
  }
  

}




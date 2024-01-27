import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
// import { ProyectosTareasModel } from 'src/app/core/models/proyectos/proyectos_tareas-model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { TasksModel } from 'src/app/core/models/tareas/tasks-model';
import { MinutasService } from '../../service/minutas.service';
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';

@Component({
  selector: 'app-modal-opciones-tareas-minuta',
  templateUrl: './modal-opciones-tareas-minuta.component.html',
  styleUrls: ['./modal-opciones-tareas-minuta.component.css']
})
export class ModalOpcionesTareasMinutaComponent implements OnInit {

  editarRegistro: boolean = false;

  usuario: UsuarioModel = null;
  responsable: UsuarioModel = null;


  listaUsuariosColaboradores: ProyectosColaboradorModel[] = [];
  minuta: MinutaModel = new MinutaModel();
  tarea: TasksModel = new TasksModel()

  constructor(
    public dialogRef: MatDialogRef<ModalOpcionesTareasMinutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private minutaService: MinutasService,
    public lib: ScriptsGlobalService,
  ) {}

  ngOnInit() {
    this.setValues();
  }

  setValues(){
    this.tarea = this.data.tarea;
    this.minuta = this.data.minuta;
    this.usuario = this.data.usuario;
    this.responsable = this.data.responsable;

    this.getListaColaboradores();
  }

  async getListaColaboradores(){
    this.listaUsuariosColaboradores = [];
    await this.minutaService.findById(this.minuta.id).subscribe(data => {
      if(data.minutaUsuarios.length >0){
        //this.listaUsuariosColaboradores = colaboradores;
        data.minutaUsuarios.forEach(element => {
          this.listaUsuariosColaboradores.push(element.usuario);
        });
      }
    }, error => {
    });
  }

  validarFormularioTarea(){
    let valido = false;

    if(this.tarea.tarea !== null){
      if(this.tarea.entregable !== null){
        if(this.tarea.fechaTermino !== null){
          if(this.tarea.usuarioId !== null){
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
      endedDate = new Date(this.tarea.fechaTermino);

    this.tarea.updatedAt = date;
    this.tarea.fechaTermino = new Date(endedDate.getFullYear(),endedDate.getMonth(),endedDate.getDate(),23,0,0);

    await this.minutaService.updateTareaByMinuta(this.minuta.id, this.tarea, this.usuario.id).subscribe(response => {
      if(response){
        this,this.closeModal();
      }
    },error=>{

    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}

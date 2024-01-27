import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { TasksModel } from 'src/app/core/models/tareas/tasks-model';
import { MinutasService } from '../../service/minutas.service';
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';

@Component({
  selector: 'app-modal-agregar-tarea-minuta',
  templateUrl: './modal-agregar-tarea-minuta.component.html',
  styleUrls: ['./modal-agregar-tarea-minuta.component.css']
})
export class ModalAgregarTareaMinutaComponent implements OnInit {


  listaUsuariosColaboradores: UsuarioModel[] = [];
  minuta: MinutaModel = new MinutaModel();
  tarea: TasksModel = new TasksModel();
  usuario: UsuarioModel = null;


  constructor(
    public dialogRef: MatDialogRef<ModalAgregarTareaMinutaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private minutaService: MinutasService,
    public lib: ScriptsGlobalService,
  ) {
  }

  ngOnInit() {
    this.usuario = this.data.usuario;
    this.minuta = this.data.minuta;
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

    if(this.tarea.tarea !== null) {
      if(this.tarea.entregable !== null ) {
        if(this.tarea.usuarioId !== null) {
          if(this.tarea.fechaTermino !== null) {
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
      endDate = new Date(this.tarea.fechaTermino);

    this.tarea.fechaTermino = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate(),23,59,0,0);
    this.tarea.fechaInicio = date;
    this.tarea.estatus = false;
    this.tarea.createdAt = date;
    this.tarea.updatedAt = date;

    await this.minutaService.createTareaByMinuta(this.minuta.id, this.tarea, this.usuario.id).subscribe(response => {
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

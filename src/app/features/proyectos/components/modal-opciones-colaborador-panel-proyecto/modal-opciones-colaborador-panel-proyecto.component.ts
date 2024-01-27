import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolProyecto } from 'src/app/core/enums/rol-proyecto.enum';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { ModalAgregarColaboradorPanelProyectoComponent } from '../modal-agregar-colaborador-panel-proyecto/modal-agregar-colaborador-panel-proyecto.component';

@Component({
  selector: 'app-modal-opciones-colaborador-panel-proyecto',
  templateUrl: './modal-opciones-colaborador-panel-proyecto.component.html',
  styleUrls: ['./modal-opciones-colaborador-panel-proyecto.component.css']
})
export class ModalOpcionesColaboradorPanelProyectoComponent implements OnInit {

  editarRegistro: boolean = false;

  usersList: UsuarioModel[] = [];
  rolesList = RolProyecto;
  selectedUser: any;

  usuarioCreador: UsuarioModel = null;
  proyectoColaborador: ProyectosColaboradorModel = new ProyectosColaboradorModel();

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarColaboradorPanelProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
  ) {
    
   }

  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    await this,this.usersService.getAll().subscribe((usuarios) =>{
      if (usuarios) {
        this.usersList = usuarios;
        this.proyectoColaborador = this.data.proyectoColaborador;
      }
    });
  }

  setSelectedUser(user){
    if(user){
      this.proyectoColaborador.usuarioId = user;
    }
  }

  async updateColaboradorProyecto(){
    let date = new Date();
    this.proyectoColaborador.updatedAt = date;
    this.dialogRef.close({request: 'edit',proyectoColaborador:this.proyectoColaborador});
  }

  async deleteColaboradorProyecto(){
    this.dialogRef.close({
      request: 'delete',
      proyectoColaborador:this.proyectoColaborador
    });
  }

  closeModal(): void {
    this.dialogRef.close(null);
  }
}

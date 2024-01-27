import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolProyecto } from 'src/app/core/enums/rol-proyecto.enum';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { ProyectosService } from '../../services/proyectos.service';

@Component({
  selector: 'app-modal-agregar-colaborador-panel-proyecto',
  templateUrl: './modal-agregar-colaborador-panel-proyecto.component.html',
  styleUrls: ['./modal-agregar-colaborador-panel-proyecto.component.css']
})
export class ModalAgregarColaboradorPanelProyectoComponent implements OnInit {

  usersList: UsuarioModel[] = [];
  rolesList = RolProyecto;
  selectedUser: any;

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
      }
    });
  }

  setSelectedUser(user){
    if(user){
      this.proyectoColaborador.usuarioId = user;
    }
  }

  async createColaboradorProyecto(){
    let date = new Date();
    this.proyectoColaborador.activo = true;
    this.proyectoColaborador.createdAt = date;
    this.proyectoColaborador.updatedAt = date;
    this.dialogRef.close(this.proyectoColaborador);
  }  

  closeModal(): void {
    this.dialogRef.close(null);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { UserRequest } from 'src/app/core/utils/requests/users/user.request';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.css']
})
export class UsersUpdateComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Editar usuario',
    'description': 'Módulo encargado editar un usuario existente y gestionar sus perfiles',
    'details': [
      { 'detail': 'Datos generales' , 'description' : 'En esta sección se registran los datos generales para identificar un usuario, incluye su nombre, correo electrónico y teléfono.' },
      { 'detail': 'Perfiles' , 'description' : 'Se muestra una lista de perfiles disponibles para asignar al usuario.' }
    ]
  };

  userId: number;
  profilesList: ProfileModel[] = [];
  user: UserRequest;
  userData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('usuarioId'));
    this.getFormResources();
  }

  async getFormResources(){
    await this.userService.getFormResources(this.userId).subscribe((response) => {
      if(response){
        this.profilesList = response.profilesList;
        if(this.userId == 0){
          this.user = new UserRequest();
        }
        if(this.userId>0){
          this.user = response.user
          this.userData = response.user;
        }
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitUser(user){
     this.userService.putUser(user).subscribe((response) => {
       if(response){
         this.alerts.printSnackbar(15,null,null,"Usuario actulizado",5,false,null,null);
       }
     }, (error) => {
       this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
     });
  }

}

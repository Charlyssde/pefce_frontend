import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { MenusModel } from 'src/app/core/models/profiles/menus.model';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profiles-create',
  templateUrl: './profiles-create.component.html',
  styleUrls: ['./profiles-create.component.css']
})
export class ProfilesCreateComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Nuevo perfil',
    'description': 'Módulo encargado de registrar un nuevo perfil y realizar la gestión de sus permisos dentro de la plataforma',
    'details': [
      { 'detail': 'Datos generales' , 'description' : 'En esta sección se registran los datos generales para identificar un perfil de usuario, incluye su nombre, tipo, perfil padre (si lo requiere), área (si lo requiere) y se muestra el nivel jerárquico dentro de institución (si lo requiere).' },
      { 'detail': 'Permisos del perfil' , 'description' : 'Se muestra una lista de accesos disponibles de la plataforma. Para llenar el formulario es necesario seleccionar una opción del menú, esto habilitará sus permisos (se selecciona el permiso de leer automáticamente) y posteriormente, se deben seleccionar los permisos para el perfil.' }
    ]
  };
  
  profileId: number;
  menuList: MenusModel[] = [];
  profilesList: ProfileModel[] = [];
  profile: ProfileModel;

  constructor(
    private profileService: ProfileService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.profileId = 0;
    this.getFormResources();
  }

  async getFormResources(){
    await this.profileService.getFormResources(this.profileId).subscribe((response) => {
      if(response){
        this.profilesList = response.profilesList;
        this.menuList = response.menuList;
        if(this.profileId == 0){
          this.profile = new ProfileModel();
        }
        if(this.profileId>0){
          this.profile = response.profile;
        }
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitProfile(profile){
    profile.createdAt = new Date();
    this.profileService.postProfile(profile).subscribe((response) => {
      this.alerts.printSnackbar(15,null,null,'Perfil guardado',5,false,null,null);
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

}

import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';
import { ProfileService } from 'src/app/features/profiles/services/profile.service';
import { UsersService } from 'src/app/features/users/services/users.service';

@Component({
  selector: 'shared-user-type-filter',
  templateUrl: './user-type-filter.component.html',
  styleUrls: ['./user-type-filter.component.css']
})
export class UserTypeFilterComponent implements OnInit {
  
  @Input() myDataLabel: string = "";
  @Output() emitEnterpriseId = new EventEmitter<number>();
  @Output() emitInstitutionAreaId = new EventEmitter<number>();
  @Output() emitProfileId = new EventEmitter<number>();
  @Output() emitUserId = new EventEmitter<number>();

  session: any;

  userId: number;
  profile: any;

  enterprisesList: any = [];
  profilesList: any = [];
  areasList: any = AreasEnum;
  usersList: any = [];

  
  selectedArea:any;
  showAreasIfRootOrInstitution: boolean = false;
  
  selectedProfile: any;
  showProfilesIdRootOrInstitution: boolean = false;
  
  selectedUserId: number;
  selectedProfileType: string;
  selectedEnterprise: any;
  selectedUser: any;

  constructor(
    private coreAuthService: CoreAuthService,
    private enterprisesService: EnterprisesService,
    private profileService: ProfileService,
    private usersService: UsersService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.session = this.coreAuthService.getUserSessionData();
    this.userId = this.session.idUsuario;
    this.profile = this.session.perfil;
    this.getActiveEnterprises();
    this.selectedProfileType = 'myData';
    if(this.profile.tipo === 'institución' || this.profile.tipo === 'root'){
      this.showAreasIfRootOrInstitution = true;
    }
  }

  outputUserId() : void {
    this.emitUserId.emit(this.userId);
  }

  onChangeProfileTypeRadio(){
    this.selectedArea = null;
    this.selectedProfile = null;
    this.selectedEnterprise = null;
    this.selectedUser = null;
    this.selectedUserId = null;
    if(this.profile.tipo =="institución" && this.profile.area !== null && this.profile.nivel > 1){
      this.selectedArea = this.profile.area;
      this.getProfilesByAreaAndLevel();
    }
    
    this.usersList = [];
    
    if(this.selectedProfileType === 'myData'){
      this.userId = this.session.idUsuario;
      this.outputUserId();
    }
  }

  onChangeInstitutionArea(){
    this.profilesList = [];
    this.usersList = [];
    
    if(this.selectedArea != null && this.selectedArea === 'all'){
      this.getByInstitutionProfile();
    }
    else if(this.selectedArea != null && this.selectedArea !== 'all'){
      this.getProfilesByAreaAndLevel();
    }
  }

  getSelectedProfile(profile: any){
    this.usersList = [];

    if(profile !== null){
      this.selectedProfile = profile;
      this.usersList = profile.usuarios;
      if(this.usersList.length <= 0){
        this.alerts.printSnackbar(15,null,null,"Este perfil no tiene usuarios registrados.",5,false,null,null);
      }
    }
  }

  getSelectedEnterprise(enterprise: any){
    this.selectedEnterprise = enterprise;
    this.usersList = enterprise.contactos;
  }
  
  getSelectedUser(user: any){
    this.selectedUser = user;
    this.userId = user.id;
    this.outputUserId();
  }

  
  
  async getActiveEnterprises(){
    await this.enterprisesService.filterByTopic("active").subscribe((response)=>{
      this.enterprisesList = response;
    });
  }

  async getProfilesByAreaAndLevel(){
    let level = this.selectedArea == 'all' ? 0 : this.profile.nivel;
    await this.profileService.filterByAreaAndLevel(this.selectedArea, level).subscribe((response) => {
      this.profilesList = response.filter((profile) => profile.usuarios.length > 0);
      if(this.profile.tipo =="institución" && this.profile.area !== null && this.profile.nivel > 1){
        this.profilesList = response.filter((profile) => profile.nivel >= this.profile.nivel);
      }
      if(this.profilesList.length <= 0){
        this.alerts.printSnackbar(15,null,null,"Esta área no tiene perfiles de usuario con usuarios registrados.",5,false,null,null);
      }
    });
  }

  async getByInstitutionProfile(){
    await this.usersService.filterByInstitutionProfile().subscribe((response) => {
      this.usersList = response;
    });
  }
}

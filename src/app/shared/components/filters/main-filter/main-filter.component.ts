import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { EstatusProyectoEnum } from 'src/app/core/enums/estatus-proyecto.enum';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { EnterpriseRequestFilter } from 'src/app/core/utils/requests/enterprises/enterprise-request-filter.request';
import { MainRequestFilter } from 'src/app/core/utils/requests/filters/main-request-filter.model';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';
import { ProfileService } from 'src/app/features/profiles/services/profile.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PrioridadProyectoEnum } from 'src/app/core/enums/prioridad-proyecto.enum';

@Component({
  selector: 'shared-main-filter',
  templateUrl: './main-filter.component.html',
  styleUrls: ['./main-filter.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
  ]

})
export class MainFilterComponent implements OnInit {

  @Input() filterModule: string;
  @Input() myData: string = null;
  @Output() setRequestFilter = new EventEmitter<MainRequestFilter>();
  
  mainRequestFilter: MainRequestFilter = new MainRequestFilter();
  enterpriseRequestFilter: EnterpriseRequestFilter = new EnterpriseRequestFilter();
  session: any = null;
  profile:ProfileModel = null;
  user: any = null;
  userId:number = null;

  showFilters: boolean = false;
  
  selectedArea: string = null;
  selectedProfile: ProfileModel = null;
  selectedUserId: number;
  selectedProfileType: string = 'myData';
  selectedEnterprise: any;
  selectedUser: any;

  areasList: any = AreasEnum;
  prioritiesList: any = PrioridadProyectoEnum;
  statusList: any = EstatusProyectoEnum;
  categoriesList: CatalogoModel[] = [];
  taxRegimeList: CatalogoModel[] = [];
  sectorsList: any[] = [];
  subsectorsList: any[] = [];
  profilesList: ProfileModel[] = [];
  usersList: UsuarioModel[] = [];
  enterprisesList: EmpresaModel[] = [];

  constructor(
    private coreAuthService: CoreAuthService,
    private alerts: Alerts,
    private enterprisesService: EnterprisesService,
    private profileService: ProfileService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.session = this.coreAuthService.getUserSessionData();
    this.profile = this.coreAuthService.getUserSessionData().perfil;
    this.userId = this.coreAuthService.getUserSessionData().idUsuario;
    this.myData = this.profile.tipo === 'root' ? 'Todos' : this.myData;
    if(this.selectedProfileType === 'myData'){
      this.setMainRequestFilterProfile();
    }
    else{
      this.mainRequestFilter.usuario = this.session.idUsuario;
      this.onChangeMainRequestFilter();
    }
  }

  setMainRequestFilterProfile(): void {
    if(this.profile.tipo === "root"){
      this.mainRequestFilter.perfil = null;
      this.mainRequestFilter.usuario = null;
      this.requestEnterprisesFilters();
      this.onChangeMainRequestFilter();
    }
    if(this.profile.tipo === "institución" && this.profile.area !== null && this.profile.nivel === 1){
      this.mainRequestFilter.area = this.profile.area;
      this.mainRequestFilter.perfil = (this.profile.id).toString();
      this.mainRequestFilter.usuario = null;
      this.requestProfilesByAreaAndLevel();
    }
    if(this.profile.tipo === "institución" && this.profile.area !== null && this.profile.nivel > 1){
      this.mainRequestFilter.area = this.profile.area;
      this.mainRequestFilter.perfil = (this.profile.id).toString();
      this.mainRequestFilter.usuario = null;
      this.requestProfilesByAreaAndLevel();
    }
    if(this.profile.tipo === "empresa"){
      this.mainRequestFilter.usuario = this.session.idUsuario;
      this.onChangeMainRequestFilter();
    }
  }

  onChangeMainRequestFilter(){
    this.mainRequestFilter.page = 0;
    this.setRequestFilter.emit(this.mainRequestFilter);
  }

  async requestByInstitutionProfile(){
    await this.usersService.filterByInstitutionProfile().subscribe((response) => {
      this.usersList = response;
    });
  }
  
  setProfilesList(profilesList: any): void { ;
    if(this.profile.tipo === "institución" && this.profile.area !== null && this.profile.nivel >= 1){
      this.profilesList = profilesList.filter(profile => profile.nivel >= this.profile.nivel);
      this.setSelectedProfile(this.profile);
      return;
    }
    this.profilesList = profilesList.filter(profile => profile.usuarios.length > 0);
  }
  // On click "Limpiar filtros"
  cleanFilters(){
    this.selectedProfileType = 'myData'
    this.user = null;
    this.mainRequestFilter = new MainRequestFilter();
    this.profile = this.session.perfil;
    this.userId = this.session.idUsuario;
    this.setMainRequestFilterProfile();
  }

  // On change "Filtrar por"
  onChangeProfileType() : void {
    this.usersList = [];
    this.user = null;
    this.mainRequestFilter = new MainRequestFilter();
    this.setMainRequestFilterProfile();
  }
  async requestProfilesByAreaAndLevel(){;
    await this.profileService.filterByAreaAndLevel(this.mainRequestFilter.area, (this.profile ? 0 : this.profile.nivel)).subscribe((response) => {
      this.setProfilesList(response);
    });
  }
  async requestEnterprisesFilters(){
    await this.enterprisesService.getEnterprisesFilters().subscribe((response) => {
      this.categoriesList = response.categorias;
      this.taxRegimeList = response.regimenesFiscales;
      this.sectorsList = response.sectores;
      this.sectorsList.forEach((value, index) => {
        this.sectorsList[index]['subsectores'] = (response.subsectores).filter(subsector => subsector.idCatalogoPadre === value.id);
      });
      this.getEnterprises();
    });
  }
  async getEnterprises(){
    await this.enterprisesService.getAllWithFilters(this.enterpriseRequestFilter).subscribe((response)=>{
      this.enterprisesList = response;
      this.onChangeMainRequestFilter();
    });
  }
  

  setSelectedArea(){
    this.profilesList = [];
    this.usersList = [];    
    (this.mainRequestFilter.area === null) ? this.requestByInstitutionProfile() : this.requestProfilesByAreaAndLevel();
    this.onChangeMainRequestFilter();
  }
  setSelectedProfile(profile: any){
    this.user = null;
    this.usersList = [];
    this.profile = profile;
    let profileSearch = (profile) ? JSON.parse(JSON.stringify(this.profilesList)).filter(item => item.id === profile.id)[0] : null;
    this.mainRequestFilter.perfil = (profile ? profile.id : null);
    this.usersList = profileSearch.usuarios;
    if(this.selectedProfileType === 'myData'){
      let user = (JSON.parse(JSON.stringify(this.usersList))).filter(item => item.id === this.session.idUsuario);
      this.user = user.length > 0 ? user[0] : null;
      this.setSelectedUser(this.user);
      if(!this.user){
        this.onChangeMainRequestFilter();
      }
    }
    this.onChangeMainRequestFilter();
  }
  setSelectedCategory(category: any){
    this.mainRequestFilter.categoria = (category ? category.id : null);
    this.enterpriseRequestFilter.categoria = (category ? category.id : null);
    this.getEnterprises();
  }
  setSelectedTaxRegime(taxRegime: any){
    this.mainRequestFilter.regimenFiscal = (taxRegime ? taxRegime.id : null);
    this.enterpriseRequestFilter.regimenFiscal = (taxRegime ? taxRegime.id : null);
    this.getEnterprises();
  }
  setSelectedSector(sector: any){
    this.subsectorsList = (sector ? sector.subsectores : []);
    this.mainRequestFilter.sector = (sector ? sector.id : null);
    this.enterpriseRequestFilter.sector = (sector ? sector.id : null);
    this.getEnterprises();
  }
  setSelectedSubsector(subsector: any){
    this.mainRequestFilter.subsector = (subsector ? subsector.id : null);
    this.enterpriseRequestFilter.subsector = (subsector ? subsector.id : null);
    this.getEnterprises();
  }
  setSelectedEnterprise(enterprise: any){
    this.mainRequestFilter.empresa = enterprise.id;
    this.usersList = (enterprise.contactos.length > 0 ? enterprise.contactos : []);
    this.onChangeMainRequestFilter();
  }
  setSelectedUser(user: any){
    this.userId = user ? user.id : null;
    this.mainRequestFilter.usuario = (user ? user.id : null);
    this.onChangeMainRequestFilter();
  }
}

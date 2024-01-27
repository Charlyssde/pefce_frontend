import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';
import { UsersService } from 'src/app/features/users/services/users.service';

@Component({
  selector: 'shared-enterprise-responsible-manager',
  templateUrl: './enterprise-responsible-manager.component.html',
  styleUrls: ['./enterprise-responsible-manager.component.css']
})
export class EnterpriseResponsibleManagerComponent implements OnInit, OnChanges {

  @Input() enterprise: any = null;
  @Input() interested: any = null;

  @Output() emitSelectedEnterprise = new EventEmitter<any>();
  @Output() emitSelectedResponsible = new EventEmitter<any>();

  session:any = null;

  selectedEnterprise: any = null;
  enterprisesList: any = [];
  selectedResponsible: any = null;
  responsiblesList: any[] = [];

  constructor(
    private coreAuthService: CoreAuthService,
    private enterprisesService: EnterprisesService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.session = this.coreAuthService.getUserSessionData();
    this.requestActiveEnterprisesWithContacts();
    if(this.session.perfil.tipo=='empresa'){ this.requestUserById(); }
  }
  ngOnChanges(change: SimpleChanges){
    if(change.enterprise && change.enterprise.currentValue){
      if(this.enterprisesList.length>0){
        this.setSelectedEnterprise(this.enterprisesList.filter(enterprise => enterprise.id === this.enterprise.id)[0]);
      }
      if(change.interested && change.interested.currentValue){
        if(this.responsiblesList.length>0){
          this.setSelectedEnterpriseResponsible(this.responsiblesList.filter(user => user.id ===this.interested.id)[0]);
        }
      }
    }
  }
  
  async requestActiveEnterprisesWithContacts(){
    await this.enterprisesService.getActiveEnterprisesWithContacts().subscribe((response) => {
      this.setEnterprisesList(response.filter(enterprise => enterprise.contactos.length>0));
    });
  }
  async requestEnterpriseByUserId(){
    await this.enterprisesService.getEnterpriseByUserId(this.session.idUsuario).subscribe((response) => {
      this.setEnterpriseResponsiblesList(response.contactos);
      this.setSelectedEnterprise(response);
    });
  }
  async requestUserById(){
    await this.usersService.findById(this.session.idUsuario).subscribe((response) => {
      this.setSelectedEnterpriseResponsible(response);
    });
  }
  
  // Enterprise section
  setSelectedEnterprise(enterprise:any) : void {
    if(enterprise){
      this.selectedEnterprise = enterprise;
      this.setEnterpriseResponsiblesList( (enterprise ? enterprise.contactos : []) );
      this.emitSelectedEnterprise.emit(this.selectedEnterprise);
    }
  }
  setEnterprisesList(enterprises:any[]) : void {
    this.enterprisesList = enterprises;
  }

  // Enterprise responsible section
  setSelectedEnterpriseResponsible(user: any) : void {
    if(user){
      this.selectedResponsible = user;
      this.emitSelectedResponsible.emit(this.selectedResponsible);
    }
  }
  setEnterpriseResponsiblesList(users:any) : void {
    this.responsiblesList = users;
  }

  // Misc
  showEnterprises_EnterpriseResponsibleSelect():boolean {
    return (this.session && this.session.perfil.tipo !== 'empresa');
  }
}

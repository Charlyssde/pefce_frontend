import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Utils } from 'src/app/core/utils/utils';
import { UsersService } from 'src/app/features/users/services/users.service';

@Component({
  selector: 'shared-institution-responsible-manager',
  templateUrl: './institution-responsible-manager.component.html',
  styleUrls: ['./institution-responsible-manager.component.css']
})
export class InstitutionResponsibleManagerComponent implements OnInit, OnChanges {

  @Input() area: string = null;
  @Input() responsible: any = null;
  
  @Output() emitSelectedArea = new EventEmitter<string>();
  @Output() emitSelectedResponsible = new EventEmitter<any>();

  session:any = null;

  selectedArea: string = null;
  areasList: any = AreasEnum;
  selectedResponsible: any = null;
  responsiblesList: any[] = [];

  constructor(
    private usersService: UsersService,
    private coreAuthService: CoreAuthService,
    public utils: Utils
  ) { }

  ngOnInit() {
    this.session = this.coreAuthService.getUserSessionData();
    if(this.session.perfil.tipo=='institución' && this.session.perfil.nivel >= 2){ 
      this.setArea(this.session.perfil.area); 
    }
  }
  ngOnChanges(change: SimpleChanges){
    if(change.area && change.area.currentValue){
      this.setArea(this.area);
    }
    if(change.responsible && change.responsible.currentValue){
      this.selectedResponsible = this.responsible;
    }
  }
  async requestInstitutionUsersByProfileArea(){
    await this.usersService.getInstitutionUsersByProfileArea(this.selectedArea).subscribe((response) => {
      this.setInstitutionResponsibleList(response);
    })
  }
  async requestUserById(){
    await this.usersService.findById(this.session.idUsuario).subscribe((response) => {
      this.selectedResponsible = response;
      this.emitSelectedResponsible.emit(response);
    });
  }

  // Area section
  setArea(area: string) : void {
    if(area){
      this.selectedArea = area;
      this.requestInstitutionUsersByProfileArea();
      this.emitSelectedArea.emit(this.selectedArea);
    }
  }

  // Institution responsible section
  setSelectedEnterpriseResponsible(user: any){
    if(user){
      this.selectedResponsible = user;
      this.emitSelectedResponsible.emit( this.selectedResponsible);
    }
  }
  setInstitutionResponsibleList(users: any[]): void {
    this.responsiblesList = users;
  }

  // Misc
  showInstitutionAreaSelect(): boolean {
    return (this.session.perfil.tipo == 'root' || (this.session.perfil.tipo == 'institución' && this.session.perfil.nivel<=1));
  }

  showInstitutionResponsiblesSelect(): boolean{
    return (this.session.perfil.tipo == 'root' || (this.session.perfil.tipo == 'institución' && this.session.perfil.nivel>=1));
  }
}

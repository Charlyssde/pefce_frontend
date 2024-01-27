
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { PrioridadProyectoEnum } from 'src/app/core/enums/prioridad-proyecto.enum';
import { EstatusProyectoEnum } from 'src/app/core/enums/estatus-proyecto.enum';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { RolProyecto } from 'src/app/core/enums/rol-proyecto.enum';
import { ProjectRequest } from 'src/app/core/utils/requests/projects/project.request';
import { Alerts } from 'src/app/core/utils/alerts';
import { EventEmitter } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';

@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent implements OnInit, OnChanges {

  @Input() formUpdate: ProyectosModel;
  @Input() idProyecto: number;

  @Output() emitProjectRequest = new EventEmitter<ProjectRequest>();

  editorStyles = {};
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
    ]
  };

  projectRequest = new ProjectRequest();
  
  session: any;

  folio: string = 'No asignado';
  formProject: FormGroup;
  area: string = null;
  institutionResponsible: ProyectosColaboradorModel = null;
  enterprise: any = null;
  enterpriseResponsible: ProyectosColaboradorModel = null;


  
  prioritiesList: any = PrioridadProyectoEnum;
  statusList: any = EstatusProyectoEnum;
  typesList: CatalogoModel[] = [];

  constructor(    
    private catalogosService: CatalogoService,
    private coreAuthService: CoreAuthService,
    private projectsService: ProyectosService,
    private alerts: Alerts,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.session = this.coreAuthService.getUserSessionData();
    this.getTipoProyecto();
    this.formProject = this.formBuilder.group({
      id: [],
      folio: [],
      tipoId: [],
      empresaId: [null],
      nombre: [null,Validators.required],
      descripcion: [null],
      prioridad: [null],
      fechaInicio: [null],
      fechaFin: [null],
      area: [null,],
      montoPrevisto: [null],
      empleosDirectos: [null],
      empleosIndirectos: [null],
      oficioTurno: [null],
      observaciones: [null],
      estatus: [null],
      activo: [true,],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  ngOnChanges(change: SimpleChanges){
    if(change.idProyecto.currentValue){
      if(this.idProyecto > 0){
        this.findById();
      }
    }
  }

  showHelpSection(){}

  async getTipoProyecto(){
    await this.catalogosService.getByTipoCatalogo("TIPO_MINUTA").subscribe((response) => {
      this.typesList = response;
    });
  }

  async findById(){
    await this.projectsService.findById(this.idProyecto).subscribe((response) => {
      this.folio = response.folio;
      this.enterprise = response.empresaId;
      let institutionResponsible = response.colaboradores.filter(user => RolProyecto[user.rol] === RolProyecto['responsable'])
      this.institutionResponsible = institutionResponsible.length>0 ? institutionResponsible[0] : null ;
      let enterpriseResponsible = response.colaboradores.filter(user => RolProyecto[user.rol] === RolProyecto['interesado'])
      this.enterpriseResponsible = enterpriseResponsible.length>0 ? enterpriseResponsible[0] : null ;
      this.area = response.area;
      this.formProject.patchValue(response);
    });
  }

  getSelectedArea(area: string){
    this.formProject.controls['area'].setValue(area);
  }
  getSelectedInstitutionResponsible(user: UsuarioModel){
    this.institutionResponsible = this.institutionResponsible && this.idProyecto > 0 ? this.institutionResponsible : new ProyectosColaboradorModel();
    if(user){
      this.institutionResponsible.usuarioId = user;
      this.institutionResponsible.rol = 'responsable';
      this.institutionResponsible.activo = true;
      this.institutionResponsible.createdAt = this.idProyecto > 0 ? (this.institutionResponsible.createdAt ? this.institutionResponsible.createdAt : new Date()) : new Date();
      this.institutionResponsible.updatedAt = this.idProyecto > 0 ? new Date() : null;
    }
  }
  
  getSelectedEnterprise(enterprise: any){
    this.formProject.controls['empresaId'].setValue(enterprise);
  }
  getSelectedEnterpriseResponsible(user: UsuarioModel){
    this.enterpriseResponsible = this.enterpriseResponsible && this.idProyecto > 0 ? (this.enterpriseResponsible) : new ProyectosColaboradorModel();
    if(user){
      this.enterpriseResponsible.usuarioId = user
      this.enterpriseResponsible.rol = 'interesado';
      this.enterpriseResponsible.activo = true;
      this.enterpriseResponsible.createdAt = this.idProyecto > 0 ? (this.enterpriseResponsible.createdAt ? this.enterpriseResponsible.createdAt : new Date()) : new Date();
      this.enterpriseResponsible.updatedAt = this.idProyecto > 0 ? new Date() : null;
    }
  }

  onSubmitForm(){
    if(this.formProject.valid){
      let project = this.formProject.getRawValue();
      project.createdAt = this.idProyecto > 0 ? project.createdAt : new Date();
      project.updatedAt = this.idProyecto > 0 ? new Date() : null;
  
      this.projectRequest.project = project;
      this.projectRequest.institutionResponsible = this.institutionResponsible;
      this.projectRequest.enterpriseResponsible = this.enterpriseResponsible;
      
      this.emitProjectRequest.emit(this.projectRequest);
    }
    else{
      this.alerts.printSnackbar(15,null,null,"El formulario debe ser completado",5,false,null,null);
    }
  }
}

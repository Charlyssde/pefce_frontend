import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { DomicilioModel } from 'src/app/core/models/shared/domicilio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
//import { AuthService } from 'src/app/features/auth/services/auth.service';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';

@Component({
  selector: 'component-form-enterprises',
  templateUrl: './form-enterprises.component.html',
  styleUrls: ['./form-enterprises.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class FormEnterprisesComponent implements OnInit {

  @Output() enterpriseOut =  new EventEmitter<any>();
  
  categorias: CatalogoModel[] = [];
  regimenesFiscales: CatalogoModel[] = [];
  sectores: CatalogoModel[] = [];
  subsectores: CatalogoModel[] = [];
  subsectoresSector: CatalogoModel[] = [];

  // Forms
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  request: EmpresaModel = new EmpresaModel();

  constructor(
    private formBuilder: FormBuilder,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      id:[null],
      empresa:['',[Validators.required]],
      rfc:['',[Validators.required, Validators.minLength(11), Validators.maxLength(14), Validators.pattern(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)]],
      regimenFiscal:['',[Validators.required]],
      categoria:['',[Validators.required]],
      sector:['',[Validators.required]],
      subsector:['',[Validators.required]],
      telefono:['',[Validators.required, Validators.maxLength(10), Validators.pattern(/^[1-9]\d{9}$/)]],
      email:['',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      website:[null],
      descripcion:[null],
      domicilios:['',[Validators.required]],
      pabellonAprobado:[false]
    });
    this.secondFormGroup = this.formBuilder.group({
      representanteLegal:[null],
      numeroColaboradoresMasculinos:[null],
      numeroColaboradoresFemeninos:[null],
      numeroColaboradoresCapacidadesDiferentes:[null],
      totalColaboradores:[null],
    });
    this.thirdFormGroup = this.formBuilder.group({
      contactos:['',Validators.required]
    });
    this.showEnterpriseRegistration();
  }

  async showEnterpriseRegistration(){
    await this.enterprisesService.showEnterpriseRegistration().subscribe((response)=>{
      if(response){
        this.categorias = response.categorias;
        this.regimenesFiscales = response.regimenesFiscales;
        this.sectores = response.sectores;
        this.subsectores = response.subsectores;
      }
    });
  }

  onChangeSector(sector: any): void{
    let subsectores: CatalogoModel[] = JSON.parse(JSON.stringify(this.subsectores));
    this.subsectoresSector = subsectores.filter(subsector => subsector.idCatalogoPadre === sector.id);
  }

  updateEnterpriseAddressData(domicilio: DomicilioModel){
    let domicilios = [];
    if( domicilio.codigoPostal){
      domicilios.push(domicilio);
      this.firstFormGroup.controls['domicilios'].setValue(domicilios);
    }
  }

  updateContactData(contacto: UsuarioModel){
    let contactos = [];

    contactos.push(contacto);
    this.thirdFormGroup.controls['contactos'].setValue(contactos);

  }
  
  onSubmitStepper(): void{
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
      let firstFormGroup = this.firstFormGroup.getRawValue();
      let secondFormGroup = this.secondFormGroup.getRawValue();
      let thirdFormGroup = this.thirdFormGroup.getRawValue();
      this.request = firstFormGroup;
      this.request.pabellonAprobado = false;
      this.request.representanteLegal = secondFormGroup.representanteLegal;
      this.request.numeroColaboradoresMasculinos = secondFormGroup.numeroColaboradoresMasculinos;
      this.request.numeroColaboradoresFemeninos = secondFormGroup.numeroColaboradoresFemeninos;
      this.request.numeroColaboradoresCapacidadesDiferentes = secondFormGroup.numeroColaboradoresCapacidadesDiferentes;
      this.request.totalColaboradores = secondFormGroup.totalColaboradores;
      
      this.request.contactos = thirdFormGroup.contactos;
      this.request.estatus = false;
      this.request.createdAt = new Date();
      this.request.updatedAt = null;

      this.enterpriseOut.emit(this.request)
    }
    else{
      this.alerts.printSnackbar(15,null,null,"Verifica que el formulario fue llenado correctamente",5,false,null,null);
    }
  }
}

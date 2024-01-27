import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { DomicilioModel } from 'src/app/core/models/shared/domicilio.model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { Utils } from 'src/app/core/utils/utils';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class EnterpriseFormComponent implements OnInit, OnChanges {

  @Input() helpsSettings;
  @Input() enterpriseId;
  @Input() enterprise;
  @Input() categoriasIn;
  @Input() regimenesFiscalesIn;
  @Input() sectoresIn;
  @Input() subsectoresIn;
  @Output() enterpriseOut =  new EventEmitter<any>();
  
  categorias: CatalogoModel[] = [];
  regimenesFiscales: CatalogoModel[] = [];
  sectores: CatalogoModel[] = [];
  subsectores: CatalogoModel[] = [];
  subsectoresSector: CatalogoModel[] = [];

  address: DomicilioModel = new DomicilioModel();
  contact: UsuarioModel = new UsuarioModel();

  // Forms
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  request: EmpresaModel = new EmpresaModel();

  constructor(
    private formBuilder: FormBuilder,
    private enterprisesService: EnterprisesService,
    private bottomSheet: MatBottomSheet,
    private alerts: Alerts,
    public utils: Utils
  ) { 
    this.firstFormGroup = this.formBuilder.group({
      id:[null],
      empresa:[null,[Validators.required]],
      rfc:[null,[Validators.required, Validators.minLength(11), Validators.maxLength(14), Validators.pattern(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)]],
      regimenFiscal:[null,[Validators.required]],
      categoria:[null,[Validators.required]],
      sector:[null,[Validators.required]],
      subsector:[null,[Validators.required]],
      telefono:[null,[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[1-9]\d{9}$/)]],
      email:[null,[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      website:[null],
      descripcion:[null],
      domicilios:[null,[Validators.required]],
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.enterprise.currentValue) {
      this.categorias = this.categoriasIn;
      this.regimenesFiscales = this.regimenesFiscalesIn;
      this.sectores = this.sectoresIn;
      this.subsectores = this.subsectoresIn;
      
      if(this.enterprise.id != null){
        this.onChangeSector(this.enterprise.sector);
        this.firstFormGroup.patchValue(this.enterprise);
        this.secondFormGroup.patchValue(this.enterprise);
        this.address = this.enterprise.domicilios[0];
        this.contact = this.enterprise.contactos[0];
      }
      
    }
    
  }

  ngOnInit() {

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
    domicilios.push(domicilio);
    this.firstFormGroup.controls['domicilios'].setValue(domicilios);
  }

  updateContactData(contacto: UsuarioModel){
    let contactos = [];
    contactos.push(contacto);
    this.thirdFormGroup.controls['contactos'].setValue(contactos);
  }
  
  onSubmitStepper(): void{
    if(this.firstFormGroup.valid && this.secondFormGroup.valid && ((this.enterpriseId === 0 && this.thirdFormGroup.valid ) || this.enterpriseId > 0)){
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
      this.request.contactos = this.enterpriseId === 0 ? thirdFormGroup.contactos : this.enterprise.contactos;
      this.request.estatus = true;
      this.request.createdAt = this.enterpriseId > 0 ? this.enterprise.createdAt : new Date();
      this.request.updatedAt = this.enterpriseId > 0 ? new Date() : null;


      this.enterpriseOut.emit(this.request)
    }
    else{
      this.alerts.printSnackbar(15,null,null,"Verifica que el formulario fue llenado correctamente",5,false,null,null);
    }
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent,{data:this.helpsSettings});
  }
}

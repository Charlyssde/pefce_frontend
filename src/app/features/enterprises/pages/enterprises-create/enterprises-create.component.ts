import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprises-create',
  templateUrl: './enterprises-create.component.html',
  styleUrls: ['./enterprises-create.component.css']
})
export class EnterprisesCreateComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Nueva empresa',
    'description': 'Módulo encargado de registrar una nueva empresa y su contacto principal en un formulario de tipo paso a paso. ',
    'details': [
      { 'detail': 'Datos generales de la empresa' , 'description' : 'En este paso se registran los datos generales de la empresa.' },
      { 'detail': 'Datos adicionales de la empresa' , 'description' : 'En este paso se registran los datos adicionales de la empresa.' },
      { 'detail': 'Usuario contacto de la empresa' , 'description' : 'En este paso se registra el usuario contacto de la empresa.' },
      { 'detail': 'Finalizar y enviar la información' , 'description' : 'En este paso se envía la información para su registro.' }
    ]
  };

  enterpriseId: number;
  enterprise: any;
  categorias:any = [];
  regimenesFiscales :any = [];
  sectores:any = [];
  subsectores:any = [];

  constructor(
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.enterpriseId = 0;
    this.getFormResources();
  }

  async getFormResources(){
    await this.enterprisesService.getFormResources(this.enterpriseId).subscribe((response) => {
      if(response){
        if(this.enterpriseId == 0){
          this.enterprise = new EmpresaModel();
        }
        if(this.enterpriseId>0){
          this.enterprise = response.empresa;
        }
        this.categorias = response.categorias;
        this.regimenesFiscales = response.regimenesFiscales;
        this.sectores = response.sectores;
        this.subsectores = response.subsectores;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  onSubmitRegistration(enterprise){
    this.enterprisesService.postEnterprise(enterprise).subscribe((response)=>{
      if(response){
        this.alerts.printSnackbar(15,null,null,'¡Registro exitoso!',5,true,'/empresas',null);  
      }
    },(error)=>{
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }
}

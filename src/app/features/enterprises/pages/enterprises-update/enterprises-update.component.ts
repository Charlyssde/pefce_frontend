import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprises-update',
  templateUrl: './enterprises-update.component.html',
  styleUrls: ['./enterprises-update.component.css']
})
export class EnterprisesUpdateComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Editar empresa',
    'description': 'Módulo encargado de editar una empresa existente en un formulario de tipo paso a paso. ',
    'details': [
      { 'detail': 'Datos generales de la empresa' , 'description' : 'En este paso se registran los datos generales de la empresa.' },
      { 'detail': 'Datos adicionales de la empresa' , 'description' : 'En este paso se registran los datos adicionales de la empresa.' },
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
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.enterpriseId = parseInt(this.activatedRoute.snapshot.paramMap.get('empresaId'));
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
    this.enterprisesService.putEnterprise(this.enterpriseId,enterprise).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"¡Actualización exitosa!",5,true,"/empresas",null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

}

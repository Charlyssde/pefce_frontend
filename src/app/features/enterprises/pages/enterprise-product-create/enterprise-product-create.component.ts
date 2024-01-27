import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { ProductoModel } from 'src/app/core/models/empresas/producto.model';
import { FileModel } from 'src/app/core/models/files/file.model';
import { Alerts } from 'src/app/core/utils/alerts';

import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-product-create',
  templateUrl: './enterprise-product-create.component.html',
  styleUrls: ['./enterprise-product-create.component.css']
})
export class EnterpriseProductCreateComponent implements OnInit {
  
  helpsSettings: any = {
    'module_name': 'Nuevo contacto de empresa',
    'description': 'Módulo encargado de registrar un nuevo contacto a una empresa..',
    'details': [
      { 'detail': 'Datos generales' , 'description' : 'En esta sección se registran los datos generales de un contacto, incluye su nombre, correo electrónico y teléfono.' }
    ]
  };
  
  enterprise: EmpresaModel;
  enterpriseId: number;
  product: ProductoModel = new ProductoModel();
  productId: number = 0;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.enterpriseId = parseInt(this.activatedRoute.snapshot.paramMap.get('empresaId'));
    this.findEnterprise();
  }

  async findEnterprise(){
    await this.enterprisesService.findById(this.enterpriseId).subscribe((response) => {
      if(response){
        this.enterprise = response;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitProduct(formData){
    this.enterprisesService.postEnprerpriseProduct(this.enterpriseId, formData).subscribe((response) => {
      this.alerts.printSnackbar(15,null,null,"¡Producto guardado!",5,true,('/empresas/'+this.enterpriseId+'/productos'),null);
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);  
    });
  }
}

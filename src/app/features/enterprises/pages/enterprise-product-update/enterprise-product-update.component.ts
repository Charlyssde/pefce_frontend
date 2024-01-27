import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { ProductoModel } from 'src/app/core/models/empresas/producto.model';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-product-update',
  templateUrl: './enterprise-product-update.component.html',
  styleUrls: ['./enterprise-product-update.component.css']
})
export class EnterpriseProductUpdateComponent implements OnInit {

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
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('productoId'));
    this.findEnterprise();
  }

  async findEnterprise(){
    await this.enterprisesService.findById(this.enterpriseId).subscribe((response) => {
      if(response){
        this.product = (response.productos).find(product => product.id === this.productId);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitProduct(formData){
    this.enterprisesService.patchEntrerpriseProduct(this.enterpriseId, this.productId, formData).subscribe((response) => {
      this.alerts.printSnackbar(15,null,null,"¡Producto guardado!",5,true,('/empresas/'+this.enterpriseId+'/productos'),null);
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);  
    });
  }
}

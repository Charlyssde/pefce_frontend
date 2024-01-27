import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { ProductoModel } from 'src/app/core/models/empresas/producto.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { EnterpriseProductDetailsComponent } from '../../components/enterprise-product-details/enterprise-product-details.component';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-product-page',
  templateUrl: './enterprise-product-page.component.html',
  styleUrls: ['./enterprise-product-page.component.css']
})
export class EnterpriseProductPageComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Listado de productos de empresa',
    'description': 'Módulo encargado de gestionar los productos de una empresa',
    'details': [
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)', 'description': 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)', 'description': 'Mostrar formulario para editar un registro existente' },
      { 'detail': 'Eliminar registro (<span class="material-symbols-outlined">delete</span>)', 'description': 'Mostrar ventana de confirmación de eliminación de un registro existente' },
      { 'detail': 'Inactivar/Activar registro (<span class="material-symbols-outlined">change_circle</span>)', 'description': 'Cambia el estatus del registro de activo a inactivo y viceversa' }
    ]
  };

  enterprise: EmpresaModel = new EmpresaModel();
  dataset: UsuarioModel[];
  enterpriseId: number;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.enterpriseId = parseInt(this.activatedRoute.snapshot.paramMap.get('empresaId'));
    this.findEnterprise();
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  onClickShowProductDetails(product: ProductoModel){
    this.dialog.open(EnterpriseProductDetailsComponent,{
      width: '80vw',
      data: {product: product}
    })
  }

  onClickDelete(product: ProductoModel){
    let data = {};
    data['id'] = product.id;
    data['title'] = "Eliminar proructo " + product.nombre;
    data['content'] = "¿Realmente desea eliminar al producto <b>" + product.nombre + "</b> de los registros de la plataforma?";
    data['alerts'] = "Esta accion es irreversible.";
    this.dialog.open(DeleteModalComponent, {
      width: '70vw',
      data: data
    }).afterClosed().subscribe((result) => {
      if(result !== undefined && result !== ""){
        this.enterprisesService.deleteEnterpriseProduct(this.enterpriseId,result).subscribe((response) => {
          this.alerts.printSnackbar(15, null, null, "Producto eliminado", 5, false, null, null);
          this.findEnterprise();
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    });
  }

  async findEnterprise(){
    await this.enterprisesService.findById(this.enterpriseId).subscribe((response) => {
      if(response){
        this.enterprise = response;
        let productos = JSON.parse(JSON.stringify(response.productos)).sort((a,b) => a.id - b.id);
        this.dataset = productos;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

}

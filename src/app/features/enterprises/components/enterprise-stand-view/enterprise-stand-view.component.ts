import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { environment } from '@env/environment';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { ProductoModel } from 'src/app/core/models/empresas/producto.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { EnterprisesService } from '../../services/enterprises.service';
import { EnterpriseProductDetailsComponent } from '../enterprise-product-details/enterprise-product-details.component';

@Component({
  selector: 'app-enterprise-stand-view',
  templateUrl: './enterprise-stand-view.component.html',
  styleUrls: ['./enterprise-stand-view.component.css']
})
export class EnterpriseStandViewComponent implements OnInit, OnChanges {

  @Input() enterpriseIn: EmpresaModel;
  @Input() helpsSettings: any;
  @Input() isAdminIn: boolean;
  
  availableEnterpriseStand: boolean = false;
  
  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private alerts: Alerts,
    private enterprisesService: EnterprisesService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.enterpriseIn.currentValue){
      this.availableEnterpriseStand = this.enterpriseIn.pabellonAprobado;
    }
  }

  setURI(pathfile: string) : string{
    return environment.apiUrl+"/files/getUrl?pathfile="+pathfile;
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  showProductDetails(product: ProductoModel): void {
    this.dialog.open(EnterpriseProductDetailsComponent, {
      width: '80vw',
      data:{product: product}
    });
  }

  onChangeAvailableEnterpriseStand(){
    this.enterpriseIn.pabellonAprobado = this.availableEnterpriseStand;
    this.enterprisesService.putEnterprise(this.enterpriseIn.id,this.enterpriseIn).subscribe((response) => {
      this.alerts.printSnackbar(15,null,null,"Estatus  del stand de empresa actualizado con valor:"+(this.availableEnterpriseStand ? 'APROBADO': 'NO APROBADO'),5,false,null,null);
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }
}

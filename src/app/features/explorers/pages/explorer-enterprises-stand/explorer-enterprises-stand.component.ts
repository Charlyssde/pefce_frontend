import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';

@Component({
  selector: 'app-explorer-enterprises-stand',
  templateUrl: './explorer-enterprises-stand.component.html',
  styleUrls: ['./explorer-enterprises-stand.component.css']
})
export class ExplorerEnterprisesStandComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Revisión de Stand empresarial',
    'description': 'Módulo encargado de revisar y validar el estatus de disponibilidad de un stand empresarial para exploradores y ferias virtuales. Muestra el nombre de la empresa, su eslogan, banners, imágen comercial y productos (incluidos sus detalles).',
    'details': [
      { 'detail': 'Volver (<span class="material-symbols-outlined">arrow_back</span>)', 'description': 'Volver a la lista de empresas.' },
      { 'detail': 'Disponible (<span class="material-symbols-outlined">check_box</span>)', 'description': 'Checkbox que cambia el estatus de disponibilidad de un stand empresarial para exploradores y ferias virtuales' }
    ]
  };
  
  enterprise: EmpresaModel;
  enterpriseId: number;

  constructor(
    private enterprisesService: EnterprisesService,
    private alerts: Alerts,
    private activatedRoute: ActivatedRoute
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

}
